import 'server-only'

import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

import DropdownWrapper from './dropdown-wrapper'
import { NavOption, navOptions } from '../data'

export default function DesktopMenu(): JSX.Element {
  return (
    <NavigationMenu className='hidden md:flex'>
      <NavigationMenuList>
        {navOptions.map(({ label, href, nested }: NavOption) => (
          <NavigationMenuItem key={label}>
            {nested ? (
              <DropdownWrapper label={label} options={nested} />
            ) : (
              <Link href={href ?? '#'} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {label}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
