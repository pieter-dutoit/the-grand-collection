import type { CollectionConfig } from 'payload'

import { isLoggedIn } from '@/payload/access/isLoggedIn'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn
  },
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
        quality: 80
      }
    },
    mimeTypes: ['image/*']
  }
}
