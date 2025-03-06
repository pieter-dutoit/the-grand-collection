import { ContactPerson, Media, SeoMedia } from '@/payload/payload-types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractImageProps(
  image: Media | string | SeoMedia | undefined | null
): {
  url: string
  alt: string
  width: number
  height: number
} {
  if (!image || image === null || typeof image === 'string') {
    return { url: '', alt: '', height: 0, width: 0 }
  }
  const { url, alt, height, width } = image
  return {
    url: url ?? '',
    alt: alt ?? '',
    height: height ?? 0,
    width: width ?? 0
  }
}

export function extractContactDetails(
  contacts: (ContactPerson | string)[] | null | undefined
): {
  name: string | undefined | null
  phone: string
  phoneLink: string
  email: string
  position: string | undefined | null
}[] {
  if (!contacts) return []

  return contacts
    .filter((contact) => typeof contact !== 'string')
    .map(({ name, phone, email, position }) => {
      const phoneLink = phone
        .replace(/\D/g, '')
        .replace(/^0/, '')
        .replace(/^\+27/, '')

      return { name, phone, phoneLink, email, position }
    })
}

export function getBaseUrl(): string {
  const env = process.env.VERCEL_ENV || ''

  if (env === 'production') {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (['development', 'preview'].includes(env)) {
    return `https://${process.env.VERCEL_URL || process.env.VERCEL_BRANCH_URL}`
  }

  return 'http://localhost:3000'
}
