import JsonLd from '@/components/seo/json-ld'
import {
  createFaqStructuredData,
  getOrganisationStructuredData
} from '@/lib/utils/create-structured-data'
import {
  createBreadcrumbListStructuredData,
  getArticleBreadcrumbs
} from '@/lib/utils/breadcrumbs'

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
  const breadcrumbs = getArticleBreadcrumbs(destination, article)
  const faqStructuredData = createFaqStructuredData({
    faq: article.faq,
    pageUrl: canonical
  })

  const jsonLd = [
    createBreadcrumbListStructuredData(breadcrumbs),
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
    },
    ...(faqStructuredData ? [faqStructuredData] : [])
  ]

  return <JsonLd data={jsonLd} />
}
