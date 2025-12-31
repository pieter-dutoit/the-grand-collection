import { fetchArticles } from '@/lib/data'

import MoreArticlesSection from './more-articles'
import { getArticlePageData } from '../lib/article-data'

type ArticleRelatedArticlesProps = {
  destinationSlug: string
  articleSlug: string
}

export default async function ArticleRelatedArticles({
  destinationSlug,
  articleSlug
}: ArticleRelatedArticlesProps) {
  const { destination, article } = await getArticlePageData(
    destinationSlug,
    articleSlug
  )

  const relatedArticles = await fetchArticles(
    {
      destination: { equals: destination.id },
      id: { not_equals: article.id },
      slug: { exists: true }
    },
    {
      sort: ['-featured', '-updatedAt', '-createdAt'],
      limit: 6
    }
  )

  return (
    <MoreArticlesSection
      destination={destination}
      relatedArticles={relatedArticles}
    />
  )
}
