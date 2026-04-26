import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { Article, Destination } from '@/payload/payload-types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

import SectionHeading from '@/components/section-heading'
import ArticleTile from '@/components/article-tile'
import { Button } from './ui/button'

type MoreArticlesProps = {
  title?: string
  label?: string
  description?: string
  destination?: Pick<Destination, 'name' | 'slug'>
  viewAllHref?: string
  viewAllLabel?: string
  id?: string
  articleHrefBuilder?: (
    article: MoreArticlesProps['relatedArticles'][number]
  ) => string
  relatedArticles: Pick<
    Article,
    | 'id'
    | 'slug'
    | 'title'
    | 'excerpt'
    | 'thumbnail'
    | 'featured'
    | 'section'
    | 'createdAt'
    | 'updatedAt'
  >[]
}

export default function MoreArticlesSection({
  label,
  title,
  description,
  destination,
  viewAllHref,
  viewAllLabel,
  id = 'more-articles',
  articleHrefBuilder,
  relatedArticles
}: MoreArticlesProps) {
  if (relatedArticles.length === 0) {
    return null
  }

  const resolvedTitle = title || `${destination?.name || 'More'} Articles`
  const resolvedViewAllHref =
    viewAllHref || (destination ? `/destinations/${destination.slug}` : null)
  const resolvedViewAllLabel =
    viewAllLabel ||
    (destination ? `View all ${destination.name} guides` : 'View all')

  return (
    <section className='relative py-10 lg:py-20'>
      <div id={id} className='absolute -mt-36 lg:-mt-48' />
      <div className='container mx-auto flex flex-col gap-2'>
        <SectionHeading
          parentLabel={label || 'Explore'}
          title={resolvedTitle}
          description={description}
        />
        {resolvedViewAllHref && (
          <Button asChild variant='outline'>
            <Link
              href={resolvedViewAllHref}
              className='flex flex-row items-center gap-2 self-start'
            >
              {resolvedViewAllLabel} <ArrowRight className='size-2' />
            </Link>
          </Button>
        )}
      </div>

      <div>
        <Carousel
          opts={{
            align: 'start'
          }}
          className='relative w-full'
        >
          <CarouselContent className='container mx-auto py-6'>
            {relatedArticles.map((related) => (
              <CarouselItem
                key={related.id}
                className='basis-11/12 pr-4 pl-0 md:basis-1/2 lg:basis-1/3'
              >
                <ArticleTile
                  article={related}
                  destinationSlug={destination?.slug}
                  href={articleHrefBuilder?.(related)}
                />
              </CarouselItem>
            ))}
            {resolvedViewAllHref && (
              <CarouselItem className='basis-11/12 pr-4 pl-0 md:basis-1/2 lg:basis-1/3'>
                <Link
                  href={resolvedViewAllHref}
                  className='flex size-full flex-row items-center justify-center gap-2 rounded-xl border border-olive-100 bg-gradient-to-r from-olive-300 to-olive-50 text-olive-800 underline-offset-1 hover:text-olive-600 hover:underline'
                >
                  <span className='text-base font-semibold'>
                    {resolvedViewAllLabel}
                  </span>
                  <ArrowRight className='size-4' />
                </Link>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className='left-2 hidden md:flex' />
          <CarouselNext className='right-2 hidden md:flex' />
        </Carousel>
      </div>
    </section>
  )
}
