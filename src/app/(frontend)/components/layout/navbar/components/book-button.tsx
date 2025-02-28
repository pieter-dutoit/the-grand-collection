'use client'

import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import { getButtonStyles } from '@/components/ui/button'
import { NavigationMenuTrigger } from '@/components/ui/navigation-menu'

export default function BookButton(): JSX.Element | null {
  const pathname = usePathname()
  const isMatch = /^\/guesthouses\/[a-z0-9-]+/.test(pathname)

  return isMatch ? null : (
    <NavigationMenuTrigger
      className={twMerge(
        getButtonStyles({ variant: 'default', colour: 'olive' }),
        'text-sm font-bold uppercase'
      )}
    >
      {pathname === '/' ? 'Book Now' : 'Book'}
    </NavigationMenuTrigger>
  )
}
