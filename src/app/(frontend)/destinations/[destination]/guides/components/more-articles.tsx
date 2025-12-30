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

import ArticleTileCard from './article-tile'
import SectionHeading from '@/components/section-heading'

type MoreArticlesProps = {
  destination: Pick<Destination, 'name' | 'slug'>
  relatedArticles: Pick<
    Article,
    | 'id'
    | 'slug'
    | 'title'
    | 'excerpt'
    | 'thumbnail'
    | 'featured'
    | 'createdAt'
    | 'updatedAt'
  >[]
}

export default function MoreArticlesSection({
  destination,
  relatedArticles
}: MoreArticlesProps) {
  if (relatedArticles.length === 0) {
    return null
  }

  return (
    <section className='py-10 lg:py-20' id='more-articles'>
      <div className='container mx-auto flex flex-col gap-1'>
        <SectionHeading
          parentLabel='Explore'
          title={`Things to do in ${destination.name}`}
        />
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
                className='basis-11/12 pl-0 pr-4 md:basis-1/2 lg:basis-1/3'
              >
                <ArticleTileCard
                  article={related}
                  destinationSlug={destination.slug}
                />
              </CarouselItem>
            ))}
            <CarouselItem className='basis-11/12 pl-0 pr-4 md:basis-1/2 lg:basis-1/3'>
              <Link
                href={`/destinations/${destination.slug}/guides`}
                className='flex size-full flex-row items-center justify-center gap-2 rounded-xl border border-olive-100 bg-gradient-to-r from-olive-300 to-olive-50 text-olive-800 underline-offset-1 hover:text-olive-600 hover:underline'
              >
                <span className='text-base font-semibold'>
                  View all {destination.name} guides
                </span>
                <ArrowRight className='size-4' />
              </Link>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className='left-2 hidden md:flex' />
          <CarouselNext className='right-2 hidden md:flex' />
        </Carousel>
      </div>
    </section>
  )
}
