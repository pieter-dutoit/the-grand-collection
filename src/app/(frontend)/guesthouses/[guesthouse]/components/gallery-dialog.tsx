'use client'

import React from 'react'
import Image from 'next/image'

import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { Media } from '@/payload/payload-types'

import { extractImageProps } from '@/lib/utils'

import ImageCarousel from './image-carousel'

type Props = {
  images: (string | Media)[]
  name: string
}

export default function GalleryDialog({ images, name }: Props): JSX.Element {
  const [selectedImage, setSelectedImage] = React.useState<number>(0)

  const { url, alt } = extractImageProps(images[selectedImage])

  return (
    <DialogContent className='h-auto w-11/12 max-w-screen-lg bg-olive-100 p-2 sm:p-4 lg:rounded-2xl'>
      <DialogHeader>
        <DialogTitle className='text-gold-600'>{name}</DialogTitle>
      </DialogHeader>
      <div className='lg:px-10'>
        <div className='relative mb-8 mt-2 aspect-[5/3] h-fit w-full overflow-hidden rounded-lg border-2 border-gold-400 bg-olive-300 shadow-xl sm:aspect-[2/1] lg:rounded-2xl'>
          <Image
            alt={alt}
            src={url}
            fill
            className='object-cover object-center'
            sizes='(max-width: 640px) 50vw, 30rem'
          />
        </div>

        <ImageCarousel
          images={images}
          selectedPhoto={selectedImage}
          onPhotoSelect={setSelectedImage}
        />
      </div>
    </DialogContent>
  )
}
