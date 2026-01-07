import type { CollectionConfig, ImageUploadFormatOptions } from 'payload'
import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

const NEXT_IMAGE_WIDTHS = [
  16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840
]

const WEBP_FORMAT = {
  format: 'webp',
  options: {
    quality: 99
  }
} satisfies ImageUploadFormatOptions

const generateSizedImageName = (args: {
  extension: string
  height: number
  originalName: string
  sizeName: string
  width: number
}) => `${args.originalName}-${args.sizeName}.${args.extension}`

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
    adminThumbnail: 'w96',
    imageSizes: NEXT_IMAGE_WIDTHS.map((width) => ({
      name: `w${width}`,
      width,
      height: undefined,
      fit: 'inside',
      position: 'center',
      withoutEnlargement: true,
      formatOptions: WEBP_FORMAT,
      generateImageName: generateSizedImageName
    })),
    resizeOptions: {
      width: 3840,
      height: 2160,
      fit: 'inside',
      position: 'center'
    },
    // formatOptions: WEBP_FORMAT,
    mimeTypes: ['image/*']
  }
}
