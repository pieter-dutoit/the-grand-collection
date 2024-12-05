'use client'

import Link from 'next/link'

import {
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

import type { NavOption } from '../data'

export default function DesktopMenuDropdown({
  options
}: {
  options: NavOption[]
}): JSX.Element {
  return (
    <NavigationMenuContent>
      {options.map(({ label, href }) => (
        <Link key={href} href={href ?? '#'} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {label}
          </NavigationMenuLink>
        </Link>
      ))}
    </NavigationMenuContent>
  )
}
