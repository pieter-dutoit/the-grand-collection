import { extractImageProps } from '@/lib/utils'
import { Media, Room } from '@/payload/payload-types'
import Image from '@/components/ui/image'
import AvailabilityLink from '@/app/(frontend)/components/availability-link'

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
      <h3 className='text-base font-semibold text-olive-500 md:text-xl'>
        {name}
      </h3>
      <p className='mt-2 text-pretty text-sm'>{description}</p>

      <div className='mt-6 flex flex-col gap-6'>
        {/* Capacity / Beds */}
        <h4 className='sr-only'>Capacity</h4>
        <ul className='flex flex-col flex-wrap gap-2'>
          <li className='flex items-center gap-2'>
            <Image src={url} alt={alt} height={18} width={18} />
            <span className='text-sm font-semibold'>
              Sleeps {sleeps_adults + sleeps_children} People
            </span>
          </li>
          <li className='flex flex-col'>
            {beds.map(({ type, quantity }) => {
              if (typeof type === 'string') return null
              const { icon } = type
              const { url, alt } = extractImageProps(icon)
              return (
                <span key={type.id} className='flex items-center gap-2'>
                  <Image src={url} alt={alt} height={18} width={18} />
                  <span className='text-sm font-semibold'>
                    {quantity} x {type.name} Bed{quantity === 1 ? '' : 's'}
                  </span>
                </span>
              )
            })}
          </li>
        </ul>

        {/* Amenities */}
        <div>
          <h4 className='text-sm font-semibold'>Features & Amenities</h4>
          <ul className='mt-2 flex flex-row flex-wrap items-center gap-2'>
            {amenities.map((amenity) => {
              if (typeof amenity === 'string') return null
              const { icon, name } = amenity
              const { url, alt } = extractImageProps(icon)
              return (
                <li
                  key={amenity.id}
                  className='flex items-center gap-2 rounded-full bg-olive-100 px-3 py-1 text-sm'
                >
                  <Image
                    src={url}
                    alt={alt}
                    height={16}
                    width={16}
                    className='size-4 object-contain object-center'
                  />
                  <span className='text-xs font-semibold'>{name}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className='flex flex-wrap items-center justify-between gap-4'>
          <p className='text-sm font-semibold text-sage-800'>
            from <strong className='text-lg'>R{base_price}</strong> per night
          </p>
          <AvailabilityLink bookingUrl={bookingLink} />
        </div>
      </div>
    </>
  )
}
