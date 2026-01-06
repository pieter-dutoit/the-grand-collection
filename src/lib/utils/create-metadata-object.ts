import { Metadata } from 'next'

import {
  MetadataField,
  OpenGraphField,
  TwitterField
} from '@/payload/payload-types'

import { extractImageProps, getBaseUrl, getPublicImageSizeUrl } from '.'

interface SEO {
  meta: MetadataField
  open_graph: OpenGraphField
  twitter?: TwitterField
}

export default function createMetadataConfig(seo: SEO): Metadata {
  const { meta, open_graph, twitter } = seo

  const {
    url: ogURL,
    alt: ogAlt,
    width: ogWidth,
    height: ogHeight
  } = extractImageProps(open_graph.image)

  const twitterImageUrl =
    typeof open_graph.image === 'object'
      ? getPublicImageSizeUrl(open_graph.image, 'twitter') || ogURL || ''
      : ''

  return {
    // Basic fields:
    metadataBase: new URL(getBaseUrl()),
    generator: 'Next.js',
    applicationName: 'The Grand Collection',
    referrer: 'strict-origin-when-cross-origin',
    robots: {
      index: true,
      follow: true,
      nocache: false
    },
    // Meta:
    title: {
      default: meta.title,
      template: '%s | The Grand Collection'
    },
    description: meta.description,
    // Opengraph:
    openGraph: {
      title: open_graph.title,
      description: open_graph.description,
      siteName: open_graph.site_name,
      type: 'website',
      images: [
        {
          url: ogURL,
          alt: ogAlt,
          height: ogHeight,
          width: ogWidth
        }
      ]
    },
    // Twitter:
    twitter: {
      card: 'summary_large_image',
      title: open_graph.title,
      description: open_graph.description,
      ...(twitter?.creator && {
        creator: twitter.creator
      }),
      ...(twitter?.creatorId && {
        creatorId: twitter.creatorId
      }),
      ...(twitterImageUrl ? { images: [twitterImageUrl] } : {})
    }
  }
}
