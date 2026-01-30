import 'server-only'

import { Metadata } from 'next'

import { fetchArticles, fetchDestinations } from '@/lib/data'
import {
  extractImageProps,
  getBaseUrl,
  getPublicImageSizeUrl
} from '@/lib/utils'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { getArticleBreadcrumbs } from '@/lib/utils/breadcrumbs'

import Divider from '@/app/(frontend)/guesthouses/[guesthouse]/components/divider'
import ArticleHero from './components/hero'
import ArticleBody from './components/article-body'
import ArticleStructuredData from './components/article-structured-data'
import ArticleRelatedArticles from './components/article-related-articles'
import ArticleWhereToStay from './components/article-where-to-stay'
import ArticleFaq from './components/article-faq'

import { resolveDestinationSlug } from './lib/article-utils'
import { getArticlePageData } from './lib/article-data'

type Props = {
  params: Promise<{ destination: string; article: string }>
}

const normalizeText = (value?: string | null) => {
  if (!value) return undefined
  const trimmed = value.trim()
  return trimmed.length ? trimmed : undefined
}

export async function generateStaticParams() {
  const [articles, destinations] = await Promise.all([
    fetchArticles(),
    fetchDestinations()
  ])

  const destinationById = new Map(
    destinations.map((destination) => [destination.id, destination.slug])
  )

  return articles.flatMap((article) => {
    if (!article.slug) {
      return []
    }

    if (!article.destination) {
      return []
    }

    const destinationSlug = resolveDestinationSlug(
      article.destination,
      destinationById
    )

    if (!destinationSlug) {
      return []
    }

    return [
      {
        destination: destinationSlug,
        article: article.slug
      }
    ]
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { destination: destinationSlug, article: articleSlug } = await params

  const [destination] = await fetchDestinations({
    slug: { equals: destinationSlug }
  })

  if (!destination) return {}

  const [article] = await fetchArticles({
    slug: { equals: articleSlug },
    destination: { equals: destination.id }
  })

  if (!article) return {}

  const seo = article.seo
  const descriptionFallback = article.excerpt
  const pageTitleFallback = `${article.title} | ${destination.name}`
  const metaTitle = normalizeText(seo?.meta?.title)
  const metaDescription = normalizeText(seo?.meta?.description)
  const ogTitle = normalizeText(seo?.open_graph?.title)
  const ogDescription = normalizeText(seo?.open_graph?.description)
  const ogSiteName = normalizeText(seo?.open_graph?.site_name)

  const resolvedTitle = metaTitle ?? pageTitleFallback
  const resolvedDescription = metaDescription ?? descriptionFallback
  const resolvedOgTitle = ogTitle ?? metaTitle ?? pageTitleFallback
  const resolvedOgDescription =
    ogDescription ?? metaDescription ?? descriptionFallback

  const thumbnailProps = extractImageProps(article.thumbnail)
  const seoOgImage = seo?.open_graph?.image
  const seoOgImageProps = seoOgImage ? extractImageProps(seoOgImage) : null
  const ogImageUrl = seoOgImageProps?.url || thumbnailProps.url
  const ogImageAlt = seoOgImageProps?.alt || thumbnailProps.alt || article.title
  const ogImageSource = seoOgImageProps?.url ? seoOgImage : article.thumbnail
  const twitterImageUrl =
    getPublicImageSizeUrl(ogImageSource, 'twitter') || ogImageUrl
  const canonical = `${getBaseUrl()}/destinations/${destinationSlug}/guides/${article.slug}`

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical
    },
    openGraph: {
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      ...(ogSiteName ? { siteName: ogSiteName } : {}),
      type: 'article',
      url: canonical,
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      authors: [article.author?.trim() || 'The Grand Collection'],
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            alt: ogImageAlt || article.title
          }
        ]
      })
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      ...(seo?.twitter?.creator ? { creator: seo.twitter.creator } : {}),
      ...(seo?.twitter?.creatorId ? { creatorId: seo.twitter.creatorId } : {}),
      ...(twitterImageUrl ? { images: [twitterImageUrl] } : {})
    }
  }
}

export default async function ArticlePage({ params }: Props) {
  const { destination: destinationSlug, article: articleSlug } = await params
  const { destination, article } = await getArticlePageData(
    destinationSlug,
    articleSlug
  )
  const breadcrumbs = getArticleBreadcrumbs(destination, article)

  return (
    <>
      <ArticleStructuredData
        destinationSlug={destinationSlug}
        articleSlug={articleSlug}
      />
      <section className='absolute inset-x-0 top-16 z-20 w-full py-3'>
        <div className='container mx-auto w-full'>
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </section>
      <ArticleHero
        destinationSlug={destinationSlug}
        articleSlug={articleSlug}
      />
      <ArticleBody
        destinationSlug={destinationSlug}
        articleSlug={articleSlug}
      />
      <Divider />
      <ArticleRelatedArticles
        destinationSlug={destinationSlug}
        articleSlug={articleSlug}
      />
      <ArticleWhereToStay
        destinationSlug={destinationSlug}
        articleSlug={articleSlug}
      />
      <ArticleFaq destinationSlug={destinationSlug} articleSlug={articleSlug} />
    </>
  )
}
