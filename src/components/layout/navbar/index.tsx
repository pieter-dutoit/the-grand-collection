import 'server-only'

import { twMerge } from 'tailwind-merge'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

import { CountryOutline, MinimalTextLogo } from '@/components/ui/logos'

import MobileDrawer from './mobile-drawer'
import NavOptions from './components/nav-options'

import { buttonVariants } from '@/components/ui/button'

const booking_options = [
  {
    label: { text: 'The Paarl Grand' },
    href: '/guesthouses/paarl-grand'
  },
  {
    label: { text: 'The Kathu Grand' },
    href: '/guesthouses/kathu-grand'
  }
]

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
                overrideStyle
                className={twMerge(
                  buttonVariants({ variant: 'default', colour: 'olive' }),
                  'font-semibold uppercase'
                )}
              >
                Book Now
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {booking_options.map(({ label, href }) => (
                  <Link key={href} href={href ?? '#'} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {label.text}
                    </NavigationMenuLink>
                  </Link>
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
