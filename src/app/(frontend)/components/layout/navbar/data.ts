import { Media } from '@/payload/payload-types'
import { getGuestHouses } from '@/lib/data'

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
  isHighlighted?: boolean
}

export async function getNavOptions(): Promise<NavOption[]> {
  const guesthouses = await getGuestHouses()
  return [
    {
      href: '/',
      label: { text: 'Home', ...DEFAULT_LABEL_STYLE }
    },
    {
      href: '/about',
      label: { text: 'About Us', ...DEFAULT_LABEL_STYLE }
    },
    {
      label: { text: 'Our Locations', ...DEFAULT_LABEL_STYLE },
      nested: [
        {
          href: '/guesthouses',
          label: {
            text: 'View All Guesthouses',
            color: 'olive',
            variant: 'outline'
          },
          variant: 'block'
        },
        ...guesthouses.map(
          (guesthouse): NavOption => ({
            variant: 'detailed',
            href: `/guesthouses/${guesthouse.slug}`,
            label: {
              text: guesthouse.name,
              ...DEFAULT_LABEL_STYLE
            },
            image: guesthouse.content.images.exterior[0],
            address: `${guesthouse.contact_details.address.city}, ${guesthouse.contact_details.address.province}`
          })
        )
      ]
    }
  ]
}

export async function getBookingOptions(): Promise<NavOption[]> {
  const guesthouses = await getGuestHouses()

  return guesthouses.map(
    (guesthouse): NavOption => ({
      label: {
        text: guesthouse.name
      },
      variant: 'external',
      href: guesthouse.booking_platform.url,
      externalSiteName: guesthouse.booking_platform.name
    })
  )
}
