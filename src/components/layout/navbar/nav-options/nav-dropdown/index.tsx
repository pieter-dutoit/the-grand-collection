import { twMerge } from 'tailwind-merge'

import {
  NavigationMenuItem,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { buttonVariants } from '@/components/ui/button'

import DropdownMenu from '../dropdown-menu'
import { NavOption } from '../../data'

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
