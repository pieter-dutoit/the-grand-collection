import type { Article, Destination, Guesthouse } from '@/payload/payload-types'
import { getBaseUrl } from '@/lib/utils'

export type BreadcrumbItem = {
  name: string
  href?: string
}

const HOME_CRUMB: BreadcrumbItem = { name: 'Home', href: '/' }
export const DESTINATIONS_CRUMB: BreadcrumbItem = { name: 'Destinations' }
export const GUIDES_CRUMB: BreadcrumbItem = { name: 'Guides' }

const isAbsoluteUrl = (value: string) => /^https?:\/\//.test(value)

const toAbsoluteUrl = (baseUrl: string, href: string) =>
  isAbsoluteUrl(href) ? href : `${baseUrl}${href}`

export const buildBreadcrumbs = (crumbs: BreadcrumbItem[] = []) => [
  HOME_CRUMB,
  ...crumbs
]

export const createBreadcrumbListStructuredData = (items: BreadcrumbItem[]) => {
  const baseUrl = getBaseUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const listItem: {
        '@type': 'ListItem'
        position: number
        name: string
        item?: string
      } = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name
      }

      if (item.href) {
        listItem.item = toAbsoluteUrl(baseUrl, item.href)
      }

      return listItem
    })
  }
}

export const getHomeBreadcrumbs = () => buildBreadcrumbs()

export const getAboutBreadcrumbs = () =>
  buildBreadcrumbs([{ name: 'About', href: '/about' }])

export const getGuesthousesBreadcrumbs = () =>
  buildBreadcrumbs([{ name: 'Guesthouses', href: '/guesthouses' }])

export const getDestinationBreadcrumbs = (destination: Destination) =>
  buildBreadcrumbs([
    DESTINATIONS_CRUMB,
    {
      name: destination.name,
      href: `/destinations/${destination.slug}`
    }
  ])

export const getGuesthouseBreadcrumbs = (
  destination: Destination,
  guesthouse: Guesthouse
) =>
  buildBreadcrumbs([
    DESTINATIONS_CRUMB,
    {
      name: destination.name,
      href: `/destinations/${destination.slug}`
    },
    {
      name: guesthouse.name,
      href: `/guesthouses/${guesthouse.slug}`
    }
  ])

export const getArticleBreadcrumbs = (
  destination: Destination,
  article: Article
) =>
  buildBreadcrumbs([
    DESTINATIONS_CRUMB,
    {
      name: destination.name,
      href: `/destinations/${destination.slug}`
    },
    GUIDES_CRUMB,
    {
      name: article.title,
      href: `/destinations/${destination.slug}/guides/${article.slug}`
    }
  ])
