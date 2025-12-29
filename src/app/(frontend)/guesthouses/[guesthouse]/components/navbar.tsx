import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { getButtonStyles } from '@/components/ui/button'

type NavbarProps = {
  showFaq?: boolean
}

const NAV_OPTIONS = [
  { href: '#gallery', text: 'Gallery' },
  { href: '#amenities', text: 'Amenities' },
  { href: '#rooms', text: 'Rooms' },
  { href: '#contact', text: 'Contact Us' },
  { href: '#policies', text: 'Important Info' }
]

const FAQ_OPTION = { href: '#faq', text: 'FAQs' }

export default function Navbar({ showFaq = true }: NavbarProps): JSX.Element {
  const navOptions = showFaq ? [...NAV_OPTIONS, FAQ_OPTION] : NAV_OPTIONS

  return (
    <nav className='sticky left-0 top-16 z-40 h-14 w-full border-b-2 border-olive-200 bg-olive-50 lg:h-16'>
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
