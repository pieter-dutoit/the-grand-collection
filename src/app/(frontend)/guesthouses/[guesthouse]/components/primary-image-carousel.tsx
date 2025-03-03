'use client'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'

import Image from '@/components/ui/image'
import { Media } from '@/payload/payload-types'
import { extractImageProps } from '@/lib/utils'

type Props = {
  images: (string | Media)[]
  onPhotoSelect: (selectedIndex: number) => void
  selectedPhoto: number
}

export default function PrimaryImageCarousel({
  images,
  onPhotoSelect,
  selectedPhoto
}: Props): JSX.Element {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    // Update the current and total count of photos
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', ({ selectedScrollSnap }) => {
      setCurrent(api.selectedScrollSnap() + 1)
      onPhotoSelect(selectedScrollSnap())
    })
  }, [api, onPhotoSelect])

  // Scroll to any photo selected from the preview carousel
  useEffect(() => {
    if (!api) {
      return
    }

    const currentPhotoIndex = api.selectedScrollSnap()

    if (currentPhotoIndex !== selectedPhoto) {
      api.scrollTo(selectedPhoto)
    }
  }, [api, selectedPhoto])

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true
        }}
        className='relative mb-4 mt-2 w-full overflow-hidden rounded-lg border-2 border-gold-500 drop-shadow-md lg:rounded-2xl'
      >
        <CarouselContent className='-ml-1'>
          {images.map((image, index) => {
            const { url, alt } = extractImageProps(image)

            return (
              <CarouselItem key={url + index} className='pl-1'>
                <div className='relative aspect-[0.8] h-fit w-full overflow-hidden bg-olive-300 sm:aspect-square md:aspect-video'>
                  <Image
                    alt={alt}
                    src={url}
                    fill
                    className='object-contain object-center'
                    sizes='(max-width: 640px) 90vw, (max-width: 1025px) 80vw, 56rem'
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <button
          className='absolute left-0 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-r-md bg-gold-500 shadow-md sm:flex'
          onClick={() => api?.scrollPrev()}
          aria-label='Previous Image'
        >
          <ChevronLeft size={30} color='white' />
        </button>

        <button
          className='absolute right-0 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-l-md bg-gold-500 shadow-md sm:flex'
          onClick={() => api?.scrollNext()}
          aria-label='Next Image'
        >
          <ChevronRight size={30} color='white' />
        </button>
      </Carousel>
      <p className='mx-auto mb-4 text-center text-sm font-bold text-gold-500'>
        Photo {current} of {count}
      </p>
    </>
  )
}
