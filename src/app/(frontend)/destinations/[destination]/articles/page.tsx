import 'server-only'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  fetchArticles,
  fetchArticlesCount,
  fetchDestinations
} from '@/lib/data'
import { getBaseUrl } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

import ArticleTile from './components/article-tile'

type Props = {
  params: Promise<{ destination: string }>
}

export async function generateStaticParams() {
  const destinations = await fetchDestinations()

  return destinations.map((destination) => ({
    destination: destination.slug
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { destination: destinationSlug } = await params

  const [destination] = await fetchDestinations({
    slug: { equals: destinationSlug }
  })

  if (!destination) return {}

  const title = destination.guides?.title || 'Articles'
  const description =
    destination.guides?.description || destination.seo?.meta?.description
  const canonical = `${getBaseUrl()}/destinations/${destination.slug}/articles`

  return {
    title: `${title} | ${destination.name} | The Grand Collection`,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical
    }
  }
}

export default async function ArticlesPage({ params }: Props) {
  const { destination: destinationSlug } = await params
  const destinations = await fetchDestinations({
    slug: { equals: destinationSlug }
  })
  const [destination] = destinations

  if (!destination) {
    notFound()
  }

  const totalArticles = await fetchArticlesCount({
    destination: { equals: destination.id }
  })

  const sortByMostRecentlyUpdated = <T extends { updatedAt: string }>(
    left: T,
    right: T
  ) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()

  const allArticles = await fetchArticles({
    destination: { equals: destination.id }
  })

  const articles = allArticles
    .filter((article) => article.slug)
    .sort(sortByMostRecentlyUpdated)

  const featuredArticles = articles
    .filter((article) => article.featured)
    .slice(0, 3)
  const featuredArticleIds = new Set(
    featuredArticles.map((article) => article.id)
  )
  const otherArticles = articles.filter(
    (article) => !featuredArticleIds.has(article.id)
  )

  const articlesTitle = destination.guides?.title || 'Articles'
  const articlesDescription = destination.guides?.description

  return (
    <>
      <section className='bg-olive-50'>
        <div className='container mx-auto py-10 lg:py-20'>
          <div className='w-full max-w-5xl'>
            <div className='flex max-w-3xl flex-col gap-3'>
              <p className='text-xs font-extrabold uppercase tracking-widest text-sage-500'>
                Articles
              </p>
              <h1 className='text-3xl font-semibold text-olive-900 md:text-4xl lg:text-5xl'>
                {articlesTitle}
              </h1>
              {articlesDescription && (
                <p className='text-base text-olive-700 md:text-lg'>
                  {articlesDescription}
                </p>
              )}
              <div className='pt-1'>
                <Badge
                  variant='outline'
                  className='border-olive-200 bg-white text-olive-700'
                >
                  {totalArticles} article{totalArticles !== 1 ? 's' : ''}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container mx-auto pb-12 pt-6 lg:pb-20 lg:pt-10'>
        <div className='w-full max-w-5xl'>
          {featuredArticles.length > 0 && (
            <div>
              <h2 className='text-xl font-semibold text-olive-900 md:text-2xl'>
                Featured articles
              </h2>
              <ul className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {featuredArticles.map((article) => (
                  <ArticleTile
                    key={article.id}
                    article={article}
                    destinationSlug={destination.slug}
                    badgeText='Featured'
                  />
                ))}
              </ul>
            </div>
          )}

          {otherArticles.length > 0 && (
            <div className={featuredArticles.length > 0 ? 'mt-12' : undefined}>
              <h2 className='text-xl font-semibold text-olive-900 md:text-2xl'>
                All articles
              </h2>
              <ul className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {otherArticles.map((article) => (
                  <ArticleTile
                    key={article.id}
                    article={article}
                    destinationSlug={destination.slug}
                  />
                ))}
              </ul>
            </div>
          )}

          {totalArticles === 0 && (
            <div className='rounded-2xl border border-olive-200 bg-olive-50 p-8 text-center'>
              <p className='text-sm font-medium text-olive-700'>
                No articles yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
