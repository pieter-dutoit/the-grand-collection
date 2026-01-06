import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { getButtonStyles } from '@/components/ui/button'

type NavbarProps = {
  showFaq?: boolean
}

const NAV_OPTIONS = [
  { href: '#rooms', text: 'Rooms & Rates' },
  { href: '#amenities', text: 'Amenities' },
  { href: '#gallery', text: 'Gallery' },
  { href: '#contact', text: 'Contact' },
  { href: '#policies', text: 'Policies' }
]

const FAQ_OPTION = { href: '#faq', text: 'FAQs' }

export default function Navbar({ showFaq = true }: NavbarProps): JSX.Element {
  const navOptions = showFaq ? [...NAV_OPTIONS, FAQ_OPTION] : NAV_OPTIONS

  return (
    <nav className='sticky left-0 top-16 z-40 h-14 w-full border-b border-olive-200 bg-gradient-to-r from-white/80 to-white/80 backdrop-blur-lg sm:from-olive-50 sm:via-olive-50/70 sm:to-olive-50/70 lg:h-16'>
      <ul className='container mx-auto flex h-full snap-x items-center space-x-1 overflow-x-auto'>
        {navOptions.map(({ href, text }) => (
          <li key={href} className='snap-center'>
            <Link
              href={href}
              className={twMerge(
                getButtonStyles({
                  variant: 'ghost',
                  colour: 'gold'
                }),
                'font-semibold'
              )}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
