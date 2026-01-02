import Image from '@/components/ui/image'
import { extractContactDetails, extractImageProps } from '@/lib/utils'
import { Guesthouse } from '@/payload/payload-types'
import AvailabilityLink from '@/app/(frontend)/components/availability-link'
import { Button } from '@/components/ui/button'
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'

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
      contact_persons,
      address: { city, province }
    }
  } = guesthouse

  const contacts = extractContactDetails(contact_persons)

  const { url: heroSrc, alt } = extractImageProps(background_image)
  return (
    <section className='relative bg-olive-50'>
      {/* Mobile hero image */}
      <div className='relative aspect-video sm:hidden'>
        <Image
          src={heroSrc}
          alt={alt}
          fill
          className='object-cover object-center sm:hidden'
          priority
          sizes='100vw'
        />
      </div>

      {/* Hero text */}
      <div className='container mx-auto grid w-full grid-cols-1 gap-8'>
        {/* Left content */}
        <div className='z-10 w-full max-w-4xl py-10 sm:py-20 md:py-24 lg:py-32'>
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

          <div className='mt-4 flex flex-row flex-wrap gap-2'>
            <AvailabilityLink
              bookingUrl={bookingURL}
              platformName={platformName}
            />
            <Button asChild variant='outline' colour='olive'>
              <Link
                href={`tel:+27${contacts[0]?.phoneLink}`}
                className='flex items-center gap-2'
              >
                <Phone className='size-6' />
                <span>{contacts[0]?.phone}</span>
              </Link>
            </Button>
            <Button asChild variant='outline' colour='olive'>
              <Link
                href={`mailto:${contacts[0]?.email}`}
                className='flex items-center gap-2'
              >
                <Mail className='size-6' />
                <span>{contacts[0]?.email}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop image */}
      <div className='absolute inset-y-0 left-[35vw] right-0'>
        <Image
          src={heroSrc}
          alt={alt}
          fill
          className='hidden object-cover object-center sm:block'
          priority
          sizes='65vw'
        />
        <div className='absolute inset-0 hidden from-olive-50 sm:block sm:bg-gradient-to-r sm:via-olive-50/70 sm:to-transparent' />
      </div>
    </section>
  )
}
