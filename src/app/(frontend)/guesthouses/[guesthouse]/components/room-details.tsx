import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

import { extractImageProps } from '@/lib/utils'
import { Media, Room } from '@/payload/payload-types'
import Image from '@/components/ui/image'

interface PropTypes {
  room: Room
  peopleIcon: string | Media
  bookingLink: string
}

export default function RoomDetails({
  room,
  peopleIcon,
  bookingLink
}: PropTypes): JSX.Element {
  const { name, description, base_price, details, amenities } = room
  const { sleeps_adults, sleeps_children, beds } = details

  const { url, alt } = extractImageProps(peopleIcon)
  return (
    <>
      <h4 className='text-2xl font-semibold'>{name}</h4>

      <h5 className='sr-only'>Rates and Availability</h5>

      <p className='mt-2'>{description}</p>

      {/* Capacity / Beds */}
      <h5 className='sr-only'>Type of Beds and Capacity</h5>
      <ul className='mt-6 flex flex-col font-semibold'>
        <li className='flex items-center gap-2'>
          <Image src={url} alt={alt} height={20} width={20} />
          Sleeps {sleeps_adults + sleeps_children} People
        </li>
        <li className='flex flex-col'>
          {beds.map(({ type, quantity }) => {
            if (typeof type === 'string') return null
            const { icon } = type
            const { url, alt } = extractImageProps(icon)
            return (
              <span key={type.id} className='flex items-center gap-2'>
                <Image src={url} alt={alt} height={20} width={20} />
                {quantity} x {type.name} Bed{quantity === 1 ? '' : 's'}
              </span>
            )
          })}
        </li>
      </ul>

      {/* Amenities */}
      <h5 className='sr-only'>Amenities</h5>
      <ul className='mt-4 flex flex-row flex-wrap items-center gap-2'>
        {amenities.map((amenity) => {
          if (typeof amenity === 'string') return null
          const { icon, name } = amenity
          const { url, alt } = extractImageProps(icon)
          return (
            <li
              key={amenity.id}
              className='flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm'
            >
              <Image
                src={url}
                alt={alt}
                height={16}
                width={16}
                className='size-4 object-contain object-center'
              />
              {name}
            </li>
          )
        })}
      </ul>

      <div className='mt-8 flex flex-wrap items-center justify-between gap-4'>
        <p className='font-extrabold text-olive-900'>
          from <span className='text-2xl'>R{base_price}</span> per night
        </p>
        <Link
          href={bookingLink}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 rounded bg-olive-400 px-4 py-2 text-white hover:bg-gold-700'
        >
          Check Availability <ExternalLink className='size-4' />
        </Link>
      </div>
    </>
  )
}
