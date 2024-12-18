import { getPayload } from 'payload'
import config from '@payload-config'
import { Guesthouse, Media } from '@/payload/payload-types'

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

export const getGuestHouses = async (): Promise<Guesthouse[]> => {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'guesthouses',
    depth: 2,
    pagination: false,
    sort: '-name'
  })
  if (!res) {
    throw new Error('Failed to fetch home page data')
  }
  return res.docs
}

export async function getNavOptions(): Promise<NavOption[]> {
  const guesthouses = await getGuestHouses()
  return [
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
        ...guesthouses.map(
          (guesthouse): NavOption => ({
            variant: 'detailed',
            href: `/guesthouses/${guesthouse.slug}`,
            label: {
              text: guesthouse.name,
              ...DEFAULT_LABEL_STYLE
            },
            image: guesthouse.content.gallery[0],
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
