import type { CollectionConfig } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

export const RichtextSections: CollectionConfig = {
  slug: 'richtext-sections',
  admin: {
    useAsTitle: 'heading'
  },
  access: DEFAULT_COLLECTION_ACCESS,
  fields: [
    {
      name: 'heading',
      label: 'Section Heading (Ideally 5 to 10 words, up to 200 characters)',
      type: 'text',
      minLength: 3,
      maxLength: 200,
      required: true
    },
    {
      name: 'content',
      label: 'Content (Avoid using "Heading 1" and "Heading 2" tags)',
      type: 'richText',
      required: true
    }
  ]
}
