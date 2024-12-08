import 'server-only'

import { twMerge } from 'tailwind-merge'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'

import { CountryOutline, MinimalTextLogo } from '@/components/ui/logos'

import MobileDrawer from './components/mobile-drawer'
import NavOptions from './components/nav-options'

import { getButtonVariants } from '@/components/ui/button'
import NavLink from './components/nav-link'
import { bookingOptions } from './data'

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

            {/* Desktop & Mobile */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={twMerge(
                  getButtonVariants({ variant: 'default', colour: 'olive' }),
                  'text-sm font-bold uppercase'
                )}
              >
                Book Now
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {bookingOptions.map((option) => (
                  <NavLink key={option.href + '-booking'} {...option} />
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right content */}
        <CountryOutline className='hidden sm:block' />
      </div>
    </header>
  )
}
