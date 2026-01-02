import JsonLd from '@/components/seo/json-ld'
import {
  createArticleStructuredData,
  createFaqStructuredData,
  createPageStructuredData
} from '@/lib/utils/create-structured-data'
import { getArticleBreadcrumbs } from '@/lib/utils/breadcrumbs'

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
  const breadcrumbs = getArticleBreadcrumbs(destination, article)
  const faqStructuredData = createFaqStructuredData({
    faq: article.faq,
    pageUrl: canonical,
    name: 'Frequently Asked Questions'
  })

  const articleStructuredData = createArticleStructuredData({
    pageUrl: canonical,
    headline: article.title,
    description: article.excerpt,
    datePublished: createdDate.dateTime,
    dateModified: modifiedDate.dateTime,
    authorName,
    authorType,
    image: ogImage
  })
  const jsonLd = await createPageStructuredData({
    pageUrl: canonical,
    name: article.title,
    description: article.excerpt,
    breadcrumbs,
    mainEntityId: articleStructuredData['@id'] as string | undefined,
    additionalNodes: [articleStructuredData, faqStructuredData]
  })

  return <JsonLd data={jsonLd} />
}
