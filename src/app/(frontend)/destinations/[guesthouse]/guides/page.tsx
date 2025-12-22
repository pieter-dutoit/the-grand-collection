import 'server-only'

import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { fetchArticles, fetchArticlesCount, fetchGuestHouses } from '@/lib/data'
import { getBaseUrl } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

import GuideTile from './components/guide-tile'

type Props = {
  params: Promise<{ guesthouse: string }>
}

export async function generateStaticParams() {
  const guesthouses = await fetchGuestHouses()

  return guesthouses.map((guesthouse) => ({
    guesthouse: guesthouse.slug
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guesthouse: guesthouseSlug } = await params

  const [guesthouse] = await fetchGuestHouses({
    slug: { equals: guesthouseSlug }
  })

  if (!guesthouse) return {}

  const title = guesthouse.guides?.title || 'Guides'
  const description =
    guesthouse.guides?.description || guesthouse.content?.description
  const canonical = `${getBaseUrl()}/destinations/${guesthouse.slug}/guides`

  return {
    title: `${title} | ${guesthouse.name} | The Grand Collection`,
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

export default async function GuidePage({ params }: Props) {
  const { guesthouse: guesthouseSlug } = await params
  const guesthouses = await fetchGuestHouses({
    slug: { equals: guesthouseSlug }
  })
  const [guesthouse] = guesthouses

  if (!guesthouse) {
    notFound()
  }

  const totalGuides = await fetchArticlesCount({
    guesthouse: { equals: guesthouse.id }
  })

  const sortByMostRecentlyUpdated = <T extends { updatedAt: string }>(
    left: T,
    right: T
  ) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()

  const allArticles = await fetchArticles({
    guesthouse: { equals: guesthouse.id }
  })

  const guides = allArticles
    .filter((article) => article.slug)
    .sort(sortByMostRecentlyUpdated)

  const featuredGuides = guides
    .filter((article) => article.featured)
    .slice(0, 3)
  const featuredGuideIds = new Set(featuredGuides.map((article) => article.id))
  const otherGuides = guides.filter(
    (article) => !featuredGuideIds.has(article.id)
  )

  const guidesTitle = guesthouse.guides?.title || 'Guides'
  const guidesDescription = guesthouse.guides?.description

  return (
    <>
      <section className='bg-olive-50'>
        <div className='container mx-auto py-10 lg:py-20'>
          <div className='w-full max-w-5xl'>
            <Link
              href={`/guesthouses/${guesthouse.slug}`}
              className='inline-flex items-center gap-2 text-xs font-medium text-olive-500 transition hover:text-olive-700'
            >
              <ArrowLeft className='size-4' />
              Back to {guesthouse.name}
            </Link>

            <div className='mt-6 flex max-w-3xl flex-col gap-3'>
              <p className='text-xs font-extrabold uppercase tracking-widest text-sage-500'>
                Guides
              </p>
              <h1 className='text-3xl font-semibold text-olive-900 md:text-4xl lg:text-5xl'>
                {guidesTitle}
              </h1>
              {guidesDescription && (
                <p className='text-base text-olive-700 md:text-lg'>
                  {guidesDescription}
                </p>
              )}
              <div className='pt-1'>
                <Badge
                  variant='outline'
                  className='border-olive-200 bg-white text-olive-700'
                >
                  {totalGuides} guide{totalGuides !== 1 ? 's' : ''}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container mx-auto pb-12 pt-6 lg:pb-20 lg:pt-10'>
        <div className='w-full max-w-5xl'>
          {featuredGuides.length > 0 && (
            <div>
              <h2 className='text-xl font-semibold text-olive-900 md:text-2xl'>
                Featured guides
              </h2>
              <ul className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {featuredGuides.map((article) => (
                  <GuideTile
                    key={article.id}
                    article={article}
                    guesthouseSlug={guesthouse.slug}
                    badgeText='Featured'
                  />
                ))}
              </ul>
            </div>
          )}

          {otherGuides.length > 0 && (
            <div className={featuredGuides.length > 0 ? 'mt-12' : undefined}>
              <h2 className='text-xl font-semibold text-olive-900 md:text-2xl'>
                All guides
              </h2>
              <ul className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {otherGuides.map((article) => (
                  <GuideTile
                    key={article.id}
                    article={article}
                    guesthouseSlug={guesthouse.slug}
                  />
                ))}
              </ul>
            </div>
          )}

          {featuredGuides.length === 0 && otherGuides.length === 0 && (
            <div className='rounded-2xl border border-olive-200 bg-olive-50 p-8 text-center'>
              <p className='text-sm font-medium text-olive-700'>
                No guides yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
