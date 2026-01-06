import 'server-only'

import { extractImageProps } from '@/lib/utils'
import type { Destination, Media } from '@/payload/payload-types'

export const resolveDestinationSlug = (
  destination: string | Destination,
  destinationById: Map<string, string>
) => {
  if (typeof destination === 'string') {
    return destinationById.get(destination)
  }

  return destination.slug
}

export const getAbsoluteImageUrl = (image: Media | string) => {
  const { url } = extractImageProps(image)
  return url || undefined
}
