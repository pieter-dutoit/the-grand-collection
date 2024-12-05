export type NavLabel = {
  text: string
  variant?: 'link' | 'button'
}

export type NavOption = {
  href?: string
  label: NavLabel
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
        href: '/guesthouses/paarl-grand',
        label: { text: 'The Paarl Grand' }
      },
      {
        href: '/guesthouses/kathu-grand',
        label: { text: 'The Kathu Grand' }
      }
    ]
  }
]
