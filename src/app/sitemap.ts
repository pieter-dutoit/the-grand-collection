import type { MetadataRoute } from 'next'

import { getBaseUrl } from '@/lib/utils'
import {
  fetchAboutPageData,
  fetchArticles,
  fetchDestinations,
  fetchGuestHouses,
  fetchGuesthousesPageData,
  fetchHomePageData
} from '@/lib/data'

const resolveDestinationSlug = (
  destination: { id?: string; slug?: string } | string,
  destinationById: Map<string, string>
) => {
  if (typeof destination === 'string') {
    return destinationById.get(destination)
  }

  return destination.slug
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = getBaseUrl()

  const [
    homePage,
    aboutPage,
    allGuestHousesPage,
    guesthouses,
    destinations,
    articles
  ] = await Promise.all([
    fetchHomePageData(),
    fetchAboutPageData(),
    fetchGuesthousesPageData(),
    fetchGuestHouses(),
    fetchDestinations(),
    fetchArticles()
  ])

  const destinationById = new Map(
    destinations
      .filter((destination) => destination.slug)
      .map((destination) => [destination.id, destination.slug])
  )

  const guideIndexLastModifiedByDestination = new Map<string, Date>()
  const articleEntries = articles.flatMap((article) => {
    if (!article.slug || !article.destination) {
      return []
    }

    const destinationSlug = resolveDestinationSlug(
      article.destination,
      destinationById
    )

    if (!destinationSlug) {
      return []
    }

    const articleLastModified = new Date(article.updatedAt || article.createdAt)

    const previousLastModified =
      guideIndexLastModifiedByDestination.get(destinationSlug)
    if (!previousLastModified || articleLastModified > previousLastModified) {
      guideIndexLastModifiedByDestination.set(
        destinationSlug,
        articleLastModified
      )
    }

    return [
      {
        url:
          baseURL +
          '/destinations/' +
          destinationSlug +
          '/guides/' +
          article.slug,
        lastModified: articleLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.8
      }
    ]
  })

  const guideIndexEntries = Array.from(
    guideIndexLastModifiedByDestination.entries()
  ).map(([destinationSlug, lastModified]) => ({
    url: baseURL + '/destinations/' + destinationSlug,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))

  return [
    // Home Page
    {
      url: baseURL,
      lastModified: homePage.updatedAt
        ? new Date(homePage.updatedAt)
        : new Date(),
      changeFrequency: 'monthly',
      priority: 0.3
    },
    // All Guesthouses Page
    {
      url: baseURL + '/guesthouses',
      lastModified: allGuestHousesPage.updatedAt
        ? new Date(allGuestHousesPage.updatedAt)
        : new Date(),
      changeFrequency: 'monthly',
      priority: 0.2
    },
    // About page
    {
      url: baseURL + '/about',
      lastModified: aboutPage.updatedAt
        ? new Date(aboutPage.updatedAt)
        : new Date(),
      changeFrequency: 'yearly',
      priority: 0.1
    },
    // Guesthouse Pages
    ...guesthouses.map(({ slug, updatedAt, createdAt }) => ({
      url: baseURL + '/guesthouses/' + slug,
      lastModified: new Date(updatedAt || createdAt),
      changeFrequency: 'monthly' as const,
      priority: 1
    })),
    // Destination Guides Index Pages (only when articles exist)
    ...guideIndexEntries,
    // Destination Guide Articles
    ...articleEntries
  ]
}
