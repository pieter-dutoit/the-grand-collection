import * as React from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

import { Media } from '@/payload/payload-types'
import { extractImageProps } from '@/lib/utils'

type Props = {
  images: (string | Media)[]
  onPhotoSelect: (selectedIndex: number) => void
  selectedPhoto: number
}

export default function ImageCarousel({
  images,
  onPhotoSelect,
  selectedPhoto
}: Props): JSX.Element {
  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true
      }}
      className='w-full'
    >
      <CarouselContent className='-ml-2'>
        {images.map((image, index) => {
          const { url, alt } = extractImageProps(image)
          const borderClass =
            selectedPhoto === index
              ? 'border-gold-400 shadow-lg'
              : 'border-gold-50  opacity-50 grayscale-[40%]'

          return (
            <CarouselItem key={index} className='basis-1/4 pl-2 md:basis-1/6'>
              <button
                onClick={() => onPhotoSelect(index)}
                className={twMerge(
                  'relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg border-2 bg-olive-700 sm:aspect-video',
                  borderClass
                )}
              >
                <Image
                  src={url}
                  alt={alt}
                  fill
                  className='object-cover object-center'
                  sizes='(max-width: 640px) 5rem, 8rem'
                />
              </button>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className='hidden lg:flex' />
      <CarouselNext className='hidden lg:flex' />
    </Carousel>
  )
}
