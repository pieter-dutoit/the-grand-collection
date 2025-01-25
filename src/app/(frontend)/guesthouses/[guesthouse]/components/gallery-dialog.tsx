'use client'

import React from 'react'

import { Media } from '@/payload/payload-types'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import PreviewImageCarousel from './preview-image-carousel'
import PrimaryImageCarousel from './primary-image-carousel'

type Props = {
  images: (string | Media)[]
  name: string
}

export default function GalleryDialog({ images, name }: Props): JSX.Element {
  const [selectedImage, setSelectedImage] = React.useState<number>(0)

  return (
    <DialogContent className='h-auto w-11/12 max-w-screen-lg rounded-lg bg-olive-100 p-2 sm:p-4 lg:rounded-2xl'>
      <DialogHeader>
        <DialogTitle className='text-gold-600'>{name}</DialogTitle>
        <DialogDescription className='sr-only'>
          Image gallery for {name}
        </DialogDescription>
      </DialogHeader>
      <div className='lg:px-10'>
        <PrimaryImageCarousel
          images={images}
          selectedPhoto={selectedImage}
          onPhotoSelect={setSelectedImage}
        />

        <PreviewImageCarousel
          images={images}
          selectedPhoto={selectedImage}
          onPhotoSelect={setSelectedImage}
        />
      </div>
    </DialogContent>
  )
}
