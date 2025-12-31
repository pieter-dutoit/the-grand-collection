import Image from '@/components/ui/image'

import { extractImageProps } from '@/lib/utils'

import { getDestinationGuidesData } from '../lib/destination-data'

type DestinationHeroProps = {
  destinationSlug: string
}

export default async function DestinationHero({
  destinationSlug
}: DestinationHeroProps) {
  const { destination } = await getDestinationGuidesData(destinationSlug)
  const pageLabel = destination.label || 'Guides'
  const pageTitle = destination.title || destination.name
  const pageDescription = destination.description || ''

  const { url: heroImageUrl, alt: heroImageAlt } = extractImageProps(
    destination.image
  )
  const heroImageAltText = heroImageAlt || pageTitle || destination.name

  return (
    <section className='relative bg-gradient-to-b from-olive-50 to-transparent'>
      <div className='container relative z-10 mx-auto py-10 lg:py-20'>
        <div className='w-full max-w-5xl'>
          <div className='flex max-w-3xl flex-col gap-3'>
            <span className='text-xs font-extrabold uppercase tracking-widest text-sage-500'>
              {pageLabel}
            </span>
            <h1 className='text-3xl font-semibold text-olive-900 md:text-4xl lg:text-5xl'>
              {pageTitle}
            </h1>
            {pageDescription && (
              <p className='text-base text-olive-700 md:text-lg'>
                {pageDescription}
              </p>
            )}
          </div>
        </div>
      </div>

      {heroImageUrl && (
        <div className='absolute right-0 top-0 h-full w-1/2 opacity-40 sm:w-4/6 sm:opacity-100'>
          <Image
            src={heroImageUrl}
            alt={heroImageAltText}
            fill
            className='object-cover object-center'
            priority
            sizes='(max-width: 768px) 50vw, 60vw'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-white to-olive-50 sm:to-transparent' />
        </div>
      )}
    </section>
  )
}
