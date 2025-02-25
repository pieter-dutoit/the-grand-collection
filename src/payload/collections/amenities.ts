import type { CollectionConfig } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'
import createCollectionSlug from '../hooks/collections/create-collection-slug'
import { validateSlugFriendly } from '../utils/validation'

export const Amenities: CollectionConfig = {
  slug: 'amenities',
  access: DEFAULT_COLLECTION_ACCESS,
  admin: {
    useAsTitle: 'name'
  },
  hooks: {
    beforeChange: [createCollectionSlug]
  },
  fields: [
    {
      name: 'slug',
      label: 'Page Slug / URL (Auto Generated)',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true
      }
    },
    {
      name: 'featured',
      label: 'Featured',
      required: true,
      defaultValue: false,
      type: 'checkbox',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'name',
      type: 'text',
      label: 'Amenity Name',
      required: true,
      minLength: 1,
      maxLength: 100,
      validate: validateSlugFriendly
    },
    {
      name: 'googleName',
      type: 'text',
      label:
        'SEO Amenity Name (https://developers.google.com/hotels/hotel-prices/structured-data/hotel-price-structured-data#amenities)',
      required: false,
      minLength: 1,
      maxLength: 100
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: false,
      maxLength: 500
    },
    {
      name: 'icon',
      label: 'Icon Upload',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'price',
      label: 'Price (Optional)',
      type: 'group',
      fields: [
        {
          name: 'unit_price',
          type: 'number',
          label: 'Unit Price',
          required: false
        },
        {
          name: 'unit_type',
          type: 'text',
          label: 'Unit Type (e.g. per person)',
          required: false
        },
        {
          name: 'on_request',
          label: 'POA',
          required: false,
          defaultValue: false,
          type: 'checkbox'
        }
      ]
    }
  ]
}
