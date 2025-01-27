import type { MetadataRoute } from 'next'

import { getBaseUrl } from '@/lib/utils'
import {
  fetchAboutPageData,
  fetchGuesthousesPageData,
  fetchHomePageData,
  getGuestHouses
} from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = getBaseUrl()

  const homePage = await fetchHomePageData()
  const aboutPage = await fetchAboutPageData()
  const allGuestHousesPage = await fetchGuesthousesPageData()
  const guesthouses = await getGuestHouses()

  return [
    // Home Page
    {
      url: baseURL,
      lastModified: homePage.updatedAt
        ? new Date(homePage.updatedAt)
        : new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    // All Guesthouses Page
    {
      url: baseURL + '/guesthouses',
      lastModified: allGuestHousesPage.updatedAt
        ? new Date(allGuestHousesPage.updatedAt)
        : new Date(),
      changeFrequency: 'yearly',
      priority: 0.9
    },
    // About page
    {
      url: baseURL + '/about',
      lastModified: aboutPage.updatedAt
        ? new Date(aboutPage.updatedAt)
        : new Date(),
      changeFrequency: 'yearly',
      priority: 0.7
    },
    // Guesthouse Pages
    ...guesthouses.map(({ slug, createdAt, updatedAt }) => ({
      url: baseURL + '/' + slug,
      lastModified: new Date(updatedAt || createdAt),
      changeFrequency: 'yearly' as const,
      priority: 0.8
    }))
  ]
}
