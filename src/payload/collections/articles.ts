import type { CollectionConfig } from 'payload'

// import revalidateCollection, {
//   revalidateAfterDelete,
//   revalidateCollectionByField
// } from '../hooks/revalidate-collection'
import createSlug from '../hooks/collections/create-collection-slug'

export const Articles: CollectionConfig = {
  slug: 'articles',
  hooks: {
    beforeChange: [createSlug]
    // afterChange: [
    //   revalidateCollectionByField('slug'),
    //   revalidateCollection('services')
    // ],
    // afterDelete: [
    //   revalidateAfterDelete({ fieldNames: ['slug'], tags: ['services'] })
    // ]
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
      required: false,
      admin: {
        position: 'sidebar',
        readOnly: true
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
      name: 'body',
      type: 'richText',
      label: 'Content',
      required: true
    }
  ]
}
