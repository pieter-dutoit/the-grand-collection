import { Amenity, Faq, Guesthouse, Media, Room } from '@/payload/payload-types'
import { createSourceSet } from '@/components/ui/image'

import { extractContactDetails, extractImageProps, getBaseUrl } from '.'
import { fetchGuestHouses, fetchHomePageData, fetchLogo } from '../data'
import { createBreadcrumbListStructuredData } from './breadcrumbs'
import { getFaqItems } from './faq'
import type { BreadcrumbItem } from './breadcrumbs'

const SCHEMA_CONTEXT = 'https://schema.org'

export type StructuredDataNode = {
  '@type': string | string[]
  '@id'?: string
} & Record<string, unknown>

export type StructuredDataGraph = {
  '@context': typeof SCHEMA_CONTEXT
  '@graph': StructuredDataNode[]
}

export const createStructuredDataGraph = (
  nodes: Array<StructuredDataNode | null | undefined>
): StructuredDataGraph => ({
  '@context': SCHEMA_CONTEXT,
  '@graph': nodes.filter(Boolean) as StructuredDataNode[]
})

export const getOrganisationId = () => `${getBaseUrl()}#organization`
export const getWebSiteId = () => `${getBaseUrl()}#website`

type WebPageStructuredDataInput = {
  pageUrl: string
  pageType?: string | string[]
  name?: string
  description?: string
  breadcrumbId?: string
  mainEntityId?: string
}

export function createWebSiteStructuredData(): StructuredDataNode {
  const baseUrl = getBaseUrl()

  return {
    '@type': 'WebSite',
    '@id': getWebSiteId(),
    url: baseUrl,
    name: 'The Grand Collection',
    publisher: {
      '@id': getOrganisationId()
    },
    inLanguage: 'en-ZA'
  }
}

export function createWebPageStructuredData({
  pageUrl,
  pageType = 'WebPage',
  name,
  description,
  breadcrumbId,
  mainEntityId
}: WebPageStructuredDataInput): StructuredDataNode {
  return {
    '@type': pageType,
    '@id': pageUrl,
    url: pageUrl,
    ...(name && { name }),
    ...(description && { description }),
    isPartOf: {
      '@id': getWebSiteId()
    },
    publisher: {
      '@id': getOrganisationId()
    },
    ...(breadcrumbId && {
      breadcrumb: {
        '@id': breadcrumbId
      }
    }),
    ...(mainEntityId && {
      mainEntity: {
        '@id': mainEntityId
      }
    }),
    inLanguage: 'en-ZA'
  }
}

type PageStructuredDataInput = {
  pageUrl: string
  pageType?: string | string[]
  name?: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  mainEntityId?: string
  additionalNodes?: Array<StructuredDataNode | null | undefined>
}

export async function createPageStructuredData({
  pageUrl,
  pageType,
  name,
  description,
  breadcrumbs,
  mainEntityId,
  additionalNodes
}: PageStructuredDataInput): Promise<StructuredDataGraph> {
  const breadcrumbStructuredData = breadcrumbs
    ? createBreadcrumbListStructuredData(
        breadcrumbs,
        pageUrl,
        name ? `${name} Breadcrumbs` : undefined
      )
    : null
  const webPageStructuredData = createWebPageStructuredData({
    pageUrl,
    pageType,
    name,
    description,
    breadcrumbId: breadcrumbStructuredData?.['@id'] as string | undefined,
    mainEntityId
  })
  const organisationStructuredData = await getOrganisationStructuredData()

  return createStructuredDataGraph([
    createWebSiteStructuredData(),
    organisationStructuredData,
    webPageStructuredData,
    breadcrumbStructuredData,
    ...(additionalNodes ?? [])
  ])
}

type ItemListStructuredDataInput = {
  pageUrl: string
  idSuffix?: string
  name?: string
  description?: string
  itemListOrder?: string
  itemListElement: StructuredDataNode[]
}

export function createItemListStructuredData({
  pageUrl,
  idSuffix = 'itemlist',
  name,
  description,
  itemListOrder,
  itemListElement
}: ItemListStructuredDataInput): StructuredDataNode {
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl}#${idSuffix}`,
    ...(name && { name }),
    ...(description && { description }),
    ...(itemListOrder && { itemListOrder }),
    url: pageUrl,
    numberOfItems: itemListElement.length,
    itemListElement
  }
}

type ArticleAuthorType = 'Organization' | 'Person'

type ArticleStructuredDataInput = {
  pageUrl: string
  headline: string
  description?: string | null
  datePublished: string
  dateModified: string
  authorName: string
  authorType: ArticleAuthorType
  image?: string
}

export function createArticleStructuredData({
  pageUrl,
  headline,
  description,
  datePublished,
  dateModified,
  authorName,
  authorType,
  image
}: ArticleStructuredDataInput): StructuredDataNode {
  return {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    url: pageUrl,
    name: headline,
    headline,
    ...(description && { description }),
    datePublished,
    dateModified,
    author: {
      '@type': authorType,
      name: authorName
    },
    publisher: {
      '@id': getOrganisationId()
    },
    mainEntityOfPage: {
      '@id': pageUrl
    },
    ...(image && { image: [image] })
  }
}

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
  return amenities
    .filter((amenity) => typeof amenity !== 'string')
    .map(({ googleName }) =>
      googleName
        ? {
            '@type': 'LocationFeatureSpecification',
            name: googleName,
            value: true
          }
        : null
    )
    .filter(Boolean)
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
      '@id': getOrganisationId(),
      name: 'The Grand Collection'
    },
    copyrightNotice: `© ${currentYear} The Grand Collection. All Rights Reserved.`
  }
}

export async function getOrganisationStructuredData() {
  // Home page data
  const homePageData = await fetchHomePageData()
  const { hero, overview, socials, contactPersons } = homePageData
  const contacts = extractContactDetails(contactPersons)
  const baseUrl = getBaseUrl()

  // Logo
  const logoData = await fetchLogo('minimal_dark')
  const { url: logoURL } = extractImageProps(logoData.minimal_dark)

  return {
    '@type': 'Organization',
    '@id': getOrganisationId(),
    url: baseUrl,
    name: 'The Grand Collection',
    sameAs: socials?.map(({ url }) => url),
    logo: createAbsoluteImagePath(logoURL),
    image: [hero?.background_image, ...(overview?.images || [])]
      .slice(0, 3)
      .filter((image) => typeof image !== 'string')
      .map((image) => (image ? createMediaObject(image) : null))
      .filter(Boolean),
    description:
      'The Grand Collection offers a selection of luxury guesthouses across South Africa, catering to business and leisure travellers.',
    slogan: 'Splendour Stay',
    contactPoint: contacts.map(({ email, phoneLink }) => ({
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email,
      telephone: '+27' + phoneLink
    }))
  }
}

export function createFaqStructuredData({
  faq,
  pageUrl,
  name
}: {
  faq: Faq | string | null | undefined
  pageUrl?: string
  name?: string
}) {
  const items = getFaqItems(faq)

  if (items.length === 0) {
    return null
  }
  const faqName = name?.trim() || 'Frequently Asked Questions'

  return {
    '@type': 'FAQPage',
    name: faqName,
    headline: faqName,
    ...(pageUrl && {
      '@id': `${pageUrl}#faq`,
      url: pageUrl
      // isPartOf: {
      //   '@id': pageUrl
      // }
    }),
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    }))
  }
}

export async function createGuesthouseStructuredData({
  guesthouse,
  minimal = false,
  pageUrl
}: {
  guesthouse: Guesthouse
  minimal?: boolean
  pageUrl?: string
}) {
  const {
    slug,
    name,
    contact_details: { address, contact_persons, socials },
    content: {
      description,
      images: { background_image, exterior, interior },
      rooms: { rooms },
      amenities: { general_amenities }
    },
    business_details: {
      hours: { opening_time, closing_time },
      check_in_out: { check_in_time, check_out_time },
      geo: { latitude, longitude, maps_link }
    }
  } = guesthouse

  const guesthouseUrl = pageUrl ?? `${getBaseUrl()}/guesthouses/${slug}`
  const telephone = '+27' + extractContactDetails(contact_persons)[0].phoneLink
  const email = extractContactDetails(contact_persons)[0].email

  const roomsImages = rooms
    ?.filter((room) => typeof room !== 'string')
    .flatMap(({ gallery }) => gallery)

  return {
    '@type': 'LodgingBusiness',
    '@id': `${guesthouseUrl}#lodgingbusiness`,
    url: guesthouseUrl,
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
      parentOrganization: {
        '@id': getOrganisationId()
      },
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
      image: [
        background_image,
        interior[0],
        exterior[0],
        ...(roomsImages || []).slice(0, 1)
      ]
        .slice(0, 5)
        .filter((image) => typeof image !== 'string')
        .map(createMediaObject),
      openingHours: ['Mo-Su ' + opening_time + '-' + closing_time],
      checkinTime: check_in_time,
      checkoutTime: check_out_time,
      currenciesAccepted: 'ZAR',
      audience: BUSINESS_AUDIENCE,
      numberOfRooms: rooms?.length,
      sameAs: socials?.map(({ url }) => url),
      availableLanguage: LANGUAGES,
      amenityFeature: createAmenitiesList(general_amenities),
      containsPlace: rooms
        ?.filter((room) => typeof room !== 'string')
        .map((room) =>
          createRoomStructuredData(room, guesthouse, guesthouseUrl)
        )
    })
  }
}

function createRoomStructuredData(
  room: Room,
  guesthouse: Guesthouse,
  guesthouseUrl: string
) {
  const {
    base_price,
    slug,
    name,
    description,
    gallery,
    details: { beds, sleeps_adults, sleeps_children },
    amenities
  } = room

  const amenityFeature = createAmenitiesList(amenities)
  const sleepsCount = sleeps_adults + sleeps_children
  const roomIdentifier = guesthouse.slug + '-' + slug

  return {
    '@type': ['HotelRoom', 'Product'],
    '@id': `${guesthouseUrl}#room-${slug}`,
    image: gallery.map(createMediaObject).slice(0, 4),
    name,
    description,
    identifier: roomIdentifier,
    offers: {
      '@type': 'Offer',
      '@id': `${guesthouseUrl}#offer-${roomIdentifier}`,
      url: guesthouse.booking_platform.url,
      availability: 'https://schema.org/InStock',
      price: base_price,
      priceCurrency: 'ZAR'
    },
    bed: beds
      .map(({ type, quantity }) => {
        if (typeof type === 'string') return
        const { googleName } = type

        return {
          '@type': 'BedDetails',
          typeOfBed: googleName,
          numberOfBeds: quantity
        }
      })
      .filter(Boolean),
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
  const baseUrl = getBaseUrl()
  const pageUrl = `${baseUrl}/guesthouses`

  return createItemListStructuredData({
    pageUrl,
    name: 'The Grand Collection Guesthouses',
    description:
      'A curated list of luxury guesthouses under The Grand Collection across South Africa.',
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
        const guesthouseUrl = `${baseUrl}/guesthouses/${slug}`

        return {
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'LodgingBusiness',
            '@id': `${guesthouseUrl}#lodgingbusiness`,
            name,
            url: guesthouseUrl,
            image: createMediaObject(exterior[0]),
            description
          }
        }
      }
    )
  })
}
