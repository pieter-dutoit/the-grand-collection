import Image from 'next/image'

import { extractImageProps } from '@/lib/utils'

import { getDestinationData } from '../lib/destination-data'

type DestinationHeroProps = {
  destinationSlug: string
}

export default async function DestinationHero({
  destinationSlug
}: DestinationHeroProps) {
  const {
    destination: { name, title, label, description, image }
  } = await getDestinationData(destinationSlug)

  const {
    url: heroImageUrl,
    alt: heroImageAlt,
    isSvg
  } = extractImageProps(image)
  const heroImageAltText = heroImageAlt || title || name

  return (
    <section className='relative -mt-16 bg-olive-200'>
      {heroImageUrl && (
        <div className='relative h-[calc(56.25vw+4rem)] w-full sm:absolute sm:inset-0 sm:aspect-auto sm:size-full'>
          <Image
            src={heroImageUrl}
            alt={heroImageAltText}
            fill
            className='object-cover object-center'
            priority
            fetchPriority='high'
            sizes='100vw'
            unoptimized={isSvg}
          />
          <div className='absolute inset-0 hidden bg-gradient-to-r from-olive-300 via-olive-200 to-transparent sm:block' />
        </div>
      )}

      <div className='relative z-10 container mx-auto pt-8 pb-8 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-28'>
        <div className='flex max-w-2xl flex-col gap-2'>
          <span className='text-xs font-extrabold tracking-wide text-olive-900 uppercase'>
            {label}
          </span>
          <h1 className='text-3xl font-semibold text-pretty text-olive-900 md:text-4xl lg:text-5xl'>
            {title}
          </h1>
          {description && (
            <p className='text-base text-olive-900 md:text-lg'>{description}</p>
          )}
        </div>
      </div>
    </section>
  )
}
