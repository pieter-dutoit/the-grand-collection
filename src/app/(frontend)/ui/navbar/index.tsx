import 'server-only'

import Link from 'next/link'

import { CountryOutline, MinimalTextLogo } from '../logo'

import MobileMenu from './mobile-menu'
import MobileMenuContent from './mobile-menu/content'
import DesktopMenu from './desktop-menu'

export default function Navbar(): JSX.Element {
  return (
    <header className='sticky left-0 top-0 z-50 h-16 w-full border-b border-b-sage-100 bg-white'>
      <div className='container mx-auto flex h-full items-center justify-between'>
        {/* Left content */}
        <div className='flex items-center'>
          <MobileMenu>
            <MobileMenuContent />
          </MobileMenu>

          <Link href='/' aria-label='Home'>
            <MinimalTextLogo />
          </Link>
        </div>

        {/* Center content */}
        <DesktopMenu />

        {/* Right content */}

        <div>
          <CountryOutline className='hidden sm:block' />
        </div>
      </div>
    </header>
  )
}
