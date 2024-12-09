import { Media } from '@/payload/payload-types'

const DEFAULT_LABEL_STYLE: Pick<NavLabel, 'variant' | 'color'> = {
  variant: 'ghost',
  color: 'olive'
}

export type NavLabel = {
  text: string
  variant?: 'default' | 'outline' | 'link' | 'secondary' | 'ghost'
  color?: 'olive' | 'gold' | 'sage' | 'default'
}

export interface NavOption {
  href?: string
  label: NavLabel
  address?: string
  variant?: 'default' | 'external' | 'detailed' | 'block'
  image?: Media | string
  nested?: NavOption[]
  externalSiteName?: string
}

export const navOptions: NavOption[] = [
  {
    href: '/',
    label: { text: 'Home', ...DEFAULT_LABEL_STYLE }
  },
  {
    href: '/contact',
    label: { text: 'Contact Us', ...DEFAULT_LABEL_STYLE }
  },
  {
    label: { text: 'Our Locations', ...DEFAULT_LABEL_STYLE },
    nested: [
      {
        href: '/guesthouses/all',
        label: {
          text: 'View All Guesthouses',
          color: 'olive',
          variant: 'outline'
        },
        variant: 'block'
      },
      {
        variant: 'detailed',
        href: '/guesthouses/paarl-grand',
        label: { text: 'The Paarl Grand', ...DEFAULT_LABEL_STYLE },
        image: '/images/locations/paarl.jpg',
        address: 'Paarl, Western Cape'
      },
      {
        variant: 'detailed',
        href: '/guesthouses/kathu-grand',
        label: { text: 'The Kathu Grand', ...DEFAULT_LABEL_STYLE },
        image: '/images/locations/kathu.jpg',
        address: 'Kathu, Northern Cape'
      }
    ]
  }
]

export const bookingOptions: NavOption[] = [
  {
    label: { text: 'The Paarl Grand' },
    href: 'https://book.nightsbridge.com/35314',

    variant: 'external',
    externalSiteName: 'NightsBridge'
  },
  {
    label: { text: 'The Kathu Grand' },
    href: '#',

    variant: 'external',
    externalSiteName: 'NightsBridge'
  }
]
