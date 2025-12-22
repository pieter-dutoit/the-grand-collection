import { twMerge } from 'tailwind-merge'

import Image from '@/components/ui/image'

type Props = {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  portrait?: boolean
  aspectRatio?: number
  containerClassName?: string
  backdropClassName?: string
  foregroundClassName?: string
}

export default function BlurredBackdropImage({
  src,
  alt,
  sizes,
  priority,
  portrait,
  aspectRatio,
  containerClassName,
  backdropClassName,
  foregroundClassName
}: Props) {
  if (!src) return null

  return (
    <div
      className={twMerge(
        'relative w-full overflow-hidden',
        !aspectRatio && 'aspect-video',
        containerClassName
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={src}
        alt=''
        fill
        className={twMerge(
          'not-prose z-0 scale-125 object-cover object-center blur-xl',
          backdropClassName
        )}
        sizes={sizes}
        priority={priority}
        portrait={portrait}
      />
      <Image
        src={src}
        alt={alt}
        fill
        className={twMerge(
          'not-prose z-10 object-contain object-center',
          foregroundClassName
        )}
        sizes={sizes}
        priority={priority}
        portrait={portrait}
      />
    </div>
  )
}
