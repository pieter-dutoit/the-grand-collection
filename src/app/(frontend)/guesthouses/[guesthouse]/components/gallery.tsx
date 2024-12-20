import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { extractImageProps } from '@/lib/utils'
import { Guesthouse } from '@/payload/payload-types'

type Props = {
  images: Partial<Guesthouse['content']['images']>
}

export default function Gallery({
  images: { interior, exterior }
}: Props): JSX.Element {
  const images = [
    ...(interior?.slice(0, 3) || []),
    ...(exterior?.slice(0, 3) || [])
  ]

  return (
    <section className='mx-auto my-8'>
      <div id='gallery' className='absolute -mt-36 md:-mt-40' />
      <button className='container mx-auto grid grid-cols-6 gap-4'>
        {images.map((image, index) => {
          const { url, alt } = extractImageProps(image)

          const showRemainder = index === images.length - 1

          const remainderCount =
            showRemainder &&
            (interior?.length || 0) + (exterior?.length || 0) - images.length

          const classes =
            index === 1 ? 'col-span-4 row-span-2' : 'col-span-2 row-span-1'
          const sizes = index === 1 ? '50vw' : '25vw'

          return (
            <div
              key={url + index}
              className={twMerge(
                'relative h-full min-h-20 w-full overflow-hidden rounded-lg bg-olive-700 shadow-md md:min-h-32 xl:min-h-40',
                classes
              )}
            >
              <Image
                src={url}
                alt={alt}
                fill
                className='object-cover object-center'
                priority
                sizes={sizes}
              />
              {showRemainder && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
                  <span className='text-base font-semibold text-white underline md:text-xl'>
                    {remainderCount
                      ? `+${remainderCount} photo${remainderCount === 1 ? '' : 's'}`
                      : 'View All'}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </button>
    </section>
  )
}
