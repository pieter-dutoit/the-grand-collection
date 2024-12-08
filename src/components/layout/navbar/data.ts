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
  description?: string
  variant?: 'default' | 'external' | 'detailed'
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
        label: { text: 'All Guesthouses', ...DEFAULT_LABEL_STYLE }
      },
      {
        variant: 'detailed',
        href: '/guesthouses/paarl-grand',
        label: { text: 'The Paarl Grand', ...DEFAULT_LABEL_STYLE },
        image: '/images/locations/paarl.jpg'
      },
      {
        variant: 'detailed',
        href: '/guesthouses/kathu-grand',
        label: { text: 'The Kathu Grand', ...DEFAULT_LABEL_STYLE },
        image: '/images/locations/kathu.jpg'
      }
    ]
  }
]

export const bookingOptions: NavOption[] = [
  {
    label: { text: 'The Paarl Grand' },
    href: '/guesthouses/paarl-grand',
    variant: 'external',
    externalSiteName: 'NightsBridge'
  },
  {
    label: { text: 'The Kathu Grand' },
    href: '/guesthouses/kathu-grand',
    variant: 'external',
    externalSiteName: 'NightsBridge'
  }
]
