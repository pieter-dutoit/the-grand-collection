import type { ImageLoaderProps } from 'next/image'

const WIDTH_SUFFIX_REGEX = /-w\d+(?=\.[^.]+$)/i
const MEDIA_PATH_REGEX = /(^|\/)media\//i
const SEO_MEDIA_PATH_REGEX = /(^|\/)media\/seo\//i

const normalizeBasePath = (pathname: string) => {
  const trimmed = pathname.replace(/\/$/, '')
  return trimmed === '/' ? '' : trimmed
}

const addWidthSuffix = (
  pathname: string,
  width: number,
  extensionOverride?: string
) => {
  if (!width || pathname.toLowerCase().endsWith('.svg')) return pathname

  const extensionIndex = pathname.lastIndexOf('.')
  if (extensionIndex === -1) return pathname

  const name = pathname.slice(0, extensionIndex)
  const extension = extensionOverride
    ? extensionOverride.startsWith('.')
      ? extensionOverride
      : `.${extensionOverride}`
    : pathname.slice(extensionIndex)
  if (WIDTH_SUFFIX_REGEX.test(pathname)) {
    return `${name}${extension}`
  }

  return `${name}-w${width}${extension}`
}

const resolveUrl = (src: string, baseUrl: URL | null) => {
  if (baseUrl) {
    return new URL(src, baseUrl)
  }

  try {
    return new URL(src)
  } catch {
    return null
  }
}

export default function imageLoader({ src, width }: ImageLoaderProps) {
  const publicBase =
    process.env.NEXT_PUBLIC_S3_BUCKET_PATH || process.env.S3_BUCKET_PATH || ''

  const baseUrl = publicBase ? new URL(publicBase) : null
  const resolvedUrl = resolveUrl(src, baseUrl)
  const fullPathname = resolvedUrl?.pathname ?? src
  const shouldForceWebp =
    MEDIA_PATH_REGEX.test(fullPathname) &&
    !SEO_MEDIA_PATH_REGEX.test(fullPathname)

  const basePath = baseUrl ? normalizeBasePath(baseUrl.pathname) : ''
  const origin = baseUrl?.origin ?? resolvedUrl?.origin ?? ''
  const search = resolvedUrl?.search ?? ''

  let pathname = resolvedUrl?.pathname ?? src
  if (!pathname.startsWith('/')) {
    pathname = `/${pathname}`
  }

  if (basePath && pathname.startsWith(`${basePath}/`)) {
    pathname = pathname.slice(basePath.length)
  }

  const sizedPath = addWidthSuffix(
    pathname,
    width,
    shouldForceWebp ? 'webp' : undefined
  )
  const finalPath = `${basePath}${sizedPath}`

  if (!origin) {
    return `${finalPath}${search}`
  }

  return `${origin}${finalPath}${search}`
}
