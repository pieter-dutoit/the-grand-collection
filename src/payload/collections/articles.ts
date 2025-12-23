import type { CollectionConfig } from 'payload'

import createSlug from '../hooks/collections/create-collection-slug'
import revalidateCache from '../hooks/collections/revalidate-cache'

export const Articles: CollectionConfig = {
  slug: 'articles',
  hooks: {
    beforeChange: [createSlug],
    afterChange: [revalidateCache('articles', true)]
  },
  admin: {
    useAsTitle: 'title'
  },
  versions: {
    drafts: true
  },
  fields: [
    {
      name: 'slug',
      label: 'Article Slug / URL (Auto Generated)',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        position: 'sidebar',
        readOnly: true
      }
    },
    {
      name: 'destination',
      label: 'Destination',
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: false,
      index: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'guesthouse',
      label: 'Guesthouse',
      type: 'relationship',
      relationTo: 'guesthouses',
      hasMany: false,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'featured',
      label: 'Featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      required: true,
      defaultValue: 'guide',
      options: [
        {
          label: 'Guide',
          value: 'guide'
        }
      ],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text',
      unique: false,
      required: true,
      defaultValue: 'The Grand Collection',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'thumbnail',
      label: 'Thumbnail',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      required: true
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      minLength: 1,
      maxLength: 200
    },
    {
      name: 'excerpt',
      type: 'text',
      label: 'Excerpt',
      required: true,
      minLength: 10,
      maxLength: 300
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Content',
      required: true
    }
  ]
}
