import type { CollectionConfig } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'
import { isLoggedInOrIsPublished } from '../access/is-logged-in-or-is-published'

import Address from '../field-groups/address'
import BookingPlatform from '../field-groups/booking-platform'
// import SEOFields from '../field-groups/seo'
import SocialMediaLinks from '../field-groups/social-media-links'
import GuestHouseContentFields from '../field-groups/guesthouse-content-fields'

import { validateSlugFriendly } from '../utils/validation'

import revalidateAllPaths from '../hooks/collections/revalidate-all-paths'
import createGuesthouseSlug from '../hooks/collections/create-guesthouse-slug'

export const Guesthouses: CollectionConfig = {
  versions: {
    drafts: true
  },
  slug: 'guesthouses',
  admin: {
    useAsTitle: 'name'
  },
  access: {
    ...DEFAULT_COLLECTION_ACCESS,
    read: isLoggedInOrIsPublished
  },
  hooks: {
    beforeChange: [createGuesthouseSlug],
    afterChange: [revalidateAllPaths]
  },
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
      admin: {
        position: 'sidebar',
        readOnly: true
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
        }
        // {
        //   name: 'seo',
        //   label: 'SEO & Metadata',
        //   fields: SEOFields
        // }
      ]
    }
  ]
}
