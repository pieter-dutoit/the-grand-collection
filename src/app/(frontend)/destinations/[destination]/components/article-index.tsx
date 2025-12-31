import SectionHeading from '@/components/section-heading'
import ArticleTile from '../guides/components/article-tile'

import { getDestinationGuidesData } from '../lib/guides-data'

type ArticleIndexProps = {
  destinationSlug: string
}

export default async function ArticleIndex({
  destinationSlug
}: ArticleIndexProps) {
  const { destination, featuredArticles, otherArticles, articles } =
    await getDestinationGuidesData(destinationSlug)
  const totalArticles = articles.length

  return (
    <section className='container mx-auto pb-12 pt-6 lg:pb-20 lg:pt-10'>
      <div className='w-full max-w-5xl'>
        {featuredArticles.length > 0 && (
          <div>
            <SectionHeading
              parentLabel='Highlights'
              title={`Featured ${destination.name} guides`}
            />
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
            <SectionHeading
              parentLabel='Browse'
              title={`All ${destination.name} guides`}
            />
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
  )
}
