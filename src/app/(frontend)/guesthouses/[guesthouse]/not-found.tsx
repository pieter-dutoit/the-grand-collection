import { getButtonStyles } from '@/components/ui/button'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function NotFound() {
  return (
    <div className='container mx-auto flex min-h-fit flex-col items-center justify-center py-8 md:py-16'>
      <h1 className='text-4xl font-bold'>Guesthouse Not Found</h1>
      <p className='mt-4 text-lg'>
        Sorry, we couldn&#39;t find the guesthouse you were looking for.
      </p>
      <Link
        href='/guesthouses'
        className={twMerge(
          'mt-4',
          getButtonStyles({ variant: 'link', colour: 'gold' })
        )}
      >
        View our guesthouses
      </Link>
    </div>
  )
}
