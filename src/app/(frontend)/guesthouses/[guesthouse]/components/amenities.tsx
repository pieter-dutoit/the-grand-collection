import { Guesthouse } from '@/payload/payload-types'

import Image from '@/components/ui/image'
import { extractImageProps } from '@/lib/utils'
import SectionHeading from '@/components/section-heading'

export default function Amenities({ data }: { data: Guesthouse }): JSX.Element {
  const {
    content: {
      amenities: { general_amenities, label, heading, description }
    }
  } = data

  return (
    <section className='w-full py-4 lg:py-8'>
      <div id='amenities' className='absolute -mt-36 lg:-mt-48' />

      <div className='container mx-auto'>
        <div className='flex flex-col gap-8 rounded-xl border border-gold-200 bg-gradient-to-br from-gold-100 to-gold-200 p-8'>
          <SectionHeading
            title={heading}
            parentLabel={label}
            className='mx-auto items-center text-center'
            description={description}
          />

          <ul className='mx-8 flex flex-wrap-reverse justify-center gap-6 lg:mx-16'>
            {general_amenities.map((amenity) => {
              if (typeof amenity === 'string') return null
              const { id, icon, name } = amenity
              const { url, alt } = extractImageProps(icon)
              return (
                <li key={id} aria-label={`View ${name}` + ' amenity details'}>
                  <div className='flex cursor-default flex-col items-center transition-transform duration-150 ease-in-out hover:scale-105'>
                    <Image src={url} alt={alt} height={30} width={30} />
                    <span className='mt-2 text-xs font-semibold capitalize'>
                      {name}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
