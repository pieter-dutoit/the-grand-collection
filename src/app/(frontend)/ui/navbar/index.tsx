import 'server-only'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuList
} from '@/components/ui/navigation-menu'

import MobileDrawer from './mobile-drawer'
import NavOptions from './nav-options'
import { CountryOutline, MinimalTextLogo } from '../logo'
import BookingOptions from './booking-options'

export default function Navbar(): JSX.Element {
  return (
    <header className='sticky left-0 top-0 z-50 h-16 w-full border-b border-b-sage-100 bg-white'>
      <div className='container mx-auto flex h-full items-center justify-between'>
        {/* Left content */}
        <div className='flex items-center'>
          <MobileDrawer>
            <NavigationMenu orientation='vertical' className='[&>div]:w-full'>
              <NavigationMenuList className='-ml-4 flex flex-col items-start space-x-0'>
                <NavOptions />
              </NavigationMenuList>
            </NavigationMenu>
          </MobileDrawer>

          <Link href='/' aria-label='Home'>
            <MinimalTextLogo />
          </Link>
        </div>

        {/* Center content | Desktop menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavOptions className='hidden md:flex' />
            <BookingOptions />
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right content */}
        <CountryOutline className='hidden sm:block' />
      </div>
    </header>
  )
}
