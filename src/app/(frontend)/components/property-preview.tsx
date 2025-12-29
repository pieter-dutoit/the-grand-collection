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
    content: { images, heading, rooms },
    destination
  } = guesthouse

  const destinationData =
    destination && typeof destination !== 'string' ? destination : null
  const hasDestination = destinationData !== null

  const filteredRooms = rooms.rooms?.filter((room) => typeof room !== 'string')
  const { interior, exterior } = images
  const gallery = [
    exterior[1],
    interior[0],
    ...(filteredRooms?.[0].gallery.slice(0, 2) || [])
  ]

  const lowestPrice = filteredRooms?.sort(
    (one, two) => one.base_price - two.base_price
  )[0]?.base_price

  return (
    <div
      className={twMerge(
        'flex w-full flex-col gap-2 rounded-xl border border-gold-100 bg-gold-50 p-4 shadow-md transition-shadow ease-in hover:shadow-xl',
        margin
      )}
    >
      <div className='mb-1 grid gap-2 lg:grid-cols-4 xl:grid-cols-5'>
        {gallery.map((image, index) => {
          const { alt, url } = extractImageProps(image)

          const sizeClasses =
            index === 0
              ? 'col-span-4 lg:col-span-2'
              : index === 1
                ? 'col-span-1 hidden lg:block col-span-2 lg:col-span-1'
                : index === 2
                  ? 'col-span-1 hidden lg:block'
                  : 'hidden xl:block'

          const sizes =
            index === 0
              ? '(max-width: 640px) 85vw, (max-width: 768px) 16rem, (max-width: 1024px) 21rem, 26rem'
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

      <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between'>
        <div className='flex flex-col'>
          <span className='text-xs font-bold text-sage-400'>Guesthouse</span>

          <h3 className='text-2xl font-bold leading-tight text-sage-900'>
            {name}
          </h3>
          <div className='mt-2 flex items-center'>
            <MapPin className='size-4 text-sage-400' />
            <p className='ml-1 text-xs font-bold text-sage-400'>{`${city}, ${province}`}</p>
          </div>

          <div className='mt-2 text-sm font-extrabold text-sage-900'>
            from <span className='text-xl'>R{lowestPrice}</span> per night
          </div>
        </div>

        <div className='mt-2 flex flex-wrap items-start lg:mt-0 lg:flex-row'>
          {hasDestination && (
            <Link
              href={`/destinations/${destinationData.slug}/guides`}
              className={twMerge(
                getButtonStyles({
                  variant: 'outline',
                  colour: 'default'
                }),
                'mr-2 mt-2 lg:mt-0'
              )}
            >
              Things to do in {destinationData.name}
            </Link>
          )}

          {/* Link to guesthouse details page */}
          <Link
            href={`/guesthouses/${slug}`}
            className={twMerge(
              getButtonStyles({
                variant: 'outline',
                colour: 'default'
              }),
              'mr-2 mt-2 lg:mt-0'
            )}
          >
            View property details
          </Link>

          {/* Booking / Availability button */}
          <AvailabilityLink
            bookingUrl={bookingUrl}
            platformName={platformName}
            className='mt-2 lg:mt-0'
          />
        </div>
      </div>

      <p className='mt-4 text-justify text-base font-normal tracking-wide text-olive-500'>
        {heading}
      </p>
    </div>
  )
}
