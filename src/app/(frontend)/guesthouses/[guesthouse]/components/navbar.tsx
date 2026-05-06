import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { getButtonStyles } from '@/components/ui/button'

type NavbarProps = {
  showFaq?: boolean
  showLatest?: boolean
}

const NAV_OPTIONS = [
  { href: '#rooms', text: 'Rooms & Rates' },
  { href: '#amenities', text: 'Amenities' },
  { href: '#gallery', text: 'Gallery' },
  { href: '#contact', text: 'Contact' },
  { href: '#policies', text: 'Policies' }
]

const FAQ_OPTION = { href: '#faq', text: 'FAQs' }
const LATEST_OPTION = { href: '#latest', text: 'Latest' }

export default function Navbar({
  showFaq = true,
  showLatest = false
}: NavbarProps): React.JSX.Element {
  const navOptions = [
    ...NAV_OPTIONS,
    ...(showFaq ? [FAQ_OPTION] : []),
    ...(showLatest ? [LATEST_OPTION] : [])
  ]

  return (
    <nav className='sticky top-16 left-0 z-40 h-14 w-full border-b border-olive-200 bg-gradient-to-r from-white/80 to-white/80 backdrop-blur-lg sm:from-olive-50 sm:via-olive-50/70 sm:to-olive-50/70 lg:h-16'>
      <ul className='container mx-auto flex h-full snap-x items-center space-x-1 overflow-x-auto'>
        {navOptions.map(({ href, text }) => (
          <li key={href} className='snap-center'>
            <Link
              href={href}
              data-analytics-event='article_anchor_click'
              data-analytics-source-section='guesthouse_section_nav'
              data-analytics-cta-label={text}
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
