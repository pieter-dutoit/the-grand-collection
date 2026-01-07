import type { CollectionConfig, ImageUploadFormatOptions } from 'payload'
import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

const JPEG_FORMAT = {
  format: 'jpeg',
  options: {
    quality: 95
  }
} satisfies ImageUploadFormatOptions

export const SEOMedia: CollectionConfig = {
  slug: 'seo-media',
  labels: {
    singular: 'SEO Media',
    plural: 'SEO Media'
  },
  access: { ...DEFAULT_COLLECTION_ACCESS, read: () => true },
  fields: [
    {
      name: 'file_size_display',
      type: 'ui',
      admin: {
        components: {
          Field: '@/payload/components/file-size-display'
        }
      }
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Brief image description, e.g. "Wifi icon" or "View of pool"',
      required: true
    }
  ],
  upload: {
    disableLocalStorage: true,
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        fit: 'cover',
        width: 600,
        height: 315,
        formatOptions: JPEG_FORMAT
      },
      {
        name: 'twitter',
        fit: 'cover',
        width: 1600,
        height: 675,
        formatOptions: JPEG_FORMAT
      }
    ],
    resizeOptions: {
      width: 1200,
      height: 630,
      fit: 'cover',
      position: 'center'
    },
    formatOptions: JPEG_FORMAT,
    mimeTypes: ['image/*']
  }
}
