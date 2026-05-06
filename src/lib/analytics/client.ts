'use client'

type AnalyticsValue = string | number | boolean | null | undefined

export type AnalyticsProperties = Record<string, AnalyticsValue>

type QueuedEvent = {
  name: string
  properties: Record<string, string | number | boolean>
}

type PostHogClient = {
  capture: (
    eventName: string,
    properties?: Record<string, string | number | boolean>
  ) => void
  opt_in_capturing: () => void
  opt_out_capturing: () => void
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: {
      (...args: unknown[]): void
      q?: unknown[]
    }
  }
}

export const ANALYTICS_CONSENT_STORAGE_KEY = 'tgc_analytics_consent'
export const ANALYTICS_CONSENT_DECLINED = 'declined'
export const ANALYTICS_NOTICE_DISMISSED_STORAGE_KEY =
  'tgc_analytics_notice_dismissed'
export const ANALYTICS_SETTINGS_EVENT = 'tgc:analytics-settings'

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID
const GA4_DEBUG = process.env.NEXT_PUBLIC_GA4_DEBUG === 'true'
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

const GA4_EVENTS = new Set([
  'booking_click',
  'contact_click',
  'property_detail_click',
  'article_guesthouse_click'
])

const GA4_PARAMETERS = new Set([
  'page_path',
  'page_type',
  'page_title',
  'page_location',
  'page_referrer',
  'source_section',
  'cta_label',
  'guesthouse_slug',
  'destination_slug',
  'article_slug',
  'booking_platform',
  'target_url'
])

let consentGranted = false
let initStarted = false
let gaReady = false
let clarityReady = false
let posthogReady = false
let posthogClient: PostHogClient | null = null
let queuedEvents: QueuedEvent[] = []
let previousPageLocation: string | undefined

const hasWindow = () => typeof window !== 'undefined'

export function hasConfiguredAnalyticsProvider() {
  return Boolean(GA4_ID || CLARITY_ID || POSTHOG_KEY)
}

export function setAnalyticsConsent(granted: boolean) {
  consentGranted = granted
  setProviderConsent(granted)

  if (!granted) {
    queuedEvents = []
    posthogClient?.opt_out_capturing()
    return
  }

  posthogClient?.opt_in_capturing()
}

export function initAnalytics() {
  if (!hasWindow() || !consentGranted || initStarted) {
    return
  }

  initStarted = true

  scheduleIdle(() => {
    if (!consentGranted) {
      initStarted = false
      return
    }

    initGa4()
    initClarity()
    void initPostHog()
  })
}

export function trackPageView() {
  if (!hasWindow()) {
    return
  }

  const pageProperties = getPageProperties()
  const pageLocation = window.location.href

  trackEvent('page_view', {
    ...pageProperties,
    page_title: document.title,
    page_location: pageLocation,
    page_referrer: previousPageLocation || document.referrer
  })

  previousPageLocation = pageLocation
}

export function trackEvent(name: string, properties: AnalyticsProperties = {}) {
  if (!hasWindow() || !consentGranted || !hasConfiguredAnalyticsProvider()) {
    return
  }

  const event = {
    name,
    properties: cleanProperties({
      ...getPageProperties(),
      ...properties
    })
  }

  if (!allConfiguredProvidersReady()) {
    queuedEvents.push(event)
    return
  }

  dispatchEvent(event)
}

export function getElementAnalyticsProperties(element: Element) {
  const trackedElement = element as HTMLElement
  const anchor = element.closest('a')

  return cleanProperties({
    source_section: trackedElement.dataset.analyticsSourceSection,
    cta_label:
      trackedElement.dataset.analyticsCtaLabel ||
      getTrimmedText(trackedElement),
    destination_slug: trackedElement.dataset.analyticsDestinationSlug,
    guesthouse_slug: trackedElement.dataset.analyticsGuesthouseSlug,
    article_slug: trackedElement.dataset.analyticsArticleSlug,
    booking_platform: trackedElement.dataset.analyticsBookingPlatform,
    target_url:
      trackedElement.dataset.analyticsTargetUrl ||
      (anchor instanceof HTMLAnchorElement ? anchor.href : undefined)
  })
}

function dispatchEvent({ name, properties }: QueuedEvent) {
  if (name === 'page_view') {
    window.gtag?.('event', 'page_view', getGa4Properties(properties))

    posthogClient?.capture(
      '$pageview',
      getPostHogPageviewProperties(properties)
    )
    return
  }

  if (GA4_EVENTS.has(name)) {
    window.gtag?.('event', name, getGa4Properties(properties))
  }

  posthogClient?.capture(name, properties)
  window.clarity?.('event', name)
}

function flushQueuedEvents() {
  if (!allConfiguredProvidersReady() || queuedEvents.length === 0) {
    return
  }

  const events = queuedEvents
  queuedEvents = []
  events.forEach(dispatchEvent)
}

function initGa4() {
  if (!GA4_ID) {
    gaReady = true
    flushQueuedEvents()
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer?.push(arguments)
    }

  window.gtag('js', new Date())
  window.gtag('config', GA4_ID, getGa4Config())
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`, 'ga4')

  gaReady = true
  flushQueuedEvents()
}

function initClarity() {
  if (!CLARITY_ID) {
    clarityReady = true
    flushQueuedEvents()
    return
  }

  window.clarity =
    window.clarity ||
    function clarity() {
      ;(window.clarity!.q = window.clarity!.q || []).push(arguments)
    }

  setClarityConsent(consentGranted)
  loadScript(`https://www.clarity.ms/tag/${CLARITY_ID}`, 'clarity')

  clarityReady = true
  flushQueuedEvents()
}

async function initPostHog() {
  if (!POSTHOG_KEY) {
    posthogReady = true
    flushQueuedEvents()
    return
  }

  try {
    const posthog = (await import('posthog-js/dist/module.slim.no-external'))
      .default

    posthogClient = posthog
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      defaults: '2026-01-30',
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      capture_exceptions: false,
      disable_session_recording: true,
      person_profiles: 'identified_only',
      respect_dnt: true,
      loaded: (loadedPostHog) => {
        posthogClient = loadedPostHog
        posthogReady = true
        flushQueuedEvents()
      }
    })

    posthogReady = true
    flushQueuedEvents()
  } catch {
    posthogReady = true
    flushQueuedEvents()
  }
}

function loadScript(src: string, id: string) {
  if (document.getElementById(id)) {
    return
  }

  const script = document.createElement('script')
  script.id = id
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

function setProviderConsent(granted: boolean) {
  if (!hasWindow()) {
    return
  }

  if (GA4_ID) {
    const analyticsWindow = window as unknown as Record<string, boolean>
    analyticsWindow[`ga-disable-${GA4_ID}`] = !granted
  }

  setClarityConsent(granted)
}

function setClarityConsent(granted: boolean) {
  if (!CLARITY_ID || !window.clarity) {
    return
  }

  window.clarity('consentv2', {
    ad_Storage: 'denied',
    analytics_Storage: granted ? 'granted' : 'denied'
  })

  if (!granted) {
    window.clarity('consent', false)
  }
}

function scheduleIdle(callback: () => void) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: 2000 })
    return
  }

  setTimeout(callback, 1)
}

function allConfiguredProvidersReady() {
  return (
    (!GA4_ID || gaReady) &&
    (!CLARITY_ID || clarityReady) &&
    (!POSTHOG_KEY || posthogReady)
  )
}

function getPageProperties(): AnalyticsProperties {
  const pathname = window.location.pathname
  const route = getRouteProperties(pathname)

  return {
    page_path: pathname,
    ...route
  }
}

function getRouteProperties(pathname: string): AnalyticsProperties {
  const [first, second, third, fourth] = pathname.split('/').filter(Boolean)

  if (!first) {
    return { page_type: 'home' }
  }

  if (first === 'about') {
    return { page_type: 'about' }
  }

  if (first === 'guesthouses' && second && third === 'articles' && fourth) {
    return {
      page_type: 'guesthouse_article',
      guesthouse_slug: second,
      article_slug: fourth
    }
  }

  if (first === 'guesthouses' && second && third === 'articles') {
    return {
      page_type: 'guesthouse_articles',
      guesthouse_slug: second
    }
  }

  if (first === 'guesthouses' && second) {
    return {
      page_type: 'guesthouse',
      guesthouse_slug: second
    }
  }

  if (first === 'guesthouses') {
    return { page_type: 'guesthouse_index' }
  }

  if (first === 'destinations' && second && third === 'guides' && fourth) {
    return {
      page_type: 'destination_article',
      destination_slug: second,
      article_slug: fourth
    }
  }

  if (first === 'destinations' && second) {
    return {
      page_type: 'destination',
      destination_slug: second
    }
  }

  return { page_type: 'other' }
}

function cleanProperties(properties: AnalyticsProperties) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => {
      if (value === null || value === undefined) {
        return false
      }

      return String(value).trim().length > 0
    })
  ) as Record<string, string | number | boolean>
}

function getGa4Config() {
  return cleanProperties({
    send_page_view: false,
    debug_mode: GA4_DEBUG ? true : undefined
  })
}

function getGa4Properties(properties: QueuedEvent['properties']) {
  return cleanProperties({
    ...Object.fromEntries(
      Object.entries(properties).filter(([key]) => GA4_PARAMETERS.has(key))
    ),
    debug_mode: GA4_DEBUG ? true : undefined
  })
}

function getPostHogPageviewProperties(properties: QueuedEvent['properties']) {
  return cleanProperties({
    ...properties,
    $current_url: properties.page_location,
    $pathname: properties.page_path,
    $referrer: properties.page_referrer
  })
}

function getTrimmedText(element: HTMLElement) {
  const text = element.textContent?.replace(/\s+/g, ' ').trim()
  return text ? text.slice(0, 100) : undefined
}
