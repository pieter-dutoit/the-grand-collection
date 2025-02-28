import type { CollectionConfig } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

export const Beds: CollectionConfig = {
  slug: 'beds',
  access: DEFAULT_COLLECTION_ACCESS,
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Bed Name',
      required: true,
      minLength: 1,
      maxLength: 100
    },
    {
      name: 'googleName',
      type: 'select',
      label: 'SEO Bed Type',
      required: true,
      options: [
        {
          label: 'King',
          value: 'KING'
        },
        {
          label: 'Queen',
          value: 'QUEEN'
        },

        {
          label: 'Double',
          value: 'DOUBLE'
        },

        {
          label: 'Single',
          value: 'SINGLE'
        }
      ]
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
