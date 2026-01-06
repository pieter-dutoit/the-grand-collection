import { ContactPerson, Media, SeoMedia } from '@/payload/payload-types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getPublicBucketBaseUrl = () => {
  const base =
    process.env.NEXT_PUBLIC_S3_BUCKET_PATH || process.env.S3_BUCKET_PATH || ''
  return base.replace(/\/$/, '')
}

const stripLeadingSlash = (value: string) => value.replace(/^\/+/, '')

const extractPathname = (value: string) => {
  if (!value) return ''

  try {
    return stripLeadingSlash(new URL(value).pathname)
  } catch {
    return stripLeadingSlash(value)
  }
}

const stripBucketPrefix = (pathname: string) => {
  const bucket = process.env.S3_BUCKET
  if (bucket && pathname.startsWith(`${bucket}/`)) {
    return pathname.slice(bucket.length + 1)
  }
  return pathname
}

const buildPublicUrl = (pathname: string) => {
  const base = getPublicBucketBaseUrl()
  if (!base || !pathname) return ''
  return `${base}/${stripLeadingSlash(pathname)}`
}

export function getPublicImageUrl(
  image: Media | string | SeoMedia | undefined | null
): string {
  if (!image || image === null || typeof image === 'string') {
    return ''
  }

  const publicBase = getPublicBucketBaseUrl()
  const fallbackUrl = image.url ?? ''

  if (!publicBase) {
    return fallbackUrl
  }

  if (image.filename) {
    const path = [image.prefix, image.filename].filter(Boolean).join('/')
    return buildPublicUrl(path)
  }

  if (!fallbackUrl) return ''

  const path = stripBucketPrefix(extractPathname(fallbackUrl))
  return buildPublicUrl(path) || fallbackUrl
}

export function getPublicImageSizeUrl(
  image: Media | string | SeoMedia | undefined | null,
  sizeName: string
): string {
  if (!image || image === null || typeof image === 'string') {
    return ''
  }

  const sizes = image.sizes as
    | Record<string, { url?: string | null; filename?: string | null }>
    | undefined
  const size = sizes?.[sizeName]
  if (!size) return ''

  const publicBase = getPublicBucketBaseUrl()

  if (size.filename && publicBase) {
    const path = [image.prefix, size.filename].filter(Boolean).join('/')
    return buildPublicUrl(path)
  }

  if (size.url) {
    if (!publicBase) return size.url
    const path = stripBucketPrefix(extractPathname(size.url))
    return buildPublicUrl(path) || size.url
  }

  return ''
}

export function rebaseImageUrl(url: string): string {
  if (!url) return ''
  const publicBase = getPublicBucketBaseUrl()
  if (!publicBase) return url

  const path = stripBucketPrefix(extractPathname(url))
  return buildPublicUrl(path) || url
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
  const { alt, height, width } = image
  return {
    url: getPublicImageUrl(image),
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
