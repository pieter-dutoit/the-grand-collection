import 'server-only'

import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { fetchArticles, fetchDestinations } from '@/lib/data'
import { extractImageProps, getBaseUrl } from '@/lib/utils'
import { createBreadCrumbs } from '@/lib/utils/create-structured-data'
import BlurredBackdropImage from '@/components/ui/blurred-backdrop-image'
import { Badge } from '@/components/ui/badge'
import { ArticleRichText } from '@/components/rich-text'
import type { Destination, Media } from '@/payload/payload-types'

import ArticleTile from '../components/article-tile'

type Props = {
  params: Promise<{ destination: string; article: string }>
}

const resolveDestinationSlug = (
  destination: string | Destination,
  destinationById: Map<string, string>
) => {
  if (typeof destination === 'string') {
    return destinationById.get(destination)
  }

  return destination.slug
}

const formatDate = (value: string) => {
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

const getAbsoluteImageUrl = (image: Media | string) => {
  const { url } = extractImageProps(image)
  if (!url) return undefined

  const filename = url.split('/').pop()
  if (!filename) return undefined

  return `${getBaseUrl()}/api/images/${filename}`
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

  const destinations = await fetchDestinations({
    slug: { equals: destinationSlug }
  })
  const [destination] = destinations

  if (!destination) {
    notFound()
  }

  const articles = await fetchArticles({
    slug: { equals: articleSlug },
    destination: { equals: destination.id }
  })
  const [article] = articles

  if (!article || !article.slug) {
    notFound()
  }

  const createdDate = formatDate(article.createdAt)
  const showUpdatedAt = shouldShowUpdatedAt(
    article.createdAt,
    article.updatedAt
  )
  const updatedDate = showUpdatedAt ? formatDate(article.updatedAt) : null

  const { url: thumbnailUrl, alt: thumbnailAlt } = extractImageProps(
    article.thumbnail
  )
  const thumbnailAltText = thumbnailAlt || article.title
  const { width: thumbnailWidth, height: thumbnailHeight } = extractImageProps(
    article.thumbnail
  )
  const thumbnailAspectRatio =
    thumbnailWidth && thumbnailHeight
      ? thumbnailWidth / thumbnailHeight
      : undefined
  const thumbnailIsPortrait =
    typeof thumbnailAspectRatio === 'number' && thumbnailAspectRatio < 1
  const thumbnailMaxWidth = 'max-w-full'
  const thumbnailSizes = thumbnailIsPortrait
    ? '(min-width: 1024px) 576px, 90vw'
    : '(min-width: 1024px) 768px, 90vw'
  const ogImage = getAbsoluteImageUrl(article.thumbnail)

  const relatedArticles = await fetchArticles(
    {
      destination: { equals: destination.id },
      id: { not_equals: article.id },
      slug: { exists: true }
    },
    {
      sort: ['-featured', '-updatedAt', '-createdAt']
    }
  )

  const jsonLd = [
    createBreadCrumbs([
      {
        name: 'Articles',
        item: `/destinations/${destination.slug}/articles`
      },
      {
        name: article.title,
        item: `/destinations/${destination.slug}/guides/${article.slug}`
      }
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      datePublished: createdDate.dateTime,
      ...(showUpdatedAt &&
        updatedDate && {
          dateModified: updatedDate.dateTime
        }),
      author: {
        '@type': 'Organization',
        name: article.author
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Grand Collection',
        '@id': `${getBaseUrl()}/#organization`
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${getBaseUrl()}/destinations/${destination.slug}/guides/${article.slug}`
      },
      ...(ogImage && {
        image: [ogImage]
      })
    }
  ]

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className='bg-olive-50'>
        <div className='mx-auto flex w-full max-w-3xl flex-col gap-6 py-10 lg:py-20'>
          <Link
            href={`/destinations/${destination.slug}/articles`}
            className='inline-flex items-center gap-2 text-xs font-medium text-olive-500 transition hover:text-olive-700'
          >
            <ArrowLeft className='size-4' />
            Back to articles
          </Link>

          <div className='flex flex-col gap-4'>
            <h1 className='max-w-[40rem] text-3xl font-semibold text-olive-900 md:text-4xl lg:text-5xl'>
              {article.title}
            </h1>
            <p className='text-xs font-medium text-olive-500'>
              <time dateTime={createdDate.dateTime}>
                {createdDate.humanReadable}
              </time>{' '}
              • The Grand Collection
            </p>
            <Badge
              variant='outline'
              className='w-fit border-olive-200 bg-olive-50 text-olive-700 hover:bg-olive-100'
            >
              {destination.name}
            </Badge>
          </div>

          {thumbnailUrl && (
            <figure className='w-full'>
              <BlurredBackdropImage
                src={thumbnailUrl}
                alt={thumbnailAltText}
                sizes={thumbnailSizes}
                priority
                aspectRatio={thumbnailAspectRatio}
                containerClassName={twMerge(
                  'w-full rounded-2xl border border-olive-200 bg-olive-100 lg:max-h-[50vh]',
                  thumbnailMaxWidth
                )}
              />
            </figure>
          )}
        </div>
      </section>

      <section className='mx-auto flex w-full max-w-3xl flex-col gap-6 py-10 lg:py-20'>
        <ArticleRichText data={article.body} className='lg:prose-lg' />
      </section>

      {relatedArticles.length > 0 && (
        <section className='bg-olive-100'>
          <div className='container mx-auto py-10 lg:py-20'>
            <div className='flex flex-col gap-1'>
              <h2 className='text-lg font-semibold text-olive-900 md:text-xl lg:text-2xl'>
                More articles
              </h2>
              <p className='text-xs font-extrabold uppercase tracking-widest text-sage-500'>
                {destination.name}
              </p>
            </div>

            <ul className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {relatedArticles.map((related) => (
                <ArticleTile
                  key={related.id}
                  article={related}
                  destinationSlug={destination.slug}
                />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
