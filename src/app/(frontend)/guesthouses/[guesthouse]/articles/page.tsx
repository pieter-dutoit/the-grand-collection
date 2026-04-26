import 'server-only'

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { fetchArticles, fetchGuestHouses } from '@/lib/data'
import {
  extractImageProps,
  getBaseUrl,
  getPublicImageSizeUrl
} from '@/lib/utils'
import {
  createItemListStructuredData,
  createPageStructuredData
} from '@/lib/utils/create-structured-data'
import { getGuesthousePostPath, getGuesthouseSlug } from '@/lib/utils/articles'
import { getGuesthouseArticlesBreadcrumbs } from '@/lib/utils/breadcrumbs'
import ArticleTile from '@/components/article-tile'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import JsonLd from '@/components/seo/json-ld'
import SectionHeading from '@/components/section-heading'

import { getGuesthouseArticlesData } from './lib/guesthouse-article-data'

type Props = {
  params: Promise<{ guesthouse: string }>
}

const getArticlesDescription = (guesthouseName: string) =>
  `Fresh updates, stories and hospitality notes from ${guesthouseName}.`

export async function generateStaticParams() {
  const [articles, guesthouses] = await Promise.all([
    fetchArticles({ type: { equals: 'guesthouse_post' } }),
    fetchGuestHouses()
  ])

  const guesthouseSlugById = new Map(
    guesthouses.map((guesthouse) => [guesthouse.id, guesthouse.slug])
  )
  const params = new Map<string, { guesthouse: string }>()

  for (const article of articles) {
    if (!article.slug) {
      continue
    }

    const guesthouseSlug = getGuesthouseSlug(
      article.guesthouse,
      guesthouseSlugById
    )

    if (!guesthouseSlug) {
      continue
    }

    params.set(guesthouseSlug, { guesthouse: guesthouseSlug })
  }

  return Array.from(params.values())
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guesthouse: guesthouseSlug } = await params
  const { guesthouse, articles, canonical } =
    await getGuesthouseArticlesData(guesthouseSlug)
  const title = `Articles from ${guesthouse.name}`
  const description = getArticlesDescription(guesthouse.name)
  const firstArticle = articles[0]
  const {
    url: ogImageUrl,
    alt: ogImageAlt,
    width: ogImageWidth,
    height: ogImageHeight
  } = extractImageProps(firstArticle.thumbnail)
  const twitterImageUrl =
    getPublicImageSizeUrl(firstArticle.thumbnail, 'twitter') || ogImageUrl

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: 'The Grand Collection',
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            alt: ogImageAlt || title,
            width: ogImageWidth,
            height: ogImageHeight
          }
        ]
      })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(twitterImageUrl ? { images: [twitterImageUrl] } : {})
    }
  }
}

export default async function GuesthouseArticlesPage({ params }: Props) {
  const { guesthouse: guesthouseSlug } = await params
  const { guesthouse, articles, featuredArticles, sectionGroups, canonical } =
    await getGuesthouseArticlesData(guesthouseSlug)
  const title = `Articles from ${guesthouse.name}`
  const description = getArticlesDescription(guesthouse.name)
  const breadcrumbs = getGuesthouseArticlesBreadcrumbs(guesthouse)
  const baseUrl = getBaseUrl()

  const postListStructuredData = createItemListStructuredData({
    pageUrl: canonical,
    idSuffix: 'articles',
    name: title,
    description,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: articles.map((article, index) => {
      const path = getGuesthousePostPath(guesthouse.slug, article.slug)
      const { url } = extractImageProps(article.thumbnail)

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          '@id': `${baseUrl}${path}#article`,
          name: article.title,
          headline: article.title,
          url: `${baseUrl}${path}`,
          ...(url && { image: [url] }),
          author: {
            '@type': 'Organization',
            name: article.author?.trim() || 'The Grand Collection',
            url: baseUrl
          }
        }
      }
    })
  })
  const jsonLd = await createPageStructuredData({
    pageUrl: canonical,
    pageType: 'CollectionPage',
    name: title,
    description,
    breadcrumbs,
    mainEntityId: postListStructuredData['@id'] as string | undefined,
    additionalNodes: [postListStructuredData]
  })

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className='absolute inset-x-0 top-16 z-20 w-full py-3'>
        <div className='container mx-auto w-full'>
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </section>
      <section className='bg-olive-50'>
        <div className='container mx-auto flex flex-col items-start gap-6 pt-14 pb-10'>
          <Link
            href={`/guesthouses/${guesthouse.slug}`}
            className='inline-flex items-center gap-2 text-sm font-medium text-olive-500 transition hover:text-olive-700'
          >
            <ArrowLeft className='size-4' />
            Back to {guesthouse.name}
          </Link>
          <SectionHeading
            parentLabel={guesthouse.name}
            title='Articles'
            description={description}
          />
        </div>
      </section>
      <section className='py-10 lg:py-20'>
        <div className='container mx-auto flex flex-col gap-12'>
          {featuredArticles.length > 0 && (
            <div>
              <h2 className='text-xl font-bold text-olive-900 md:text-2xl'>
                Featured articles
              </h2>
              <ul className='mt-4 grid gap-8 lg:grid-cols-2'>
                {featuredArticles.map((article) => (
                  <li key={article.id}>
                    <ArticleTile
                      article={article}
                      href={getGuesthousePostPath(
                        guesthouse.slug,
                        article.slug
                      )}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {sectionGroups.map(({ section, articles: sectionArticles }) => (
            <div key={section.id}>
              <h2 className='text-xl font-bold text-olive-900 md:text-2xl'>
                {section.name}
              </h2>
              {section.description && (
                <p className='mt-2 max-w-2xl text-sm text-olive-700 md:text-base'>
                  {section.description}
                </p>
              )}
              <ul className='mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {sectionArticles.map((article) => (
                  <li key={article.id}>
                    <ArticleTile
                      article={article}
                      href={getGuesthousePostPath(
                        guesthouse.slug,
                        article.slug
                      )}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export const dynamicParams = true
export const revalidate = false
