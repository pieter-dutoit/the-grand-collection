import Link from 'next/link'

import { getButtonStyles } from '@/components/ui/button'
import { twMerge } from 'tailwind-merge'

export default function AvailabilityLink({
  className = '',
  bookingUrl,
  large
  // platformName = 'NightsBridge'
}: {
  className?: string
  bookingUrl: string
  platformName?: string
  large?: boolean
}) {
  return (
    <div className='flex flex-col items-start'>
      <Link
        href={bookingUrl}
        // target='_blank'
        // rel='noopener noreferrer'
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
        Check Availability
      </Link>
      {/* <em className='text-nowrap text-xs text-olive-500'>
        Book on <strong className='font-semibold'>{platformName}</strong>
      </em> */}
    </div>
  )
}
