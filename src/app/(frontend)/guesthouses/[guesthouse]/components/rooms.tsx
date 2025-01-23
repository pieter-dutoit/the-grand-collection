import { Guesthouse } from '@/payload/payload-types'

import SectionHeading from './section-heading'
import RoomDetails from './room-details'
import RoomGallery from './room-gallery'

interface PropTypes {
  data: Guesthouse
}

export default function Rooms({ data }: PropTypes): JSX.Element {
  const {
    content: {
      rooms: { rooms, heading, description, people_icon }
    }
  } = data

  return (
    <section className='mx-auto bg-gold-100 py-8 lg:py-16'>
      <div id='rooms' className='absolute -mt-36 lg:-mt-48' />

      <SectionHeading heading={heading} description={description} />

      <div className='container mx-auto'>
        <ul className='mt-8 grid grid-cols-1 gap-8 lg:mt-16'>
          {rooms?.map((room) => {
            if (typeof room === 'string') return null

            return (
              <li
                key={room.id}
                className='grid rounded-lg border-2 border-gold-200 bg-white text-olive-600 shadow-lg lg:grid-cols-2'
              >
                <div className='order-2 flex flex-col p-4 lg:order-1'>
                  <RoomDetails room={room} peopleIcon={people_icon} />
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
