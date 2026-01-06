import { twMerge } from 'tailwind-merge'

import Image from 'next/image'
import { extractImageProps } from '@/lib/utils'
import { Guesthouse } from '@/payload/payload-types'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import GalleryDialog from './gallery-dialog'
import SectionHeading from '@/components/section-heading'

interface GalleryProps {
  data: Guesthouse
}

export default function Gallery({ data }: GalleryProps): JSX.Element {
  const {
    name,
    content: {
      images: { interior = [], exterior = [] },
      gallery: { label, heading, description },
      rooms: { rooms }
    }
  } = data

  const roomsImages = rooms
    ?.filter((room) => typeof room !== 'string')
    .flatMap(({ gallery }) => gallery)
  const preview = [
    ...exterior?.slice(0, 2),
    ...interior?.slice(0, 2),
    ...(roomsImages?.slice(0, 2) || [])
  ]
  const allImages = [...exterior, ...interior, ...(roomsImages || [])].slice(
    0,
    20
  )

  return (
    <section className='flex flex-col gap-8 py-8 lg:py-16'>
      <div id='gallery' className='absolute -mt-36 lg:-mt-48' />

      <SectionHeading
        title={heading}
        parentLabel={label}
        className='container mx-auto'
        description={description}
      />

      <Dialog>
        <DialogTrigger asChild>
          <button
            className='container mx-auto grid grid-cols-6 gap-2 md:gap-3'
            aria-label='View Gallery'
          >
            {preview.map((image, index) => {
              const { url, alt } = extractImageProps(image)
              const showRemainder = index === preview.length - 1
              const remainderCount =
                showRemainder && allImages.length + -preview.length

              const classes =
                index === 1 ? 'col-span-4 row-span-2' : 'col-span-2 row-span-1'
              const sizes =
                index === 1
                  ? '(max-width: 640px) 60vw, (max-width: 768px) 22rem, (max-width: 1280px) 28rem, 44rem'
                  : '(max-width: 640px) 30vw, (max-width: 768px) 11rem, (max-width: 1280px) 14rem, 22rem'

              return (
                <div
                  key={url + index}
                  className={twMerge(
                    'relative h-full min-h-20 w-full overflow-hidden rounded-lg border border-gold-200 bg-olive-700 shadow-md md:min-h-32 xl:min-h-40',
                    classes
                  )}
                >
                  <Image
                    src={url}
                    alt={alt}
                    fill
                    className='object-cover object-center'
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
        <GalleryDialog name={name} images={allImages} />
      </Dialog>
    </section>
  )
}
