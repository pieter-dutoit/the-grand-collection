import ArticleTile from '@/components/article-tile'
import SectionHeading from '@/components/section-heading'

import { getDestinationData } from '../lib/destination-data'

type ArticleIndexProps = {
  destinationSlug: string
}

export default async function ArticleIndex({
  destinationSlug
}: ArticleIndexProps) {
  const { destination, featuredArticles, otherArticles, articles } =
    await getDestinationData(destinationSlug)

  const { slug, guides } = destination

  return (
    <section className='py-10 lg:py-20'>
      <div className='container mx-auto flex flex-col gap-6'>
        <SectionHeading
          parentLabel={guides.label}
          title={guides.title}
          description={guides.description}
        />

        <div className='flex flex-col gap-4'>
          {featuredArticles.length > 0 && (
            <div>
              <h3 className='text-xl font-bold text-olive-900 md:text-2xl'>
                {guides.featuredGuidesTitle}
              </h3>
              <ul className='mt-4 grid gap-8 lg:grid-cols-2'>
                {featuredArticles.map((article) => (
                  <ArticleTile
                    key={article.id}
                    article={article}
                    destinationSlug={slug}
                    badgeText='Featured'
                  />
                ))}
              </ul>
            </div>
          )}

          {otherArticles.length > 0 && (
            <div className={featuredArticles.length > 0 ? 'mt-12' : undefined}>
              <h3 className='text-xl font-bold text-olive-900 md:text-2xl'>
                {guides.otherGuidesTitle}
              </h3>
              <ul className='mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {otherArticles.map((article) => (
                  <ArticleTile
                    key={article.id}
                    article={article}
                    destinationSlug={slug}
                  />
                ))}
              </ul>
            </div>
          )}

          {!articles?.length && (
            <div className='rounded-2xl border border-olive-200 bg-olive-50 p-8 text-center'>
              <p className='text-sm font-medium text-olive-700'>
                No articles yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
