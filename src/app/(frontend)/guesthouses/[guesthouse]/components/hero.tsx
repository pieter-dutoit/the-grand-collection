import Image from 'next/image'
import { extractContactDetails, extractImageProps } from '@/lib/utils'
import { Guesthouse } from '@/payload/payload-types'
import AvailabilityLink from '@/app/(frontend)/components/availability-link'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

export default function Hero({
  guesthouse
}: {
  guesthouse: Guesthouse
}): JSX.Element {
  const {
    name,
    business_details: { geo },
    booking_platform: { url: bookingURL, name: platformName },
    content: {
      description,
      images: { background_image }
    },
    contact_details: {
      contact_persons,
      address: { city, province, street }
    }
  } = guesthouse

  const contacts = extractContactDetails(contact_persons)

  const { url: heroSrc, alt } = extractImageProps(background_image)
  return (
    <section className='relative bg-olive-50'>
      {heroSrc && (
        <div className='relative aspect-[20/8] w-full sm:absolute sm:inset-y-0 sm:left-[35vw] sm:right-0 sm:aspect-auto sm:h-full'>
          <Image
            src={heroSrc}
            alt={alt}
            fill
            className='object-cover object-center'
            priority
            sizes='(max-width: 640px) 100vw, 65vw'
          />
          <div className='absolute inset-0 hidden from-olive-50 sm:block sm:bg-gradient-to-r sm:via-olive-50/30 sm:to-transparent' />
        </div>
      )}

      {/* Hero text */}
      <div className='container mx-auto grid w-full grid-cols-1 gap-8'>
        {/* Left content */}
        <div className='z-10 flex w-full max-w-4xl flex-col gap-6 py-8 sm:py-20 md:gap-10 md:py-24 lg:py-32'>
          <div>
            <h1 className='text-4xl font-semibold text-olive-800 md:text-5xl lg:text-6xl'>
              {name}
            </h1>
            <span className='text-xs font-bold text-olive-500 md:text-sm'>
              Luxury Accommodation in {city}, {province}
            </span>
            {/* Maps link */}
            <Link
              href={geo.maps_link}
              className='mt-2 flex items-center gap-1 text-sm text-sage-500 underline underline-offset-2'
              target='_blank'
            >
              <MapPin className='size-4' />
              {street}, {city} <strong>(Get Directions)</strong>
            </Link>
          </div>

          <p className='max-w-80 text-sm md:text-base lg:max-w-[500px]'>
            {description}
          </p>

          <div className='flex flex-col gap-4'>
            <p className='text-base font-bold md:text-lg lg:text-xl'>
              Book online, or contact us directly.
            </p>

            <div className='flex flex-row flex-wrap gap-2'>
              <AvailabilityLink
                bookingUrl={bookingURL}
                platformName={platformName}
                text='Book online'
              />
              <Button asChild variant='outline' colour='olive'>
                <Link
                  href={`tel:+27${contacts[0]?.phoneLink}`}
                  className='flex items-center gap-1'
                  aria-label='Call us'
                >
                  <Phone className='size-4' />
                  <span>{contacts[0]?.phone}</span>
                </Link>
              </Button>
              <Button asChild variant='outline' colour='olive'>
                <Link
                  href={`mailto:${contacts[0]?.email}`}
                  className='flex items-center gap-1'
                  aria-label='Email us'
                >
                  <Mail className='size-4' />
                  <span>{contacts[0]?.email}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
