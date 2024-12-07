'use client'

import dynamic from 'next/dynamic'
import { twMerge } from 'tailwind-merge'

import {
  NavigationMenuItem,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { buttonVariants } from '@/components/ui/button'

import { NavOption } from '../../data'

// Lazy load the dropdown menu to prevent it from being rendered on the server.
const DropdownMenu = dynamic(() => import('../dropdown-menu'), {
  ssr: false
})

export default function NavDropdown({
  options,
  label
}: {
  label: string
  options: NavOption[]
}): JSX.Element {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        overrideStyle
        className={twMerge(
          buttonVariants({ variant: 'default', colour: 'olive' }),
          'font-semibold uppercase'
        )}
      >
        {label}
      </NavigationMenuTrigger>
      <DropdownMenu options={options} />
    </NavigationMenuItem>
  )
}
