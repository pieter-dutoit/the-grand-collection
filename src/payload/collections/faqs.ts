import type { CollectionConfig } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'
import revalidateCache from '../hooks/collections/revalidate-cache'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'title'
  },
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [revalidateCache('faqs', true)]
  },
  access: DEFAULT_COLLECTION_ACCESS,
  fields: [
    {
      name: 'title',
      label: 'FAQ Title',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 120
    },
    {
      name: 'items',
      label: 'Questions & Answers',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'FAQ Item',
        plural: 'FAQ Items'
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          minLength: 3,
          maxLength: 200
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          minLength: 3,
          maxLength: 1000
        }
      ]
    }
  ]
}
