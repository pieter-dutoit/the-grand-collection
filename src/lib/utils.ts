import { Media } from '@/payload/payload-types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractImageProps(image: Media | string): {
  url: string
  alt: string
} {
  if (typeof image === 'string') return { url: image, alt: '' }
  const { url, alt } = typeof image === 'object' ? image : { url: '', alt: '' }
  return { url: url || '', alt: alt || '' }
}
