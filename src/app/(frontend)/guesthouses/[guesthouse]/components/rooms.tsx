import { Guesthouse } from '@/payload/payload-types'

import RoomDetails from './room-details'
import RoomGallery from './room-gallery'
import SectionHeading from '@/components/section-heading'

interface PropTypes {
  data: Guesthouse
}

export default function Rooms({ data }: PropTypes): JSX.Element {
  const {
    booking_platform: { url },
    content: {
      rooms: { rooms, label, heading, description, people_icon }
    }
  } = data

  return (
    <section className='w-full py-8 lg:py-16'>
      <div id='rooms' className='absolute -mt-36 lg:-mt-48' />

      <div className='container mx-auto flex flex-col gap-8'>
        <SectionHeading
          title={heading}
          parentLabel={label}
          description={description}
        />
        <ul className='grid grid-cols-1 gap-4'>
          {rooms
            ?.filter((room) => typeof room !== 'string')
            .map((room) => {
              return (
                <li
                  key={room.id}
                  className='grid rounded-lg border border-gold-200 bg-white text-olive-600 shadow-lg lg:grid-cols-2'
                >
                  <div className='order-2 flex flex-col p-4 lg:order-1'>
                    <RoomDetails
                      room={room}
                      peopleIcon={people_icon}
                      bookingLink={url}
                    />
                  </div>

                  <div className='order-1 size-full lg:order-2'>
                    <RoomGallery room={room} />
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
    </section>
  )
}
