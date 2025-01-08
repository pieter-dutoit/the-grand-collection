import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { extractImageProps } from '@/lib/utils'
import { Guesthouse } from '@/payload/payload-types'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import GalleryDialog from './gallery-dialog'
import SectionHeading from './section-heading'

interface GalleryProps {
  data: Guesthouse
}

export default function Gallery({ data }: GalleryProps): JSX.Element {
  const {
    name,
    content: {
      images: { interior = [], exterior = [] },
      gallery: { heading, description }
    }
  } = data
  const preview = [...exterior?.slice(0, 3), ...interior?.slice(0, 3)]

  return (
    <section className='bg-gold-100 py-8 lg:py-16'>
      <div id='gallery' className='absolute -mt-36 lg:-mt-48' />

      <SectionHeading heading={heading} description={description} />

      <Dialog>
        <DialogTrigger asChild>
          <button
            className='container mx-auto mt-5 grid grid-cols-6 gap-2 md:mt-8 md:gap-4 lg:mt-10'
            aria-label='View Gallery'
          >
            {preview.map((image, index) => {
              const { url, alt } = extractImageProps(image)

              const showRemainder = index === preview.length - 1

              const remainderCount =
                showRemainder &&
                (interior?.length || 0) +
                  (exterior?.length || 0) -
                  preview.length

              const classes =
                index === 1 ? 'col-span-4 row-span-2' : 'col-span-2 row-span-1'
              const sizes = index === 1 ? '50vw' : '25vw'

              return (
                <div
                  key={url + index}
                  className={twMerge(
                    'relative h-full min-h-20 w-full overflow-hidden rounded-lg border-2 border-gold-500 bg-olive-700 shadow-md md:min-h-32 xl:min-h-40',
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
                    <div className='absolute inset-0 flex items-center justify-center bg-black/40'>
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
        </DialogTrigger>
        <GalleryDialog name={name} images={[...exterior, ...interior]} />
      </Dialog>
    </section>
  )
}
