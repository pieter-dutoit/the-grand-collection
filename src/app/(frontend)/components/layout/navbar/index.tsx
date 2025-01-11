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

import { CountryOutline } from '@/components/ui/logos'
import { getButtonStyles } from '@/components/ui/button'

import MobileDrawer from './components/mobile-drawer'
import NavOptions from './components/nav-options'

import { getBookingOptions } from './data'
import BookingOptions from './components/booking-options'
import { getLogo } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'
import Image from 'next/image'

export default async function Navbar(): Promise<JSX.Element> {
  const bookingOptions = await getBookingOptions()
  const logo = await getLogo('minimal_dark')
  const { minimal_dark } = logo
  const { url, alt } = extractImageProps(minimal_dark)

  return (
    <header className='sticky left-0 top-0 z-50 h-16 w-full border-b border-b-olive-100 bg-white'>
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between px-[5vw] sm:px-8 lg:px-20'>
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
            <div className='relative h-14 w-32 sm:w-36'>
              <Image
                src={url}
                alt={alt}
                fill
                className='object-contain object-center'
              />
            </div>
          </Link>
        </div>

        {/* Center content | Desktop menu */}
        <NavigationMenu className='ml-auto sm:mr-6 lg:mr-auto'>
          <NavigationMenuList>
            <NavOptions className='hidden lg:flex' />

            {/* Desktop & Mobile */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={twMerge(
                  getButtonStyles({ variant: 'default', colour: 'olive' }),
                  'text-sm font-bold uppercase'
                )}
              >
                Book Now
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <BookingOptions options={bookingOptions} />
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
