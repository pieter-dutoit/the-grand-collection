import { fetchGuestHouses } from '@/lib/data'

import { getArticlePageData } from '../lib/article-data'
import WhereToStaySection from '@/components/where-to-stay'

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
    <WhereToStaySection
      description='Our recommended place to stay. Close to the places above, with the comfort to match your trip.'
      guesthouses={guesthouses}
      destination={destination}
    />
  )
}
