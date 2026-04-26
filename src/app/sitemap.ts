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
import {
  getGuesthouseArticlesPath,
  getGuesthousePostPath,
  getGuesthouseSlug,
  getGuideArticlePath
} from '@/lib/utils/articles'

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
  const guesthouseSlugById = new Map(
    guesthouses
      .filter((guesthouse) => guesthouse.slug)
      .map((guesthouse) => [guesthouse.id, guesthouse.slug])
  )
  const guideIndexLastModifiedByDestination = new Map<string, Date>(
    destinations
      .filter((destination) => destination.slug)
      .map((destination) => [
        destination.slug,
        new Date(destination.updatedAt || destination.createdAt)
      ])
  )
  const guideArticleEntries = articles.flatMap((article) => {
    if (article.type !== 'guide') {
      return []
    }

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
        url: baseURL + getGuideArticlePath(destinationSlug, article.slug),
        lastModified: articleLastModified,
        changeFrequency: 'yearly' as const,
        priority: 0.8
      }
    ]
  })
  const guesthouseArticlesIndexLastModified = new Map<
    string,
    {
      guesthouseSlug: string
      lastModified: Date
    }
  >()
  const guesthousePostEntries = articles.flatMap((article) => {
    if (article.type !== 'guesthouse_post' || !article.slug) {
      return []
    }

    const guesthouseSlug = getGuesthouseSlug(
      article.guesthouse,
      guesthouseSlugById
    )

    if (!guesthouseSlug) {
      return []
    }

    const articleLastModified = new Date(article.updatedAt || article.createdAt)
    const previousIndex =
      guesthouseArticlesIndexLastModified.get(guesthouseSlug)

    if (!previousIndex || articleLastModified > previousIndex.lastModified) {
      guesthouseArticlesIndexLastModified.set(guesthouseSlug, {
        guesthouseSlug,
        lastModified: articleLastModified
      })
    }

    return [
      {
        url: baseURL + getGuesthousePostPath(guesthouseSlug, article.slug),
        lastModified: articleLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6
      }
    ]
  })

  const guideIndexEntries = Array.from(
    guideIndexLastModifiedByDestination.entries()
  ).map(([destinationSlug, lastModified]) => ({
    url: baseURL + '/destinations/' + destinationSlug,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))
  const guesthouseArticlesIndexEntries = Array.from(
    guesthouseArticlesIndexLastModified.values()
  ).map(({ guesthouseSlug, lastModified }) => ({
    url: baseURL + getGuesthouseArticlesPath(guesthouseSlug),
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.6
  }))

  return [
    // Home Page
    {
      url: baseURL,
      lastModified: homePage.updatedAt
        ? new Date(homePage.updatedAt)
        : new Date(),
      changeFrequency: 'yearly',
      priority: 0.3
    },
    // All Guesthouses Page
    {
      url: baseURL + '/guesthouses',
      lastModified: allGuestHousesPage.updatedAt
        ? new Date(allGuestHousesPage.updatedAt)
        : new Date(),
      changeFrequency: 'yearly',
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
    // Destination Pages
    ...guideIndexEntries,
    // Destination Guide Articles
    ...guideArticleEntries,
    // Guesthouse Article Indexes
    ...guesthouseArticlesIndexEntries,
    // Guesthouse Articles
    ...guesthousePostEntries
  ]
}
