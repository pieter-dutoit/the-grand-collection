import 'server-only'

import { fetchDestinations, fetchGuestHouses, fetchLogo } from '@/lib/data'
import { extractContactDetails, extractImageProps } from '@/lib/utils'

type NavImage = {
  alt: string
  isSvg: boolean
  url: string
}

export type GuesthouseNavItem = {
  bookingPlatformName: string
  bookingUrl: string
  city: string
  contact?: {
    email?: string
    emailHref?: string
    phone?: string
    phoneHref?: string
  }
  destinationSlug?: string
  href: string
  image: NavImage
  name: string
  province: string
  slug: string
}

export type DestinationNavItem = {
  description: string
  href: string
  image: NavImage
  name: string
  slug: string
}

export type PrimaryNavData = {
  destinations: DestinationNavItem[]
  guesthouses: GuesthouseNavItem[]
  logo: NavImage
}

const firstAvailableImage = (
  images: unknown[] | null | undefined
): Parameters<typeof extractImageProps>[0] => {
  const [image] = images ?? []
  return image as Parameters<typeof extractImageProps>[0]
}

export async function getPrimaryNavData(): Promise<PrimaryNavData> {
  const [logoData, guesthouses, destinations] = await Promise.all([
    fetchLogo('minimal_dark'),
    fetchGuestHouses(),
    fetchDestinations()
  ])

  return {
    logo: extractImageProps(logoData.minimal_dark),
    guesthouses: guesthouses.map((guesthouse) => {
      const {
        booking_platform,
        contact_details,
        content,
        destination,
        name,
        slug
      } = guesthouse
      const [contact] = extractContactDetails(contact_details.contact_persons)
      const destinationSlug =
        destination && typeof destination !== 'string'
          ? destination.slug
          : undefined

      return {
        bookingPlatformName: booking_platform.name,
        bookingUrl: booking_platform.url,
        city: contact_details.address.city,
        contact:
          contact?.email || contact?.phoneLink
            ? {
                email: contact.email || undefined,
                emailHref: contact.email
                  ? `mailto:${contact.email}`
                  : undefined,
                phone: contact.phone || undefined,
                phoneHref: contact.phoneLink
                  ? `tel:+27${contact.phoneLink}`
                  : undefined
              }
            : undefined,
        destinationSlug,
        href: `/guesthouses/${slug}`,
        image: extractImageProps(firstAvailableImage(content.images.exterior)),
        name,
        province: contact_details.address.province,
        slug
      }
    }),
    destinations: destinations.map((destination) => ({
      description: destination.description,
      href: `/destinations/${destination.slug}`,
      image: extractImageProps(destination.image),
      name: destination.name,
      slug: destination.slug
    }))
  }
}
