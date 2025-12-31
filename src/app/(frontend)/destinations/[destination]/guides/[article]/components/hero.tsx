import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import BlurredBackdropImage from '@/components/ui/blurred-backdrop-image'
import { Badge } from '@/components/ui/badge'

import { ShareButton } from '../[article]/share-button'
import { getArticlePageData } from '../lib/article-data'

type ArticleHeroProps = {
  destinationSlug: string
  articleSlug: string
}

export default async function ArticleHero({
  destinationSlug,
  articleSlug
}: ArticleHeroProps) {
  const {
    destination,
    article,
    createdDate,
    updatedDate,
    authorName,
    canonical,
    thumbnail
  } = await getArticlePageData(destinationSlug, articleSlug)

  return (
    <section
      id={article.slug}
      className='relative flex w-full flex-col justify-between bg-olive-50'
    >
      <div className='container mx-auto flex flex-col items-start gap-6 py-10 lg:py-20'>
        <Link
          href={`/destinations/${destination.slug}`}
          className='inline-flex items-center gap-2 text-xs font-medium text-olive-500 transition hover:text-olive-700'
        >
          <ArrowLeft className='size-4' />
          Back to all {destination.name} guides
        </Link>
        <h1 className='max-w-3xl text-pretty text-3xl font-semibold text-olive-900 md:text-4xl lg:text-5xl'>
          {article.title}
        </h1>

        {/* Meta data */}
        <div className='flex w-full flex-row flex-wrap items-center justify-between gap-2'>
          {/* Left meta */}
          <div className='flex flex-wrap gap-2'>
            <Badge className='flex flex-wrap items-center gap-x-1 gap-y-0.5'>
              <span>{authorName}</span>
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

        {thumbnail.url && (
          <figure className='w-full'>
            <BlurredBackdropImage
              src={thumbnail.url}
              alt={thumbnail.altText}
              sizes={thumbnail.sizes}
              priority
              aspectRatio={thumbnail.aspectRatio}
              containerClassName={twMerge(
                'w-full rounded-2xl border border-olive-200 bg-olive-100 lg:max-h-[40vh]',
                thumbnail.maxWidthClass
              )}
            />
          </figure>
        )}
      </div>
    </section>
  )
}
