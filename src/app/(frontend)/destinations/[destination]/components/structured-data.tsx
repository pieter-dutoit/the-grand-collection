import { createBreadCrumbs } from '@/lib/utils/create-structured-data'
import { getBaseUrl } from '@/lib/utils'

import { getDestinationGuidesData } from '../lib/guides-data'

type DestinationGuidesStructuredDataProps = {
  destinationSlug: string
}

export default async function DestinationGuidesStructuredData({
  destinationSlug
}: DestinationGuidesStructuredDataProps) {
  const { destination, orderedArticles } =
    await getDestinationGuidesData(destinationSlug)
  const pageTitle = destination.guides?.title || 'Guides'
  const pageDescription = destination.guides?.description || ''
  const baseUrl = getBaseUrl()
  const canonical = `${baseUrl}/destinations/${destination.slug}`
  const listItems = orderedArticles.map((article, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Article',
      name: article.title,
      url: `${baseUrl}/destinations/${destination.slug}/guides/${article.slug}`
    }
  }))

  const jsonLd = [
    createBreadCrumbs([
      {
        name: pageTitle,
        item: `/destinations/${destination.slug}`
      }
    ]),
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
