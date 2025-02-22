import { Guesthouse } from '@/payload/payload-types'
import { extractContactDetails, extractImageProps, getBaseUrl } from '.'
import { fetchGuestHouses, fetchHomePageData, fetchLogo } from '../data'

export function createAbsoluteImagePath(cmsPath: string): string {
  const filename = cmsPath.split('/').pop()
  return `${getBaseUrl()}/api/images/${filename}`
}

export async function getOrganisationStructuredData() {
  // Home page data
  const homePageData = await fetchHomePageData()
  const { hero, socials, contactPersons } = homePageData
  const { phoneLink, email } = extractContactDetails(contactPersons)[0]
  const { url: heroURL } = extractImageProps(hero?.background_image)

  // Logo
  const logoData = await fetchLogo('minimal_dark')
  const { url: logoURL } = extractImageProps(logoData.minimal_dark)

  // Guesthouse data
  const guesthouses = await fetchGuestHouses()

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': getBaseUrl() + '/#organization',
    url: getBaseUrl(),
    sameAs: socials?.map(({ url }) => url),
    logo: createAbsoluteImagePath(logoURL),
    image: createAbsoluteImagePath(heroURL),
    name: 'The Grand Collection',
    description:
      'The Grand Collection offers a selection of luxury guesthouses across South Africa, catering to business and leisure travellers.',
    contactPoint: {
      '@type': 'ContactPoint',
      email,
      telephone: '+27' + phoneLink
    },
    subOrganization: guesthouses.map((guesthouse) =>
      createGuesthouseStructuredData({ guesthouse, minimal: true })
    )
  }
}

export function createGuesthouseStructuredData({
  guesthouse,
  minimal = false
}: {
  guesthouse: Guesthouse
  minimal?: boolean
}) {
  const {
    slug,
    name,
    contact_details: { address, contact_persons, socials },
    content: {
      description,
      images: { background_image, exterior, interior },
      rooms
    },
    business_details: {
      hours: { opening_time, closing_time },
      check_in_out: { check_in_time, check_out_time }
    }
  } = guesthouse

  return {
    // Minimal data:
    '@type': 'Hotel',
    '@id': getBaseUrl() + '/guesthouses/' + slug + '/#hotel',
    url: getBaseUrl() + '/guesthouses/' + slug,
    name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.suburb,
      addressRegion: address.province,
      postalCode: address.postalCode,
      addressCountry: 'ZA'
    },
    // Full data:
    ...(!minimal && {
      identifier: 'hotel-id-' + slug,
      parentOrganization: {
        '@id': getBaseUrl() + '/#organization'
      },
      description,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+27' + extractContactDetails(contact_persons)[0].phoneLink,
        email: extractContactDetails(contact_persons)[0].email
      },
      image: [
        createAbsoluteImagePath(extractImageProps(background_image).url),
        createAbsoluteImagePath(extractImageProps(interior[0]).url),
        createAbsoluteImagePath(extractImageProps(exterior[0]).url)
      ],
      openingHours: ['Mo-Su ' + opening_time + '-' + closing_time],
      checkingTime: check_in_time,
      checkoutTime: check_out_time,
      numberOfRooms: rooms.rooms?.length,
      sameAs: socials?.map(({ url }) => url)
    })
  }
}
