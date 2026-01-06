import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type Props = {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
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
  aspectRatio,
  containerClassName,
  backdropClassName,
  foregroundClassName
}: Props) {
  if (!src) return null
  const resolvedSizes = sizes ?? '100vw'

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
        priority={priority}
        sizes={resolvedSizes}
      />
      <Image
        src={src}
        alt={alt}
        fill
        className={twMerge(
          'not-prose z-10 object-contain object-center',
          foregroundClassName
        )}
        priority={priority}
        sizes={resolvedSizes}
      />
    </div>
  )
}
