import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type Props = {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  fetchPriority?: 'high' | 'low' | 'auto'
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
  fetchPriority,
  aspectRatio,
  containerClassName,
  backdropClassName,
  foregroundClassName
}: Props) {
  if (!src) return null
  const resolvedSizes = sizes ?? '100vw'
  const resolvedFetchPriority = fetchPriority ?? (priority ? 'high' : undefined)
  const isSvg =
    src.toLowerCase().includes('.svg') || src.startsWith('data:image/svg+xml')

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
        fetchPriority={
          resolvedFetchPriority === 'high' ? 'low' : resolvedFetchPriority
        }
        unoptimized={isSvg}
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
        fetchPriority={resolvedFetchPriority}
        unoptimized={isSvg}
      />
    </div>
  )
}
