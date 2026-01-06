import 'server-only'

import { cache } from 'react'
import { notFound } from 'next/navigation'

import { fetchArticles, fetchDestinations, fetchGuestHouses } from '@/lib/data'
import type { Article, Destination, Guesthouse } from '@/payload/payload-types'

type DestinationData = {
  destination: Destination
  articles: Article[]
  featuredArticles: Article[]
  otherArticles: Article[]
  guesthouses: Guesthouse[]
}

export const getDestinationData = cache(
  async (destinationSlug: string): Promise<DestinationData> => {
    const [destination] = await fetchDestinations({
      slug: { equals: destinationSlug }
    })

    if (!destination) {
      notFound()
    }

    const [allArticles, guesthouses] = await Promise.all([
      fetchArticles(
        {
          destination: { equals: destination.id }
        },
        {
          sort: ['-featured', '-updatedAt', '-createdAt']
        }
      ),
      fetchGuestHouses({
        destination: { equals: destination.id }
      })
    ])

    const articles = allArticles.filter((article) => article.slug)

    const featuredArticles = articles
      .filter((article) => article.featured)
      .slice(0, 3)
    const featuredArticleIds = new Set(
      featuredArticles.map((article) => article.id)
    )
    const otherArticles = articles.filter(
      (article) => !featuredArticleIds.has(article.id)
    )

    return {
      destination,
      articles,
      featuredArticles,
      otherArticles,
      guesthouses
    }
  }
)
