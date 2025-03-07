import type { CollectionConfig } from 'payload'
import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

export const Media: CollectionConfig = {
  slug: 'media',
  access: DEFAULT_COLLECTION_ACCESS,
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
      label: 'Brief image description, e.g. "View of pool"',
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
        height: 100,
        width: 100,
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
        quality: 75
      }
    },
    mimeTypes: ['image/*']
  }
}
