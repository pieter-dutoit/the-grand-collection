import { fetchGuestHouses } from '@/lib/data'

import WhereToStaySection from './where-to-stay'
import { getArticlePageData } from '../lib/article-data'

type ArticleWhereToStayProps = {
  destinationSlug: string
  articleSlug: string
}

export default async function ArticleWhereToStay({
  destinationSlug,
  articleSlug
}: ArticleWhereToStayProps) {
  const { destination } = await getArticlePageData(destinationSlug, articleSlug)
  const guesthouses = await fetchGuestHouses({
    destination: { equals: destination.id }
  })

  return (
    <WhereToStaySection guesthouses={guesthouses} destination={destination} />
  )
}
