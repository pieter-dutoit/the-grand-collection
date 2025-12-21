import 'server-only'

import { notFound } from 'next/navigation'

import { fetchArticles, fetchGuestHouses } from '@/lib/data'

type Props = {
  params: Promise<{ guesthouse: string }>
}

export async function generateStaticParams() {
  const guesthouses = await fetchGuestHouses()

  return guesthouses.map((guesthouse) => ({
    guesthouse: guesthouse.slug
  }))
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

  const articles = await fetchArticles({
    guesthouse: { equals: guesthouse.id }
  })

  const articleLinks = articles.flatMap((article) => {
    if (!article.slug) {
      return []
    }

    return [
      {
        id: article.id,
        slug: article.slug,
        title: article.title
      }
    ]
  })

  return (
    <section className='container mx-auto px-8 py-10 lg:py-20'>
      <h1 className='text-2xl font-semibold'>Guides</h1>
      <p className='mt-2 text-sm'>
        Guesthouse: {guesthouse.name} ({guesthouse.slug})
      </p>
      <p className='mt-2 text-sm'>Articles: {articleLinks.length}</p>
      {!!articleLinks.length && (
        <ul className='mt-4 list-disc pl-5 text-sm'>
          {articleLinks.map((article) => (
            <li key={article.id}>
              {article.title} — /destinations/{guesthouse.slug}/guides/
              {article.slug}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
