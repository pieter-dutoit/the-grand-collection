import { twMerge } from 'tailwind-merge'

import Image from '@/components/ui/image'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Room } from '@/payload/payload-types'
import { extractImageProps } from '@/lib/utils'
import GalleryDialog from './gallery-dialog'

interface PropTypes {
  room: Room
}

export default function RoomGallery({ room }: PropTypes): JSX.Element {
  const { gallery } = room
  const thumbnails = gallery.slice(0, 2)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='size-full'>
          <ul className='grid size-full grid-cols-5 gap-2 p-2'>
            {thumbnails.map((image, index) => {
              const { url, alt } = extractImageProps(image)
              const classes = index === 0 ? 'col-span-3' : 'col-span-2'
              const sizes =
                index === 0
                  ? '(max-width: 640px) 40vw, 20rem'
                  : '(max-width: 640px) 25vw, 13rem'

              return (
                <li
                  key={url}
                  className={twMerge(
                    classes,
                    'relative min-h-48 overflow-hidden rounded-lg border-2 border-sage-300 bg-sage-300'
                  )}
                >
                  <Image
                    src={url}
                    alt={alt}
                    fill
                    className='bg-olive-300 object-cover object-center lg:size-full'
                    sizes={sizes}
                  />
                  {index === thumbnails.length - 1 && (
                    <span className='absolute inset-0 flex items-center justify-center bg-olive-800/50 text-2xl font-semibold text-white'>
                      +{gallery.length - thumbnails.length}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </button>
      </DialogTrigger>

      <GalleryDialog name={room.name} images={gallery} />
    </Dialog>
  )
}
