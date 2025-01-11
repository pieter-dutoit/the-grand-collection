import { MapPin } from 'lucide-react'
import Image from 'next/image'

import { extractImageProps } from '@/lib/utils'
import { Guesthouse } from '@/payload/payload-types'
import AvailabilityLink from '@/app/(frontend)/components/availability-link'

export default function Hero({
  guesthouse
}: {
  guesthouse: Guesthouse
}): JSX.Element {
  const {
    name,
    booking_platform: { url: bookingURL, name: platformName },
    content: {
      description,
      images: { background_image }
    },
    contact_details: {
      address: { city, province }
    }
  } = guesthouse

  const { url: heroSrc, alt } = extractImageProps(background_image)
  return (
    <section className='relative bg-olive-50'>
      <div className='container relative z-10 mx-auto py-8 lg:py-16'>
        <h1 className='text-4xl text-olive-800 md:text-5xl lg:text-6xl'>
          {name}
        </h1>
        <h2 className='mt-2 text-sm font-bold text-sage-700'>Guesthouse</h2>
        <div className='mt-2 flex items-center text-sage-700'>
          <MapPin className='mr-1 size-5' />
          <span>{city}</span>
          <span className='mx-1'>|</span>
          <span>{province}</span>
        </div>
        <p className='mt-4 max-w-80 text-sm font-light md:text-base lg:mt-6 lg:max-w-[500px]'>
          {description}
        </p>

        <AvailabilityLink
          bookingUrl={bookingURL}
          platformName={platformName}
          className='mt-4'
        />
      </div>

      <div className='absolute right-0 top-0 h-full w-1/2 opacity-40 sm:w-4/6 sm:opacity-100'>
        <Image
          src={heroSrc}
          alt={alt}
          fill
          className='object-cover object-center'
          priority
          sizes='40vw'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-olive-50 to-olive-50/50 sm:to-transparent' />
      </div>
    </section>
  )
}
