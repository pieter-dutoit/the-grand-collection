import JsonLd from '@/components/seo/json-ld'
import { getBaseUrl } from '@/lib/utils'
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
  const { destination, articles } = await getDestinationData(destinationSlug)
  const pageTitle = destination.title || destination.name
  const pageDescription = destination.description || ''
  const baseUrl = getBaseUrl()
  const canonical = `${baseUrl}/destinations/${destination.slug}`
  const breadcrumbs = getDestinationBreadcrumbs(destination)
  const faqStructuredData = createFaqStructuredData({
    faq: destination.faq,
    pageUrl: canonical
  })
  const listItems = articles.map((article, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Article',
      '@id': `${baseUrl}/destinations/${destination.slug}/guides/${article.slug}#article`,
      name: article.title,
      url: `${baseUrl}/destinations/${destination.slug}/guides/${article.slug}`
    }
  }))

  const itemListStructuredData = createItemListStructuredData({
    pageUrl: canonical,
    name: `${pageTitle} Guides`,
    description: pageDescription || undefined,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: listItems
  })
  const jsonLd = await createPageStructuredData({
    pageUrl: canonical,
    pageType: 'CollectionPage',
    name: pageTitle,
    description: pageDescription || undefined,
    breadcrumbs,
    mainEntityId: itemListStructuredData['@id'] as string | undefined,
    additionalNodes: [itemListStructuredData, faqStructuredData]
  })

  return <JsonLd data={jsonLd} />
}
