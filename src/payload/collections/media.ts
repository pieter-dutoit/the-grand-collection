import type { CollectionConfig } from 'payload'
import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { ...DEFAULT_COLLECTION_ACCESS, read: () => true },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Brief image description (for SEO)',
      required: true
    }
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        fit: 'cover',
        height: 200,
        width: 200,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 75
          }
        }
      }
    ],
    resizeOptions: {
      width: 3840,
      height: 2160,
      fit: 'inside',
      position: 'center'
    },
    formatOptions: {
      format: 'webp',
      options: {
        quality: 100
      }
    },
    mimeTypes: ['image/*']
  }
}
