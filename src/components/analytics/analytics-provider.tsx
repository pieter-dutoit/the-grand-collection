'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  ANALYTICS_CONSENT_DECLINED,
  ANALYTICS_CONSENT_STORAGE_KEY,
  ANALYTICS_NOTICE_DISMISSED_STORAGE_KEY,
  ANALYTICS_SETTINGS_EVENT,
  getElementAnalyticsProperties,
  hasConfiguredAnalyticsProvider,
  initAnalytics,
  setAnalyticsConsent,
  trackEvent,
  trackPageView
} from '@/lib/analytics/client'

type AnalyticsStatus = 'enabled' | typeof ANALYTICS_CONSENT_DECLINED | 'loading'
type PanelMode = 'hidden' | 'notice' | 'settings'

export default function AnalyticsProvider() {
  const pathname = usePathname()
  const [analyticsStatus, setAnalyticsStatus] =
    useState<AnalyticsStatus>('loading')
  const [panelMode, setPanelMode] = useState<PanelMode>('hidden')

  useEffect(() => {
    if (!hasConfiguredAnalyticsProvider()) {
      setAnalyticsStatus(ANALYTICS_CONSENT_DECLINED)
      return
    }

    const storedConsent = window.localStorage.getItem(
      ANALYTICS_CONSENT_STORAGE_KEY
    )
    const hasDeclined = storedConsent === ANALYTICS_CONSENT_DECLINED
    const noticeDismissed =
      window.localStorage.getItem(ANALYTICS_NOTICE_DISMISSED_STORAGE_KEY) ===
      'true'

    setAnalyticsStatus(hasDeclined ? ANALYTICS_CONSENT_DECLINED : 'enabled')
    setPanelMode(!hasDeclined && !noticeDismissed ? 'notice' : 'hidden')
  }, [])

  useEffect(() => {
    if (analyticsStatus === 'loading') {
      return
    }

    if (analyticsStatus === ANALYTICS_CONSENT_DECLINED) {
      setAnalyticsConsent(false)
      return
    }

    setAnalyticsConsent(true)
    initAnalytics()
    trackPageView()
  }, [analyticsStatus, pathname])

  useEffect(() => {
    const openSettings = () => {
      if (!hasConfiguredAnalyticsProvider()) {
        return
      }

      setPanelMode('settings')
    }

    window.addEventListener(ANALYTICS_SETTINGS_EVENT, openSettings)
    return () =>
      window.removeEventListener(ANALYTICS_SETTINGS_EVENT, openSettings)
  }, [])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest('[data-analytics-event]')
          : null

      if (!target) {
        return
      }

      const eventName = (target as HTMLElement).dataset.analyticsEvent

      if (!eventName) {
        return
      }

      trackEvent(eventName, getElementAnalyticsProperties(target))
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const closePanel = () => {
    window.localStorage.setItem(ANALYTICS_NOTICE_DISMISSED_STORAGE_KEY, 'true')
    setPanelMode('hidden')
  }

  const decline = () => {
    window.localStorage.setItem(
      ANALYTICS_CONSENT_STORAGE_KEY,
      ANALYTICS_CONSENT_DECLINED
    )
    window.localStorage.setItem(ANALYTICS_NOTICE_DISMISSED_STORAGE_KEY, 'true')
    setAnalyticsStatus(ANALYTICS_CONSENT_DECLINED)
    setPanelMode('hidden')
  }

  const enableAnalytics = () => {
    window.localStorage.removeItem(ANALYTICS_CONSENT_STORAGE_KEY)
    window.localStorage.setItem(ANALYTICS_NOTICE_DISMISSED_STORAGE_KEY, 'true')
    setAnalyticsStatus('enabled')
    setPanelMode('hidden')
  }

  if (analyticsStatus === 'loading' || panelMode === 'hidden') {
    return null
  }

  const analyticsEnabled = analyticsStatus === 'enabled'
  const ariaLabel =
    panelMode === 'settings' ? 'Analytics settings' : 'Analytics notice'

  return (
    <aside
      className='fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-xl rounded-lg border border-olive-200 bg-white p-4 shadow-xl md:right-6 md:left-auto'
      aria-label={ariaLabel}
    >
      <div className='flex flex-col gap-3 md:flex-row md:items-center'>
        <p className='text-sm leading-relaxed text-olive-900'>
          {analyticsEnabled
            ? 'We use analytics to understand how people use this site.'
            : 'Analytics is currently off. You can enable limited analytics to help us understand site usage and improve The Grand Collection.'}
        </p>
        <div className='flex shrink-0 gap-2'>
          {analyticsEnabled ? (
            <Button
              type='button'
              variant='outline'
              colour='olive'
              onClick={decline}
            >
              Disable
            </Button>
          ) : (
            <Button type='button' colour='olive' onClick={enableAnalytics}>
              Enable
            </Button>
          )}
          <Button type='button' colour='olive' onClick={closePanel}>
            Close
          </Button>
        </div>
      </div>
    </aside>
  )
}
