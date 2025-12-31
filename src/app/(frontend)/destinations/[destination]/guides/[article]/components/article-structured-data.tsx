import {
  createBreadCrumbs,
  getOrganisationStructuredData
} from '@/lib/utils/create-structured-data'

import { getArticlePageData } from '../lib/article-data'

type ArticleStructuredDataProps = {
  destinationSlug: string
  articleSlug: string
}

export default async function ArticleStructuredData({
  destinationSlug,
  articleSlug
}: ArticleStructuredDataProps) {
  const {
    destination,
    article,
    canonical,
    createdDate,
    modifiedDate,
    authorName,
    authorType,
    ogImage
  } = await getArticlePageData(destinationSlug, articleSlug)
  const organisationSD = await getOrganisationStructuredData()

  const jsonLd = [
    createBreadCrumbs([
      {
        name: 'Guides',
        item: `/destinations/${destination.slug}`
      },
      {
        name: article.title,
        item: `/destinations/${destination.slug}/guides/${article.slug}`
      }
    ]),
    organisationSD,
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      datePublished: createdDate.dateTime,
      dateModified: modifiedDate.dateTime,
      author: {
        '@type': authorType,
        name: authorName
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Grand Collection',
        '@id': organisationSD['@id'],
        logo: organisationSD.logo
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonical
      },
      ...(ogImage && {
        image: [ogImage]
      })
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
