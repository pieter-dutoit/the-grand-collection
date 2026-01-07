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

  console.log({ image })

  const { url: heroImageUrl, alt: heroImageAlt } = extractImageProps(image)
  const heroImageAltText = heroImageAlt || title || name

  console.log({ heroImageUrl })

  return (
    <section className='relative bg-olive-200'>
      {heroImageUrl && (
        <div className='relative aspect-video w-full sm:absolute sm:inset-0 sm:aspect-auto sm:size-full'>
          <Image
            src={heroImageUrl}
            alt={heroImageAltText}
            fill
            className='object-cover object-center'
            priority
            sizes='100vw'
          />
          <div className='absolute inset-0 hidden bg-gradient-to-r from-olive-300 via-olive-200 to-transparent sm:block' />
        </div>
      )}

      <div className='container relative z-10 mx-auto py-8 sm:py-20 lg:py-28'>
        <div className='flex max-w-2xl flex-col gap-2'>
          <span className='text-xs font-extrabold uppercase tracking-wide text-olive-900'>
            {label}
          </span>
          <h1 className='text-pretty text-3xl font-semibold text-olive-900 md:text-4xl lg:text-5xl'>
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
