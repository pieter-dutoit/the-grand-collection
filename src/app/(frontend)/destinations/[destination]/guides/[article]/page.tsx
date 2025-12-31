import 'server-only'

import { Metadata } from 'next'

import { fetchArticles, fetchDestinations } from '@/lib/data'
import { extractImageProps, getBaseUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { getArticleBreadcrumbs } from '@/lib/utils/breadcrumbs'

import Divider from '@/app/(frontend)/guesthouses/[guesthouse]/components/divider'
import ArticleHero from './components/hero'
import ArticleBody from './components/article-body'
import ArticleStructuredData from './components/article-structured-data'
import ArticleRelatedArticles from './components/article-related-articles'
import ArticleWhereToStay from './components/article-where-to-stay'
import ArticleFaq from './components/article-faq'

import {
  resolveDestinationSlug,
  getAbsoluteImageUrl
} from './lib/article-utils'
import { getArticlePageData } from './lib/article-data'

type Props = {
  params: Promise<{ destination: string; article: string }>
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

  const description = article.excerpt

  const { alt: thumbnailAlt } = extractImageProps(article.thumbnail)
  const ogImage = getAbsoluteImageUrl(article.thumbnail)
  const canonical = `${getBaseUrl()}/destinations/${destinationSlug}/guides/${article.slug}`

  return {
    title: `${article.title} | ${destination.name} | The Grand Collection`,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      url: canonical,
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            alt: thumbnailAlt || article.title
          }
        ]
      })
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
      <section className='bg-olive-50'>
        <div className='container mx-auto py-6'>
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
