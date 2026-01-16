import type { CollectionConfig } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'
import createCollectionSlug from '../hooks/collections/create-collection-slug'
import revalidateCache from '../hooks/collections/revalidate-cache'
import { validateSlugFriendly } from '../utils/validation'

export const ArticleCategories: CollectionConfig = {
  slug: 'article-categories',
  labels: {
    singular: 'Article Category',
    plural: 'Article Categories'
  },
  admin: {
    useAsTitle: 'name'
  },
  access: DEFAULT_COLLECTION_ACCESS,
  hooks: {
    beforeChange: [createCollectionSlug],
    afterChange: [revalidateCache('articles')]
  },
  fields: [
    {
      name: 'slug',
      label: 'Category Slug / URL (Auto Generated)',
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
      label: 'Category Name',
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 100,
      validate: validateSlugFriendly
    }
  ]
}
