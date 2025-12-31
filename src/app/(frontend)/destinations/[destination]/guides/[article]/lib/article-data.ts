import 'server-only'

import { cache } from 'react'
import { notFound } from 'next/navigation'

import { fetchArticles, fetchDestinations } from '@/lib/data'
import { extractImageProps, getBaseUrl } from '@/lib/utils'
import { hasFaqItems } from '@/lib/utils/faq'
import type { Article, Destination } from '@/payload/payload-types'

import { getAbsoluteImageUrl } from './article-utils'

type DateInfo = {
  dateTime: string
  humanReadable: string
}

type ArticleThumbnail = {
  url?: string
  altText: string
  sizes: string
  aspectRatio?: number
  maxWidthClass: string
}

type ArticlePageData = {
  destination: Destination
  article: Article
  canonical: string
  createdDate: DateInfo
  modifiedDate: DateInfo
  updatedDate: DateInfo | null
  authorName: string
  authorType: 'Organization' | 'Person'
  hasFaq: boolean
  ogImage?: string
  thumbnail: ArticleThumbnail
}

const formatDate = (value: string): DateInfo => {
  const date = new Date(value)

  return {
    dateTime: date.toISOString(),
    humanReadable: new Intl.DateTimeFormat('en-ZA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date)
  }
}

const shouldShowUpdatedAt = (createdAt: string, updatedAt: string) => {
  const created = new Date(createdAt).getTime()
  const updated = new Date(updatedAt).getTime()

  return Math.abs(updated - created) >= 1000 * 60 * 60 * 24
}

export const getArticlePageData = cache(
  async (
    destinationSlug: string,
    articleSlug: string
  ): Promise<ArticlePageData> => {
    const [destination] = await fetchDestinations({
      slug: { equals: destinationSlug }
    })

    if (!destination) {
      notFound()
    }

    const [article] = await fetchArticles({
      slug: { equals: articleSlug },
      destination: { equals: destination.id }
    })

    if (!article || !article.slug) {
      notFound()
    }

    const createdDate = formatDate(article.createdAt)
    const modifiedDate = formatDate(article.updatedAt)
    const updatedDate = shouldShowUpdatedAt(
      article.createdAt,
      article.updatedAt
    )
      ? modifiedDate
      : null
    const authorName = article.author?.trim() || 'The Grand Collection'
    const authorType =
      authorName === 'The Grand Collection' ? 'Organization' : 'Person'
    const canonical = `${getBaseUrl()}/destinations/${destination.slug}/guides/${article.slug}`

    const { url, alt, width, height } = extractImageProps(article.thumbnail)
    const aspectRatio = width && height ? width / height : undefined
    const isPortrait = typeof aspectRatio === 'number' && aspectRatio < 1
    const sizes = isPortrait
      ? '(min-width: 1024px) 576px, 90vw'
      : '(min-width: 1024px) 768px, 90vw'

    return {
      destination,
      article,
      canonical,
      createdDate,
      modifiedDate,
      updatedDate,
      authorName,
      authorType,
      hasFaq: hasFaqItems(article.faq),
      ogImage: getAbsoluteImageUrl(article.thumbnail),
      thumbnail: {
        url,
        altText: alt || article.title,
        sizes,
        aspectRatio,
        maxWidthClass: 'max-w-full'
      }
    }
  }
)
