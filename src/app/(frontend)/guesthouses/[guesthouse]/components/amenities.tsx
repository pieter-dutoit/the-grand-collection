import SectionHeading from '@/components/ui/section-heading'
import Image from '@/components/ui/image'
import { extractImageProps } from '@/lib/utils'
import { Guesthouse } from '@/payload/payload-types'

export default function Amenities({ data }: { data: Guesthouse }): JSX.Element {
  const {
    content: {
      amenities: { general_amenities, heading, description, background_image }
    }
  } = data

  const { url, alt } = extractImageProps(background_image)

  return (
    <section>
      <div id='amenities' className='absolute -mt-36 lg:-mt-48' />

      <div className='relative flex flex-col items-center justify-center py-8 pr-0 md:pr-[50vw] lg:py-16'>
        <SectionHeading heading={heading} subtitle={description} />

        <ul className='mx-8 mt-10 flex flex-wrap-reverse justify-center gap-6 lg:mx-16'>
          {general_amenities.map((amenity) => {
            if (typeof amenity === 'string') return null
            const { id, icon, name } = amenity
            const { url, alt } = extractImageProps(icon)
            return (
              <li key={id} aria-label={`View ${name}` + ' amenity details'}>
                <div className='peer flex cursor-default flex-col items-center transition-transform duration-150 ease-in-out hover:scale-105'>
                  <Image src={url} alt={alt} height={30} width={30} />
                  <span className='mt-2 text-xs font-semibold capitalize'>
                    {name}
                  </span>
                </div>

                {/* To show on hover */}
                <div
                  tabIndex={-1}
                  className='pointer-events-none absolute right-1/2 top-1/2 z-10 flex max-w-[90vw] -translate-y-1/2 translate-x-1/2 flex-col items-center justify-center rounded-lg bg-olive-100/60 p-4 opacity-0 backdrop-blur-md transition-opacity duration-150 peer-hover:opacity-100 peer-active:opacity-100 md:right-1/4 md:max-w-[45vw]'
                >
                  <Image src={url} alt={alt} height={20} width={20} />
                  <h4 className='mt-2 text-center text-2xl font-semibold'>
                    {name}
                  </h4>

                  <p className='mt-2 text-center'>{amenity.description}</p>
                </div>
              </li>
            )
          })}

          {/* Background image */}
          <div className='absolute right-0 top-0 hidden h-full w-1/2 md:block'>
            <Image
              src={url}
              alt={alt}
              fill
              className='object-cover object-center'
              sizes='(max-width: 760px) 0vw, 50vw'
            />
          </div>
        </ul>
      </div>
    </section>
  )
}
