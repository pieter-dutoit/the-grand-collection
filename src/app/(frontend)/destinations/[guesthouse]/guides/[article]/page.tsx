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
import Image from '@/components/ui/image'
import SectionHeading from '@/components/ui/section-heading'
import { ArticleRichText } from '@/components/rich-text'
import type { Guesthouse, Media } from '@/payload/payload-types'

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
      month: 'long',
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
          <div className='mx-auto flex max-w-4xl flex-col gap-6'>
            <Link
              href={`/destinations/${guesthouse.slug}/guides`}
              className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sage-700 transition hover:text-sage-900'
            >
              <ArrowLeft className='size-4' />
              Back to guides
            </Link>

            <div className='space-y-3'>
              <p className='text-xs font-semibold uppercase tracking-[0.3em] text-sage-700'>
                Guide
              </p>
              <h1 className='text-3xl font-semibold text-olive-900 md:text-4xl lg:text-5xl'>
                {article.title}
              </h1>
              <div className='flex flex-wrap items-center gap-3 text-xs font-semibold text-olive-700'>
                <span>{article.author}</span>
                <span className='text-olive-300'>|</span>
                <span>
                  Published{' '}
                  <time dateTime={createdDate.dateTime}>
                    {createdDate.humanReadable}
                  </time>
                </span>
                {updatedDate && (
                  <>
                    <span className='text-olive-300'>|</span>
                    <span>
                      Updated{' '}
                      <time dateTime={updatedDate.dateTime}>
                        {updatedDate.humanReadable}
                      </time>
                    </span>
                  </>
                )}
              </div>
              <p className='text-sm font-semibold text-sage-700'>
                Guesthouse{' '}
                <Link
                  href={`/guesthouses/${guesthouse.slug}`}
                  className='underline underline-offset-4 transition hover:text-sage-900'
                >
                  {guesthouse.name}
                </Link>
              </p>
            </div>

            {thumbnailUrl && (
              <figure className='relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-olive-200 bg-olive-100'>
                <Image
                  src={thumbnailUrl}
                  alt={thumbnailAltText}
                  fill
                  className='object-cover object-center'
                  sizes='(min-width: 1024px) 768px, 90vw'
                  priority
                />
              </figure>
            )}
          </div>
        </div>
      </section>

      <section className='container mx-auto px-8 pb-12 pt-6 lg:pb-20 lg:pt-10'>
        <div className='mx-auto max-w-4xl'>
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
