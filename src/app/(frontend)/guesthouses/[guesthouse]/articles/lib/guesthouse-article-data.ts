import 'server-only'

import { cache } from 'react'
import { notFound } from 'next/navigation'

import {
  fetchArticleSections,
  fetchArticles,
  fetchGuestHouses
} from '@/lib/data'
import { extractImageProps, formatDate, getBaseUrl } from '@/lib/utils'
import type { DateInfo } from '@/lib/utils'
import { hasFaqItems } from '@/lib/utils/faq'
import {
  getGuesthouseArticlesPath,
  getGuesthousePostPath
} from '@/lib/utils/articles'
import type {
  Article,
  ArticleSection,
  Guesthouse
} from '@/payload/payload-types'

type ArticleThumbnail = {
  url?: string
  altText: string
  sizes: string
  aspectRatio?: number
  maxWidthClass: string
}

export type GuesthouseArticleGroup = {
  section: ArticleSection
  articles: Article[]
}

type GuesthouseArticlesData = {
  guesthouse: Guesthouse
  articles: Article[]
  featuredArticles: Article[]
  sectionGroups: GuesthouseArticleGroup[]
  articleSections: ArticleSection[]
  canonical: string
}

type GuesthousePostPageData = GuesthouseArticlesData & {
  article: Article
  section: ArticleSection
  createdDate: DateInfo
  modifiedDate: DateInfo
  updatedDate: DateInfo | null
  authorName: string
  authorType: 'Organization' | 'Person'
  authorUrl?: string
  hasFaq: boolean
  ogImage?: string
  thumbnail: ArticleThumbnail
}

const shouldShowUpdatedAt = (createdAt: string, updatedAt: string) => {
  const created = new Date(createdAt).getTime()
  const updated = new Date(updatedAt).getTime()

  return Math.abs(updated - created) >= 1000 * 60 * 60 * 24
}

const getAbsoluteImageUrl = (image: Article['thumbnail']) => {
  const { url } = extractImageProps(image)
  return url || undefined
}

const getArticleSectionId = (
  section: Article['section'] | ArticleSection | string | null | undefined
) => {
  if (!section) {
    return undefined
  }

  if (typeof section === 'string') {
    return section
  }

  return section.id
}

const groupArticlesBySection = (
  articles: Article[],
  articleSections: ArticleSection[]
) => {
  const articlesBySectionId = new Map<string, Article[]>()

  for (const article of articles) {
    const sectionId = getArticleSectionId(article.section)

    if (!sectionId) {
      continue
    }

    const sectionArticles = articlesBySectionId.get(sectionId) ?? []
    sectionArticles.push(article)
    articlesBySectionId.set(sectionId, sectionArticles)
  }

  return articleSections.flatMap((section) => {
    const sectionArticles = articlesBySectionId.get(section.id) ?? []

    return sectionArticles.length
      ? [{ section, articles: sectionArticles }]
      : []
  })
}

export const getGuesthouseArticlesData = cache(
  async (guesthouseSlug: string): Promise<GuesthouseArticlesData> => {
    const [guesthouse] = await fetchGuestHouses({
      slug: { equals: guesthouseSlug }
    })

    if (!guesthouse) {
      notFound()
    }

    const [articles, articleSections] = await Promise.all([
      fetchArticles(
        {
          type: { equals: 'guesthouse_post' },
          guesthouse: { equals: guesthouse.id },
          slug: { exists: true }
        },
        {
          sort: ['-featured', '-updatedAt', '-createdAt']
        }
      ),
      fetchArticleSections()
    ])

    if (articles.length === 0) {
      notFound()
    }

    const featuredArticles = articles.filter((article) => article.featured)
    const regularArticles = articles.filter((article) => !article.featured)

    return {
      guesthouse,
      articles,
      featuredArticles,
      sectionGroups: groupArticlesBySection(regularArticles, articleSections),
      articleSections,
      canonical: `${getBaseUrl()}${getGuesthouseArticlesPath(guesthouse.slug)}`
    }
  }
)

export const getGuesthousePostPageData = cache(
  async (
    guesthouseSlug: string,
    articleSlug: string
  ): Promise<GuesthousePostPageData> => {
    const articlesData = await getGuesthouseArticlesData(guesthouseSlug)
    const { guesthouse, articles, articleSections } = articlesData
    const article = articles.find((candidate) => candidate.slug === articleSlug)

    if (!article || !article.slug) {
      notFound()
    }

    const sectionId = getArticleSectionId(article.section)
    const section = sectionId
      ? articleSections.find((candidate) => candidate.id === sectionId)
      : undefined

    if (!section) {
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
    const authorUrl = authorType === 'Organization' ? getBaseUrl() : undefined
    const canonical = `${getBaseUrl()}${getGuesthousePostPath(
      guesthouse.slug,
      article.slug
    )}`

    const { url, alt, width, height } = extractImageProps(article.thumbnail)
    const aspectRatio = width && height ? width / height : undefined
    const isPortrait = typeof aspectRatio === 'number' && aspectRatio < 1
    const sizes = isPortrait
      ? '(min-width: 1024px) 576px, 90vw'
      : '(min-width: 1024px) 768px, 90vw'

    return {
      ...articlesData,
      section,
      article,
      canonical,
      createdDate,
      modifiedDate,
      updatedDate,
      authorName,
      authorType,
      authorUrl,
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
