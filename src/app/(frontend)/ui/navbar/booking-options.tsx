import {
  NavigationMenuItem,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'

import DropdownMenu from './dropdown-menu'
import { buttonVariants } from '@/components/ui/button'
import { twMerge } from 'tailwind-merge'

export default function BookingOptions() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        overrideStyle
        className={twMerge(
          buttonVariants({ variant: 'default', colour: 'olive' }),
          'font-semibold uppercase'
        )}
      >
        Book Now
      </NavigationMenuTrigger>
      <DropdownMenu
        options={[
          {
            label: { text: 'The Paarl Grand' },
            href: '/guesthouses/paarl-grand'
          },
          {
            label: { text: 'The Kathu Grand' },
            href: '/guesthouses/kathu-grand'
          }
        ]}
      />
    </NavigationMenuItem>
  )
}
