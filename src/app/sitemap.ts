import type { MetadataRoute } from 'next'

import { getBaseUrl } from '@/lib/utils'
import {
  fetchGuesthousesPageData,
  fetchHomePageData,
  getGuestHouses
} from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = getBaseUrl()

  const homePage = await fetchHomePageData('updatedAt')
  const allGuestHousesPage = await fetchGuesthousesPageData('updatedAt')
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
      priority: 1
    },
    // About page
    {
      url: baseURL + '/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    // Guesthouse Pages
    ...guesthouses.map(({ slug, createdAt, updatedAt }) => ({
      url: baseURL + '/' + slug,
      lastModified: new Date(updatedAt || createdAt),
      changeFrequency: 'yearly' as const,
      priority: 1
    }))
  ]
}
