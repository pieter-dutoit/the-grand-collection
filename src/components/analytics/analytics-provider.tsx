'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

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

function canReadStoredValues() {
  try {
    window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)
    window.localStorage.getItem(ANALYTICS_NOTICE_DISMISSED_STORAGE_KEY)
    return true
  } catch {
    return false
  }
}

function getStoredValue(key: string) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function setStoredValue(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Storage may be blocked in privacy modes; keep the in-memory state update.
  }
}

function removeStoredValue(key: string) {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // Storage may be blocked in privacy modes; keep the in-memory state update.
  }
}

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

    if (!canReadStoredValues()) {
      setAnalyticsStatus(ANALYTICS_CONSENT_DECLINED)
      setPanelMode('hidden')
      return
    }

    const storedConsent = getStoredValue(ANALYTICS_CONSENT_STORAGE_KEY)
    const hasDeclined = storedConsent === ANALYTICS_CONSENT_DECLINED
    const noticeDismissed =
      getStoredValue(ANALYTICS_NOTICE_DISMISSED_STORAGE_KEY) === 'true'

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
    setStoredValue(ANALYTICS_NOTICE_DISMISSED_STORAGE_KEY, 'true')
    setPanelMode('hidden')
  }

  const decline = () => {
    setStoredValue(ANALYTICS_CONSENT_STORAGE_KEY, ANALYTICS_CONSENT_DECLINED)
    setStoredValue(ANALYTICS_NOTICE_DISMISSED_STORAGE_KEY, 'true')
    setAnalyticsStatus(ANALYTICS_CONSENT_DECLINED)
    setPanelMode('hidden')
  }

  const enableAnalytics = () => {
    removeStoredValue(ANALYTICS_CONSENT_STORAGE_KEY)
    setStoredValue(ANALYTICS_NOTICE_DISMISSED_STORAGE_KEY, 'true')
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
      className='fixed right-3 bottom-3 left-3 z-50 mx-auto max-w-xl rounded-lg border border-olive-200 bg-white p-2 shadow-xl md:right-6 md:bottom-4 md:left-auto md:p-3'
      aria-label={ariaLabel}
    >
      <div className='flex flex-row items-center gap-2.5 md:gap-3'>
        <p className='min-w-0 flex-1 text-xs leading-snug text-olive-900 md:text-sm md:leading-relaxed'>
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
              size='sm'
              onClick={decline}
            >
              Disable
            </Button>
          ) : (
            <Button
              type='button'
              colour='olive'
              size='sm'
              onClick={enableAnalytics}
            >
              Enable
            </Button>
          )}
          <Button
            type='button'
            colour='olive'
            size='icon'
            className='size-8'
            onClick={closePanel}
          >
            <X aria-hidden='true' />
            <span className='sr-only'>Close analytics notice</span>
          </Button>
        </div>
      </div>
    </aside>
  )
}
