import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { getButtonStyles } from '@/components/ui/button'

const NAV_OPTIONS = [
  { href: '#gallery', text: 'Gallery' },
  { href: '#amenities', text: 'Amenities' },
  { href: '#rooms', text: 'Rooms' },
  { href: '#contact', text: 'Contact Us' }
]

export default function Navbar(): JSX.Element {
  return (
    <nav className='sticky left-0 top-16 z-40 h-14 w-full border-b-2 border-olive-200 bg-olive-50 lg:h-16'>
      <ul className='container mx-auto flex h-full snap-x items-center space-x-1 overflow-x-auto'>
        {NAV_OPTIONS.map(({ href, text }) => (
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
