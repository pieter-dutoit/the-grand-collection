import type { CollectionConfig } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'
import revalidateCache from '../hooks/collections/revalidate-cache'

export const Policies: CollectionConfig = {
  slug: 'policies',
  admin: {
    useAsTitle: 'title'
  },
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [revalidateCache('policies', true)]
  },
  access: DEFAULT_COLLECTION_ACCESS,
  fields: [
    {
      name: 'title',
      label: 'Policy Title',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 120
    },
    {
      name: 'items',
      label: 'Policies Items',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Policy Item',
        plural: 'Policy Items'
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          minLength: 3,
          maxLength: 200
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          minLength: 3,
          maxLength: 1000
        }
      ]
    }
  ]
}
