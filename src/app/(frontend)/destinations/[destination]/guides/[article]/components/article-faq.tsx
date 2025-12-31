import FaqSection from '@/components/faq-section'

import { getArticlePageData } from '../lib/article-data'

type ArticleFaqProps = {
  destinationSlug: string
  articleSlug: string
}

export default async function ArticleFaq({
  destinationSlug,
  articleSlug
}: ArticleFaqProps) {
  const { article } = await getArticlePageData(destinationSlug, articleSlug)

  return <FaqSection faq={article.faq} id='faq' />
}
