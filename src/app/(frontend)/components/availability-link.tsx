import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

import { getButtonStyles } from '@/components/ui/button'
import { twMerge } from 'tailwind-merge'

export default function AvailabilityLink({
  className = '',
  bookingUrl,
  platformName
}: {
  className?: string
  bookingUrl: string
  platformName: string
}) {
  return (
    <div className='flex flex-col items-start'>
      <Link
        href={bookingUrl}
        className={twMerge(
          getButtonStyles({
            variant: 'default',
            colour: 'olive'
          }),
          className,
          'items-center'
        )}
      >
        Check Availability <ExternalLink />
      </Link>
      <em className='text-nowrap text-xs text-olive-500'>
        Powered by <strong className='font-semibold'>{platformName}</strong>
      </em>
    </div>
  )
}
