import Image from '@/components/ui/image'
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
        <div>
          <h1 className='text-4xl font-semibold text-olive-800 md:text-5xl lg:text-6xl'>
            {name}
          </h1>
          <p className='mt-2 text-xs font-bold text-olive-500 md:text-sm lg:mt-3'>
            Luxury Accommodation in {city}, {province}
          </p>
        </div>

        <p className='mt-4 max-w-80 text-sm md:text-base lg:mt-6 lg:max-w-[500px]'>
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
          sizes='(max-width: 768px) 50vw, 60vw'
          portrait
        />
        <div className='absolute inset-0 bg-gradient-to-r from-olive-50 to-olive-50/50 sm:to-transparent' />
      </div>
    </section>
  )
}
