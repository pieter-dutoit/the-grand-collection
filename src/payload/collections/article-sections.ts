import type { CollectionConfig } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'
import createCollectionSlug from '../hooks/collections/create-collection-slug'
import revalidateCache from '../hooks/collections/revalidate-cache'
import { validateSlugFriendly } from '../utils/validation'

export const ArticleSections: CollectionConfig = {
  slug: 'article-sections',
  labels: {
    singular: 'Article Section',
    plural: 'Article Sections'
  },
  admin: {
    useAsTitle: 'name'
  },
  access: DEFAULT_COLLECTION_ACCESS,
  hooks: {
    beforeChange: [createCollectionSlug],
    afterChange: [
      revalidateCache('articles'),
      revalidateCache('article-sections')
    ]
  },
  fields: [
    {
      name: 'slug',
      label: 'Section Slug / URL (Auto Generated)',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        position: 'sidebar',
        readOnly: true
      }
    },
    {
      name: 'name',
      type: 'text',
      label: 'Section Name',
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 100,
      validate: validateSlugFriendly
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      maxLength: 250
    }
  ]
}
