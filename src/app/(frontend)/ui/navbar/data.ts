export type NavOption = {
  href?: string
  label: string
  nested?: NavOption[]
}

export const navOptions: NavOption[] = [
  {
    href: '/',
    label: 'Home'
  },
  {
    href: '/contact',
    label: 'Contact Us'
  },
  {
    label: 'Our Locations',
    nested: [
      {
        href: '/guesthouses/all',
        label: 'All Guesthouses'
      },
      {
        href: '/guesthouses/paarl-grand',
        label: 'The Paarl Grand'
      },
      {
        href: '/guesthouses/kathu-grand',
        label: 'The Kathu Grand'
      }
    ]
  }
]
