/* eslint-disable @next/next/no-img-element */

import { twMerge } from 'tailwind-merge'

interface Props {
  src: string
  alt: string
  fill?: boolean
  height?: number
  width?: number
  sizes?: string
  priority?: boolean
  className?: string
  portrait?: boolean
}

export const ALLOWED_SIZES = [200, 350, 500, 770, 900, 1200, 1500, 1920, 2048]

const PORTRAIT_ASPECT_RATIO = 1.4
export function calculatePortraitHeight(width: number): number {
  return Math.floor(width * PORTRAIT_ASPECT_RATIO)
}

const MOBILE_BREAK = 900

export function createSourceSet(src: string, portrait: boolean): string {
  const pathSections = src.split('.')
  const extension = pathSections[pathSections.length - 1]
  const name = pathSections.slice(0, pathSections.length - 1).join('.')

  const result = ALLOWED_SIZES.reduce((acc, width, index) => {
    const height =
      width <= MOBILE_BREAK && portrait ? calculatePortraitHeight(width) : 0

    return (
      acc +
      `${index ? ', ' : ''}${name}-${width}x${height}.${extension} ${width}w`
    )
  }, '')

  return result
}

export default function Image(props: Props) {
  const {
    src,
    alt,
    sizes,
    height,
    width,
    fill,
    className = '',
    portrait = false,
    priority
  } = props

  const filename = src.split('/').pop()
  const imagePath = `/api/images/${filename}`

  const defaultStyles = fill ? 'absolute inset-0 size-full' : ''

  return (
    <img
      className={twMerge(defaultStyles, className)}
      src={imagePath}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      {...(fill
        ? src && { srcSet: createSourceSet(imagePath, portrait), sizes }
        : {
            height,
            width
          })}
    />
  )
}
