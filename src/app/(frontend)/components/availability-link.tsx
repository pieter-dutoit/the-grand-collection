import Link from 'next/link'

import { getButtonStyles } from '@/components/ui/button'
import { twMerge } from 'tailwind-merge'
import { Lock } from 'lucide-react'

export default function AvailabilityLink({
  text = 'Check availability',
  className = '',
  bookingUrl,
  large,
  platformName = 'NightsBridge'
}: {
  text?: string
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
        {text}
      </Link>
      <em className='mt-0.5 flex items-center gap-1 text-nowrap text-xs text-olive-500'>
        <Lock className='size-2' /> Opens{' '}
        <strong className='font-semibold'>{platformName}</strong>
      </em>
    </div>
  )
}
