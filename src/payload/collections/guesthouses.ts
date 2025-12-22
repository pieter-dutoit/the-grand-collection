import type { CollectionConfig } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

import Address from '../field-groups/address'
import BookingPlatform from '../field-groups/booking-platform'
import SEOFields from '../field-groups/seo'
import SocialMediaLinks from '../field-groups/social-media-links'
import GuestHouseContentFields from '../field-groups/guesthouse-content-fields'

import createCollectionSlug from '../hooks/collections/create-collection-slug'
import { validateSlugFriendly } from '../utils/validation'
import revalidateCache from '../hooks/collections/revalidate-cache'
import BusinessDetailsFields from '../field-groups/business-details-fields'

export const Guesthouses: CollectionConfig = {
  slug: 'guesthouses',
  admin: {
    useAsTitle: 'name'
  },
  versions: {
    drafts: true
  },
  hooks: {
    beforeChange: [createCollectionSlug],
    afterChange: [revalidateCache('guesthouses', true)]
  },
  access: DEFAULT_COLLECTION_ACCESS,
  fields: [
    {
      name: 'name',
      label: 'Guesthouse Name',
      type: 'text',
      minLength: 3,
      maxLength: 100,
      unique: true,
      required: true,
      validate: validateSlugFriendly
    },
    //  SIDE CONTENT
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
    BookingPlatform,
    //  TABS
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: 'Page Content',
          fields: GuestHouseContentFields
        },
        {
          name: 'business_details',
          label: 'Business Details',
          fields: BusinessDetailsFields
        },
        {
          name: 'contact_details',
          label: 'Contacts & Socials',
          fields: [
            {
              name: 'contact_persons',
              label: 'Contact Person(s)',
              type: 'relationship',
              relationTo: 'contact-persons',
              hasMany: true,
              minRows: 1,
              maxRows: 10
            },
            Address,
            SocialMediaLinks
          ]
        },
        {
          name: 'seo',
          label: 'SEO',
          fields: SEOFields
        }
      ]
    }
  ]
}
