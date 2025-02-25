import { Amenity, Guesthouse, Media, Room } from '@/payload/payload-types'
import { createSourceSet } from '@/components/ui/image'

import { extractContactDetails, extractImageProps, getBaseUrl } from '.'
import { fetchGuestHouses, fetchHomePageData, fetchLogo } from '../data'

const LANGUAGES = [
  {
    '@type': 'Language',
    name: 'English',
    alternateName: 'en'
  },
  {
    '@type': 'Language',
    name: 'Afrikaans',
    alternateName: 'af'
  }
]

const BUSINESS_AUDIENCE = [
  {
    '@type': 'TouristAudience',
    audienceType: 'Leisure Travelers',
    geographicArea: { '@type': 'Country', name: 'South Africa' }
  },
  {
    '@type': 'BusinessAudience',
    audienceType: 'Corporate Travelers',
    numberOfEmployees: 1
  },
  { '@type': 'Audience', audienceType: 'Contractors' },
  { '@type': 'Audience', audienceType: 'Families' },
  { '@type': 'Audience', audienceType: 'Event Attendees' },
  { '@type': 'Audience', audienceType: 'Extended Stays' },
  { '@type': 'Audience', audienceType: 'Solo Travelers' }
]

export function createAbsoluteImagePath(cmsPath: string): string {
  const filename = cmsPath.split('/').pop()
  return `${getBaseUrl()}/api/images/${filename}`
}

export function createAmenitiesList(amenities: (Amenity | string)[]) {
  return [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'InternetType',
      value: 'FREE'
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'ParkingType',
      value: 'FREE'
    },
    ...amenities
      .filter((amenity) => typeof amenity !== 'string')
      .map(({ googleName }) => ({
        '@type': 'LocationFeatureSpecification',
        name: googleName,
        value: true
      }))
      .filter(({ name }) => !!name)
  ]
}

export function createMediaObject(image: Media | string) {
  const { url, alt } = extractImageProps(image)
  const contentUrl = createAbsoluteImagePath(url)
  const thumbnailUrl = createSourceSet(contentUrl, false)
    .split(',')[0]
    .split(' ')[0]
  const currentYear = new Date().getFullYear()
  return {
    '@type': 'ImageObject',
    contentUrl,
    thumbnailUrl,
    caption: alt,
    creditText: 'The Grand Collection',
    creator: {
      '@type': 'Organization',
      '@id': getBaseUrl() + '/#organization',
      name: 'The Grand Collection'
    },
    copyrightNotice: `© ${currentYear} The Grand Collection. All Rights Reserved.`,
    license: getBaseUrl(),
    acquireLicensePage: getBaseUrl()
  }
}

export function createBreadCrumbs(
  crumbs: { name: string; item?: string }[] = []
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getBaseUrl()
      },
      ...crumbs.map(({ name, item }, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name,
        ...(item && { item: getBaseUrl() + item })
      }))
    ]
  }
}

export async function getOrganisationStructuredData({
  minimal = false
}: { minimal?: boolean } = {}) {
  // Home page data
  const homePageData = await fetchHomePageData()
  const { hero, overview, socials, contactPersons } = homePageData
  const { phoneLink, email } = extractContactDetails(contactPersons)[0]

  // Logo
  const logoData = await fetchLogo('minimal_dark')
  const { url: logoURL } = extractImageProps(logoData.minimal_dark)

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': getBaseUrl() + '/#organization',
    name: 'The Grand Collection',
    ...(!minimal && {
      url: getBaseUrl(),
      sameAs: socials?.map(({ url }) => url),
      logo: createAbsoluteImagePath(logoURL),
      image: [hero?.background_image, ...(overview?.images || [])]
        .filter((image) => typeof image !== 'string')
        .map((image) => (image ? createMediaObject(image) : null))
        .filter(Boolean),
      description:
        'The Grand Collection offers a selection of luxury guesthouses across South Africa, catering to business and leisure travellers.',
      slogan: 'Splendour Stay',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email,
        telephone: '+27' + phoneLink
      }
    })
  }
}

export async function createGuesthouseStructuredData({
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
      rooms,
      amenities: { general_amenities }
    },
    business_details: {
      hours: { opening_time, closing_time },
      check_in_out: { check_in_time, check_out_time },
      geo: { latitude, longitude, maps_link }
    }
  } = guesthouse

  const telephone = '+27' + extractContactDetails(contact_persons)[0].phoneLink
  const email = extractContactDetails(contact_persons)[0].email

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': getBaseUrl() + '/guesthouses/' + slug + '/#lodgingBusiness',
    url: getBaseUrl() + '/guesthouses/' + slug,
    name,
    telephone,
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
      parentOrganization: await getOrganisationStructuredData({
        minimal: true
      }),
      geo: {
        '@type': 'GeoCoordinates',
        latitude,
        longitude
      },
      hasMap: maps_link,
      description,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone,
        email
      },
      image: [background_image, ...interior, ...exterior]
        .slice(0, 40)
        .filter((image) => typeof image !== 'string')
        .map(createMediaObject),
      openingHours: ['Mo-Su ' + opening_time + '-' + closing_time],
      checkingTime: check_in_time,
      checkoutTime: check_out_time,
      currenciesAccepted: 'ZAR',
      audience: BUSINESS_AUDIENCE,
      numberOfRooms: rooms.rooms?.length,
      sameAs: socials?.map(({ url }) => url),
      availableLanguage: LANGUAGES,
      amenityFeature: createAmenitiesList(general_amenities),
      containsPlace: rooms.rooms
        ?.filter((room) => typeof room !== 'string')
        .map((room) => createRoomStructuredData(room, guesthouse))
    })
  }
}

function createRoomStructuredData(room: Room, guesthouse: Guesthouse) {
  const {
    business_details: {
      check_in_out: { check_in_time, check_out_time }
    }
  } = guesthouse

  const {
    base_price,
    slug,
    name,
    description,
    gallery,
    details: { bed_count, sleeps_adults, sleeps_children },
    amenities
  } = room

  const amenityFeature = createAmenitiesList(amenities)
  const sleepsCount = sleeps_adults + sleeps_children
  const roomIdentifier = guesthouse.slug + '-' + slug

  return {
    '@type': ['HotelRoom', 'Product'],
    '@id': getBaseUrl() + '/guesthouses/' + guesthouse.slug + '/#' + slug,
    image: gallery.map(createMediaObject),
    name,
    description,
    identifier: roomIdentifier,
    offers: {
      '@type': ['Offer', 'LodgingReservation'],
      identifier: roomIdentifier + '-standard-rate',
      checkinTime: check_in_time,
      checkoutTime: check_out_time,
      url: guesthouse.booking_platform.url,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'CompoundPriceSpecification',
        price: base_price,
        priceCurrency: 'ZAR'
      }
    },
    bed: bed_count.map(({ bed, quantity }) => {
      if (typeof bed === 'string') return
      const { googleName } = bed

      return {
        '@type': 'BedDetails',
        typeOfBed: googleName,
        numberOfBeds: quantity
      }
    }),
    occupancy: {
      '@type': 'QuantitativeValue',
      value: sleepsCount,
      unitCode: 'C62'
    },
    amenityFeature
  }
}

export async function getGuesthouseListStructure() {
  const guesthouses = await fetchGuestHouses()

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'The Grand Collection Guesthouses',
    description:
      'A curated list of luxury guesthouses under The Grand Collection across South Africa.',
    url: getBaseUrl() + '/guesthouses',
    itemListElement: guesthouses.map(
      (
        {
          name,
          slug,
          content: {
            description,
            images: { exterior }
          }
        },
        index
      ) => {
        return {
          '@type': 'ListItem',
          position: index + 1,
          name,
          url: getBaseUrl() + '/guesthouses/' + slug,
          image: createMediaObject(exterior[0]),
          description
        }
      }
    )
  }
}
