import { twMerge } from 'tailwind-merge'
import { MapPin } from 'lucide-react'
import Link from 'next/link'

import Image from '@/components/ui/image'
import { getButtonStyles } from '@/components/ui/button'
import { Guesthouse } from '@/payload/payload-types'

import { extractImageProps } from '@/lib/utils'
import AvailabilityLink from './availability-link'

export default function PropertyPreview({
  guesthouse
}: {
  guesthouse: Guesthouse
}): JSX.Element {
  const margin = 'mx-auto'

  const {
    booking_platform: { url: bookingUrl, name: platformName },
    name,
    slug,
    contact_details: {
      address: { city, province }
    },
    content: { images, heading }
  } = guesthouse

  const { interior, exterior } = images
  const gallery = [exterior[0], ...interior.slice(0, 3)]

  return (
    <div
      className={twMerge(
        'flex w-full flex-col rounded-xl bg-gold-50 p-4 transition-shadow ease-in hover:shadow-xl',
        margin
      )}
    >
      <div className='mb-1 grid gap-4 sm:grid-cols-4 xl:grid-cols-5'>
        {gallery.map((image, index) => {
          const { alt, url } = extractImageProps(image)

          const sizeClasses =
            index === 0
              ? 'col-span-4 sm:col-span-2'
              : index === 1
                ? 'col-span-1 hidden sm:block col-span-2 md:col-span-1'
                : index === 2
                  ? 'col-span-1 hidden md:block'
                  : 'hidden xl:block'

          const sizes =
            index === 0
              ? '(max-width: 640px) 85vw, (max-width: 768px) 16rem, (max-width: 1024px) 21rem, 27rem'
              : '(max-width: 640px) 0vw, (max-width: 768px) 16rem, (max-width: 1280px) 10rem, 13rem'

          return (
            <div
              className={twMerge(
                'h-30 relative size-40 w-full overflow-hidden rounded-lg border-2 border-sage-300 bg-sage-300',
                sizeClasses
              )}
              key={url}
            >
              <Image
                src={url}
                alt={alt}
                fill
                className='object-cover object-center'
                sizes={sizes}
              />
            </div>
          )
        })}
      </div>

      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-col'>
          <span className='text-sm font-bold text-sage-400'>Guesthouse</span>

          <h3 className='text-2xl text-olive-900'>{name}</h3>
          <div className='mt-2 flex items-center'>
            <MapPin className='size-4 text-sage-400' />
            <p className='ml-1 text-xs font-bold text-sage-400'>{`${city}, ${province}`}</p>
          </div>
        </div>

        <div className='mt-2 flex flex-wrap items-start sm:mt-0 sm:flex-row'>
          {/* Link to guesthouse details page */}
          <Link
            href={`/guesthouses/${slug}`}
            className={twMerge(
              getButtonStyles({
                variant: 'outline',
                colour: 'default'
              }),
              'mr-2 mt-2 sm:mt-0'
            )}
          >
            View Details
          </Link>

          {/* Booking / Availability button */}
          <AvailabilityLink
            bookingUrl={bookingUrl}
            platformName={platformName}
            className='mt-2 sm:mt-0'
          />
        </div>
      </div>

      <p className='mt-4 text-justify text-base font-normal tracking-wide text-olive-900'>
        {heading}
      </p>
    </div>
  )
}
