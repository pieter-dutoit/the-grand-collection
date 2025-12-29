import 'server-only'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { fetchArticles, fetchDestinations, fetchGuestHouses } from '@/lib/data'
import { extractImageProps, getBaseUrl } from '@/lib/utils'
import { createBreadCrumbs } from '@/lib/utils/create-structured-data'
import BlurredBackdropImage from '@/components/ui/blurred-backdrop-image'
import { Badge } from '@/components/ui/badge'
import { ArticleRichText } from '@/components/rich-text'
import type { Destination, Media } from '@/payload/payload-types'

import MoreArticlesSection from '../components/more-articles'
import WhereToStaySection from '../components/where-to-stay'
import { Button } from '@/components/ui/button'
import { ShareButton } from './share-button'

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
  const canonical = `${getBaseUrl()}/destinations/${destination.slug}/guides/${article.slug}`

  const [relatedArticles, guesthouses] = await Promise.all([
    fetchArticles(
      {
        destination: { equals: destination.id },
        id: { not_equals: article.id },
        slug: { exists: true }
      },
      {
        sort: ['-featured', '-updatedAt', '-createdAt'],
        limit: 6
      }
    ),
    fetchGuestHouses({
      destination: { equals: destination.id }
    })
  ])

  const jsonLd = [
    createBreadCrumbs([
      {
        name: 'Guides',
        item: `/destinations/${destination.slug}/guides`
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
        '@id': canonical
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
      <section
        id={article.slug}
        className='relative flex w-full flex-col justify-between bg-olive-50'
      >
        <div className='container mx-auto flex flex-col items-start gap-6 py-10 lg:py-20'>
          <Link
            href={`/destinations/${destination.slug}/guides`}
            className='inline-flex items-center gap-2 text-xs font-medium text-olive-500 transition hover:text-olive-700'
          >
            <ArrowLeft className='size-4' />
            Back to all guides
          </Link>
          <h1 className='max-w-3xl text-pretty text-3xl font-semibold text-olive-900 md:text-4xl lg:text-5xl'>
            {article.title}
          </h1>

          {/* Meta data */}
          <div className='flex w-full flex-row flex-wrap items-center justify-between gap-2'>
            {/* Left meta */}
            <div className='flex flex-wrap gap-2'>
              <Badge className='flex flex-wrap items-center gap-x-1 gap-y-0.5'>
                <span>The Grand Collection</span>
                <span className='mx-1'>&bull;</span>
                <time dateTime={createdDate.dateTime}>
                  {createdDate.humanReadable}
                </time>
              </Badge>
              {updatedDate && (
                <Badge
                  variant='outline'
                  className='flex flex-wrap items-center gap-x-1 gap-y-0.5'
                >
                  <span>Updated on</span>
                  <time dateTime={updatedDate.dateTime}>
                    {updatedDate.humanReadable}
                  </time>
                </Badge>
              )}
            </div>

            {/* Right meta  */}
            <div className='flex flex-wrap gap-2'>
              <ShareButton
                size='icon'
                colour='sage'
                title={article.title}
                text={article.excerpt || undefined}
                url={canonical}
              />
            </div>
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
                  'w-full rounded-2xl border border-olive-200 bg-olive-100 lg:max-h-[40vh]',
                  thumbnailMaxWidth
                )}
              />
            </figure>
          )}
        </div>
      </section>

      {/* Article body */}
      <div className='relative'>
        <div className='container mx-auto flex w-full justify-between gap-8 lg:gap-12'>
          {/* Left content - Richtext */}
          <section className='flex w-full max-w-prose flex-col gap-6 py-10 lg:py-20'>
            <ArticleRichText
              data={article.body}
              className='w-full lg:prose-lg'
            />
          </section>

          {/* Right content - sticky */}
          <div className='sticky top-16 hidden w-80 flex-col self-start py-10 md:block lg:py-20'>
            <nav
              aria-label='On this page'
              className='flex w-full flex-col items-end gap-2 rounded-lg border border-gold-100 p-4'
            >
              <h2 className='pr-4 text-lg font-extrabold text-gold-600'>
                On this page
              </h2>
              <ul className='flex w-full flex-col items-end'>
                <li>
                  <Button asChild variant='ghost' colour='gold'>
                    <Link href={`#more-articles`}>More things to do</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant='ghost' colour='gold'>
                    <Link href={`#where-to-stay`}>
                      Where to stay in {destination.name}
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant='ghost' colour='gold'>
                    <Link href={`#${article.slug}`}>Back to top</Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <MoreArticlesSection
        destination={destination}
        relatedArticles={relatedArticles}
      />

      <WhereToStaySection guesthouses={guesthouses} destination={destination} />
    </>
  )
}
