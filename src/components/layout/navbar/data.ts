import { Media } from '@/payload/payload-types'

export type NavLabel = {
  text: string
  variant?: 'link' | 'button'
}

export interface NavOption {
  href?: string
  label: NavLabel
  variant?: 'external' | 'detailed'
  image?: Media | string
  nested?: NavOption[]
}

export const navOptions: NavOption[] = [
  {
    href: '/',
    label: { text: 'Home' }
  },
  {
    href: '/contact',
    label: { text: 'Contact Us' }
  },
  {
    label: { text: 'Our Locations' },
    nested: [
      {
        href: '/guesthouses/all',
        label: { text: 'All Guesthouses' }
      },
      {
        variant: 'detailed',
        href: '/guesthouses/paarl-grand',
        label: { text: 'The Paarl Grand' },
        image: '/images/locations/paarl.jpg'
      },
      {
        variant: 'detailed',
        href: '/guesthouses/kathu-grand',
        label: { text: 'The Kathu Grand' },
        image: '/images/locations/kathu.jpg'
      }
    ]
  }
]
