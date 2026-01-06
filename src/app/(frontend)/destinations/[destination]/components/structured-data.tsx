import JsonLd from '@/components/seo/json-ld'
import { extractImageProps, getBaseUrl } from '@/lib/utils'
import { getDestinationBreadcrumbs } from '@/lib/utils/breadcrumbs'
import {
  createFaqStructuredData,
  createItemListStructuredData,
  createPageStructuredData
} from '@/lib/utils/create-structured-data'

import { getDestinationData } from '../lib/destination-data'

type DestinationGuidesStructuredDataProps = {
  destinationSlug: string
}

export default async function DestinationGuidesStructuredData({
  destinationSlug
}: DestinationGuidesStructuredDataProps) {
  const { destination, articles, guesthouses } =
    await getDestinationData(destinationSlug)
  const pageTitle = destination.title || destination.name
  const pageDescription = destination.description || ''
  const baseUrl = getBaseUrl()
  const canonical = `${baseUrl}/destinations/${destination.slug}`
  const breadcrumbs = getDestinationBreadcrumbs(destination)
  const faqStructuredData = createFaqStructuredData({
    faq: destination.faq,
    pageUrl: canonical,
    name: `${destination.name} FAQs`
  })
  const listItems = articles.map((article, index) => {
    const authorName = article.author?.trim() || 'The Grand Collection'
    const authorType = 'Organization'
    const { url: thumbnail } = extractImageProps(article.thumbnail)

    return {
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        '@id': `${baseUrl}/destinations/${destination.slug}/guides/${article.slug}#article`,
        name: article.title,
        headline: article.title,
        url: `${baseUrl}/destinations/${destination.slug}/guides/${article.slug}`,
        ...(thumbnail && { image: [thumbnail] }),
        author: {
          '@type': authorType,
          name: authorName
        }
      }
    }
  })

  const guidesListStructuredData = createItemListStructuredData({
    pageUrl: canonical,
    idSuffix: 'guides',
    name: `${pageTitle} Guides`,
    description: pageDescription || undefined,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: listItems
  })
  const accommodationsListStructuredData = createItemListStructuredData({
    pageUrl: canonical,
    idSuffix: 'accommodations',
    name: `${destination.name} Places to Stay`,
    description: destination.accommodation?.description || undefined,
    itemListElement: guesthouses.map((guesthouse, index) => {
      const guesthouseUrl = `${baseUrl}/guesthouses/${guesthouse.slug}`
      const address = guesthouse.contact_details?.address
      const { url: imageUrl } = extractImageProps(
        guesthouse.content.images.exterior[0]
      )
      const image = imageUrl || undefined

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'LodgingBusiness',
          '@id': `${guesthouseUrl}#lodgingbusiness`,
          name: guesthouse.name,
          url: guesthouseUrl,
          ...(image && { image: [image] }),
          description: guesthouse.content.description,
          ...(address && {
            address: {
              '@type': 'PostalAddress',
              streetAddress: address.street,
              addressLocality: address.suburb,
              addressRegion: address.province,
              postalCode: address.postalCode,
              addressCountry: 'ZA'
            }
          })
        }
      }
    })
  })
  const jsonLd = await createPageStructuredData({
    pageUrl: canonical,
    pageType: 'CollectionPage',
    name: pageTitle,
    description: pageDescription || undefined,
    breadcrumbs,
    mainEntityId: guidesListStructuredData['@id'] as string | undefined,
    additionalNodes: [
      guidesListStructuredData,
      accommodationsListStructuredData,
      faqStructuredData
    ]
  })

  return <JsonLd data={jsonLd} />
}
