import type { CollectionConfig } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

export const Amenities: CollectionConfig = {
  slug: 'amenities',
  access: DEFAULT_COLLECTION_ACCESS,
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Amenity Name',
      required: true,
      minLength: 1,
      maxLength: 100
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: false,
      maxLength: 500
    },
    {
      name: 'icon',
      label:
        'Icon Upload (Recommended: SVG icons from https://lucide.dev/icons/)',
      type: 'upload',
      relationTo: 'media',
      required: true
    }
  ]
}
