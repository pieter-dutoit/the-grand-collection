import Image from '@/components/ui/image'

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

  const { url: heroImageUrl, alt: heroImageAlt } = extractImageProps(image)
  const heroImageAltText = heroImageAlt || title || name

  return (
    <section className='relative bg-sage-100'>
      {/* Mobile image */}
      {heroImageUrl && (
        <div className='relative aspect-square w-full sm:hidden'>
          <Image
            src={heroImageUrl}
            alt={heroImageAltText}
            fill
            className='object-cover object-center'
            priority
            sizes='100vw'
          />
        </div>
      )}

      <div className='container relative z-10 mx-auto py-8 sm:py-20 lg:py-28'>
        <div className='flex max-w-2xl flex-col gap-2'>
          <span className='text-xs font-extrabold uppercase tracking-wide text-sage-900'>
            {label}
          </span>
          <h1 className='text-pretty text-3xl font-semibold text-olive-900 md:text-4xl lg:text-5xl'>
            {title}
          </h1>
          {description && (
            <p className='text-base text-sage-900 md:text-lg'>{description}</p>
          )}
        </div>
      </div>

      {/* Desktop image */}
      {heroImageUrl && (
        <div className='absolute inset-0 hidden sm:block'>
          <Image
            src={heroImageUrl}
            alt={heroImageAltText}
            fill
            className='object-cover object-center'
            priority
            sizes='100vw'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-sage-200 via-sage-100/60 to-transparent' />
        </div>
      )}
    </section>
  )
}
