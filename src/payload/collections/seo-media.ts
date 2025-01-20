import type { CollectionConfig } from 'payload'
import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

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
        formatOptions: {
          format: 'jpeg',
          options: {
            quality: 75
          }
        }
      },
      {
        name: 'twitter',
        fit: 'cover',
        width: 1600,
        height: 675,
        formatOptions: {
          format: 'jpeg',
          options: {
            quality: 75
          }
        }
      }
    ],
    resizeOptions: {
      width: 1200,
      height: 630,
      fit: 'cover',
      position: 'center'
    },
    formatOptions: {
      format: 'jpeg',
      options: {
        quality: 75
      }
    },
    mimeTypes: ['image/*']
  }
}
