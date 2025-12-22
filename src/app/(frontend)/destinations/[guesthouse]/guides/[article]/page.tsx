import 'server-only'

import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fetchArticles, fetchGuestHouses } from '@/lib/data'
import { extractImageProps, getBaseUrl } from '@/lib/utils'
import { createBreadCrumbs } from '@/lib/utils/create-structured-data'
import BlurredBackdropImage from '@/components/ui/blurred-backdrop-image'
import { Badge } from '@/components/ui/badge'
import Image from '@/components/ui/image'
import SectionHeading from '@/components/ui/section-heading'
import { ArticleRichText } from '@/components/rich-text'
import type { Guesthouse, Media } from '@/payload/payload-types'
import { twMerge } from 'tailwind-merge'

type Props = {
  params: Promise<{ guesthouse: string; article: string }>
}

const resolveGuesthouseSlug = (
  guesthouse: string | Guesthouse,
  guesthouseById: Map<string, string>
) => {
  if (typeof guesthouse === 'string') {
    return guesthouseById.get(guesthouse)
  }

  return guesthouse.slug
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

const getDescriptionFromBody = (body: SerializedEditorState) => {
  const text = convertLexicalToPlaintext({ data: body })
  const cleaned = text.replace(/\s+/g, ' ').trim()

  return cleaned.slice(0, 160)
}

const getAbsoluteImageUrl = (image: Media | string) => {
  const { url } = extractImageProps(image)
  if (!url) return undefined

  const filename = url.split('/').pop()
  if (!filename) return undefined

  return `${getBaseUrl()}/api/images/${filename}`
}

export async function generateStaticParams() {
  const [articles, guesthouses] = await Promise.all([
    fetchArticles(),
    fetchGuestHouses()
  ])

  const guesthouseById = new Map(
    guesthouses.map((guesthouse) => [guesthouse.id, guesthouse.slug])
  )

  return articles.flatMap((article) => {
    if (!article.slug) {
      return []
    }

    const guesthouseSlug = resolveGuesthouseSlug(
      article.guesthouse,
      guesthouseById
    )

    if (!guesthouseSlug) {
      return []
    }

    return [
      {
        guesthouse: guesthouseSlug,
        article: article.slug
      }
    ]
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guesthouse: guesthouseSlug, article: articleSlug } = await params

  const [guesthouse] = await fetchGuestHouses({
    slug: { equals: guesthouseSlug }
  })

  if (!guesthouse) return {}

  const [article] = await fetchArticles({
    slug: { equals: articleSlug },
    guesthouse: { equals: guesthouse.id }
  })

  if (!article) return {}

  const description =
    getDescriptionFromBody(article.body) || guesthouse.content.description

  const { alt: thumbnailAlt } = extractImageProps(article.thumbnail)
  const ogImage = getAbsoluteImageUrl(article.thumbnail)
  const canonical = `${getBaseUrl()}/destinations/${guesthouseSlug}/guides/${article.slug}`

  return {
    title: `${article.title} | ${guesthouse.name} | The Grand Collection`,
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

export default async function GuidePage({ params }: Props) {
  const { guesthouse: guesthouseSlug, article: articleSlug } = await params

  const guesthouses = await fetchGuestHouses({
    slug: { equals: guesthouseSlug }
  })
  const [guesthouse] = guesthouses

  if (!guesthouse) {
    notFound()
  }

  const articles = await fetchArticles({
    slug: { equals: articleSlug },
    guesthouse: { equals: guesthouse.id }
  })
  const [article] = articles

  if (!article || !article.slug) {
    notFound()
  }

  const relatedArticles = (
    await fetchArticles({
      guesthouse: { equals: guesthouse.id }
    })
  ).filter((related) => related.id !== article.id && related.slug)

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
  const jsonLd = [
    createBreadCrumbs([
      {
        name: guesthouse.name,
        item: `/guesthouses/${guesthouse.slug}`
      },
      {
        name: 'Guides',
        item: `/destinations/${guesthouse.slug}/guides`
      },
      {
        name: article.title,
        item: `/destinations/${guesthouse.slug}/guides/${article.slug}`
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
        '@id': `${getBaseUrl()}/destinations/${guesthouse.slug}/guides/${article.slug}`
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
        <div className='container mx-auto px-8 py-10 lg:py-20'>
          <div className='mx-auto flex w-full max-w-3xl flex-col gap-6'>
            <Link
              href={`/destinations/${guesthouse.slug}/guides`}
              className='inline-flex items-center gap-2 text-xs font-medium text-olive-500 transition hover:text-olive-700'
            >
              <ArrowLeft className='size-4' />
              Back to guides
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
                asChild
                variant='outline'
                className='w-fit border-olive-200 bg-olive-50 text-olive-700 hover:bg-olive-100'
              >
                <Link href={`/guesthouses/${guesthouse.slug}`}>
                  {guesthouse.name}
                </Link>
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
        </div>
      </section>

      <section className='container mx-auto px-8 pb-12 pt-6 lg:pb-20 lg:pt-10'>
        <div className='mx-auto w-full max-w-3xl'>
          <ArticleRichText data={article.body} className='lg:prose-lg' />
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className='bg-olive-50/60'>
          <div className='container mx-auto px-8 py-10 lg:py-20'>
            <SectionHeading
              heading='More guides'
              subtitle={guesthouse.name}
              headingClassNames='text-left'
              subtitleClassNames='text-left'
            />

            <ul className='mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {relatedArticles.map((related) => {
                const { url, alt } = extractImageProps(related.thumbnail)
                const relatedAlt = alt || related.title
                const href = `/destinations/${guesthouse.slug}/guides/${related.slug}`

                return (
                  <li
                    key={related.id}
                    className='group rounded-2xl border border-olive-200 bg-white p-4 transition-shadow hover:shadow-lg'
                  >
                    <Link href={href} className='block'>
                      <div className='relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-olive-100'>
                        {url ? (
                          <Image
                            src={url}
                            alt={relatedAlt}
                            fill
                            className='object-cover object-center transition duration-300 group-hover:scale-105'
                            sizes='(min-width: 1024px) 320px, (min-width: 768px) 45vw, 85vw'
                          />
                        ) : (
                          <div className='flex size-full items-center justify-center text-xs font-semibold uppercase tracking-widest text-olive-500'>
                            Guide
                          </div>
                        )}
                      </div>

                      <p className='mt-4 text-xs font-semibold uppercase tracking-widest text-sage-700'>
                        Guide
                      </p>
                      <h3 className='mt-2 text-lg font-semibold text-olive-900 transition group-hover:text-olive-800'>
                        {related.title}
                      </h3>
                      <p className='mt-2 text-xs font-semibold text-olive-600'>
                        {related.author}
                      </p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
