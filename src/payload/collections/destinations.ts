import type { CollectionConfig } from 'payload'

import SEOFields from '../field-groups/seo'
import createCollectionSlug from '../hooks/collections/create-collection-slug'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name'
  },
  hooks: {
    beforeChange: [createCollectionSlug]
  },
  fields: [
    {
      name: 'name',
      label: 'Destination Name',
      type: 'text',
      required: true,
      unique: true
    },
    {
      name: 'slug',
      label: 'Page Slug / URL (Auto Generated)',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        position: 'sidebar',
        readOnly: true
      }
    },
    {
      name: 'image',
      label: 'Destination Image',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'seo',
          label: 'SEO',
          fields: SEOFields
        },
        {
          name: 'guides',
          label: 'Guides Page',
          fields: [
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              required: true
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              required: true
            },
            {
              name: 'image',
              label: 'Image',
              type: 'upload',
              required: true,
              relationTo: 'media'
            },
            ...SEOFields
          ]
        }
      ]
    }
  ]
}
