import 'server-only'

import { notFound } from 'next/navigation'

import { fetchArticles, fetchGuestHouses } from '@/lib/data'
import type { Guesthouse } from '@/payload/payload-types'

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

  return (
    <section className='container mx-auto px-8 py-10 lg:py-20'>
      <h1 className='text-2xl font-semibold'>Guide Article</h1>
      <p className='mt-2 text-sm'>
        Guesthouse: {guesthouse.name} ({guesthouse.slug})
      </p>
      <p className='mt-2 text-sm'>
        Article: {article.title} ({article.slug})
      </p>
    </section>
  )
}
