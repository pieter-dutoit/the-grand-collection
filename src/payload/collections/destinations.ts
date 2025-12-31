import type { CollectionConfig } from 'payload'

import SEOFields from '../field-groups/seo'
import createCollectionSlug from '../hooks/collections/create-collection-slug'
import revalidateCache from '../hooks/collections/revalidate-cache'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name'
  },
  hooks: {
    beforeChange: [createCollectionSlug],
    afterChange: [revalidateCache('destinations', true)]
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
      name: 'label',
      type: 'text',
      label: 'Label',
      required: true,
      minLength: 1,
      maxLength: 200
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
      name: 'description',
      type: 'text',
      label: 'Description',
      required: true,
      minLength: 10,
      maxLength: 300
    },

    {
      name: 'image',
      label: 'Destination Image',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'faq',
      label: 'FAQ Section',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: false,
      filterOptions: {
        _status: {
          equals: 'published'
        }
      }
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'seo',
          label: 'SEO',
          fields: SEOFields
        }
      ]
    }
  ]
}
