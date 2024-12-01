import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true
    }
  ],
  upload: {
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
};
