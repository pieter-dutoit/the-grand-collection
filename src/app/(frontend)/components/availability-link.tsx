import Link from 'next/link'

import { getButtonStyles } from '@/components/ui/button'
import { twMerge } from 'tailwind-merge'
import { Lock } from 'lucide-react'

export default function AvailabilityLink({
  text = 'Check availability',
  className = '',
  bookingUrl,
  large,
  platformName = 'NightsBridge',
  guesthouseSlug,
  destinationSlug,
  articleSlug,
  sourceSection = 'booking_cta'
}: {
  text?: string
  className?: string
  bookingUrl: string
  platformName?: string
  large?: boolean
  guesthouseSlug?: string
  destinationSlug?: string
  articleSlug?: string
  sourceSection?: string
}) {
  return (
    <div className='flex flex-col items-start'>
      <Link
        href={bookingUrl}
        target='_blank'
        rel='noopener noreferrer'
        data-analytics-event='booking_click'
        data-analytics-source-section={sourceSection}
        data-analytics-cta-label={text}
        data-analytics-destination-slug={destinationSlug}
        data-analytics-guesthouse-slug={guesthouseSlug}
        data-analytics-article-slug={articleSlug}
        data-analytics-booking-platform={platformName}
        data-analytics-target-url={bookingUrl}
        className={twMerge(
          getButtonStyles({
            variant: 'default',
            colour: 'olive',
            size: large ? 'lg' : 'default'
          }),
          className,
          'items-center'
        )}
      >
        {text}
      </Link>
      <em className='mt-0.5 flex items-center gap-1 text-xs text-nowrap text-olive-500'>
        <Lock className='size-2' /> Opens{' '}
        <strong className='font-semibold'>{platformName}</strong>
      </em>
    </div>
  )
}
