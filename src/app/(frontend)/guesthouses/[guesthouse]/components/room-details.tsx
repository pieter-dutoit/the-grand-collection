import { extractImageProps } from '@/lib/utils'
import { Media, Room } from '@/payload/payload-types'
import Image from 'next/image'

interface PropTypes {
  room: Room
  peopleIcon: string | Media
}

export default function RoomDetails({
  room,
  peopleIcon
}: PropTypes): JSX.Element {
  const { name, description, details, amenities } = room
  const { sleeps_adults, sleeps_children, bed_count } = details
  console.log({ bed_count })

  const { url, alt } = extractImageProps(peopleIcon)
  return (
    <>
      <h4 className='text-2xl font-semibold'>{name}</h4>
      <p className='mt-2'>{description}</p>
      <h5 className='sr-only'>Room Beds and Capacity</h5>
      <ul className='mt-6 flex flex-col font-semibold'>
        <li className='flex items-center gap-2'>
          <Image src={url} alt={alt} height={20} width={20} />
          <strong>Sleeps</strong> {sleeps_adults} Adults
          {sleeps_children
            ? ` & ${sleeps_children} Child${sleeps_children === 1 ? '' : 'ren'}`
            : ''}
        </li>
        <li className='flex flex-col'>
          {bed_count.map(({ bed, quantity }) => {
            if (typeof bed === 'string') return null
            const { icon } = bed
            const { url, alt } = extractImageProps(icon)
            return (
              <span key={bed.id} className='flex items-center gap-2'>
                <Image src={url} alt={alt} height={20} width={20} />
                <strong>
                  {quantity} x {bed.name}
                </strong>{' '}
                Size Bed{quantity === 1 ? '' : 's'}
              </span>
            )
          })}
        </li>
      </ul>

      <h5 className='sr-only'>Amenities</h5>
      <ul className='mt-2 flex flex-row flex-wrap items-center gap-2'>
        {amenities.map((amenity) => {
          if (typeof amenity === 'string') return null
          const { icon, name } = amenity
          const { url, alt } = extractImageProps(icon)
          return (
            <li
              key={amenity.id}
              className='mt-4 flex items-center gap-2 rounded-lg border-2 border-gold-600 px-3 py-1'
            >
              <Image src={url} alt={alt} height={20} width={20} />
              {name}
            </li>
          )
        })}
      </ul>
    </>
  )
}
