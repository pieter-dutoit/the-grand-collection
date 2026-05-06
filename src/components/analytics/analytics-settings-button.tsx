'use client'

import { ANALYTICS_SETTINGS_EVENT } from '@/lib/analytics/client'

type AnalyticsSettingsButtonProps = {
  className?: string
}

export default function AnalyticsSettingsButton({
  className
}: AnalyticsSettingsButtonProps) {
  const openAnalyticsSettings = () => {
    window.dispatchEvent(new Event(ANALYTICS_SETTINGS_EVENT))
  }

  return (
    <button type='button' className={className} onClick={openAnalyticsSettings}>
      Privacy Settings
    </button>
  )
}
