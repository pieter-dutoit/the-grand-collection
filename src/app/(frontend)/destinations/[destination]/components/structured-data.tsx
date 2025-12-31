import { getBaseUrl } from '@/lib/utils'
import {
  createBreadcrumbListStructuredData,
  getDestinationBreadcrumbs
} from '@/lib/utils/breadcrumbs'

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
  const listItems = articles.map((article, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Article',
      name: article.title,
      url: `${baseUrl}/destinations/${destination.slug}/guides/${article.slug}`
    }
  }))

  const jsonLd = [
    createBreadcrumbListStructuredData(breadcrumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: pageTitle,
      ...(pageDescription && { description: pageDescription }),
      url: canonical,
      mainEntity: {
        '@type': 'ItemList',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: listItems.length,
        itemListElement: listItems
      }
    }
  ]

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
      }}
    />
  )
}
