import {
  NavigationMenuItem,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'

import DropdownMenu from './dropdown-menu'

export default function BookingOptions() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Book Now</NavigationMenuTrigger>
      <DropdownMenu
        options={[
          {
            label: { text: 'The Paarl Grand' },
            href: '/book-now-paarl'
          },
          {
            label: { text: 'The Kathu Grand' },
            href: '/book-now-kathu'
          }
        ]}
      />
    </NavigationMenuItem>
  )
}
