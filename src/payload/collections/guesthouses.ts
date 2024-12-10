import type { CollectionConfig, Field, GroupField } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'
import { isLoggedInOrIsPublished } from '../access/is-logged-in-or-is-published'

import Address from '../field-groups/address'
import BookingPlatform from '../field-groups/booking-platform'
import SEOGroup from '../field-groups/seo'
import SocialMediaLinks from '../field-groups/social-media-links'

import { validateSlugFriendly } from '../utils/validation'

const DETAILS_FIELDS: GroupField = {
  name: 'details',
  label: 'Details',
  type: 'group',
  fields: [
    {
      name: 'background_image',
      label: 'Background / Hero Image',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'heading',
      type: 'text',

      label:
        'Page Heading (About 50 to 70 characters for best SEO results). For example: "Discover the Paarl Grand: A Luxurious Escape in the Heart of Wine Country"',
      required: true,
      maxLength: 100,
      minLength: 20,
      unique: true
    },
    {
      name: 'description',
      label:
        'Guesthouse Description (Property overview, ideally about 30 to 50 words).',
      type: 'textarea',
      required: true,
      minLength: 50,
      maxLength: 1000
    },
    {
      name: 'gallery',
      label: 'Main Gallery (3 or more images)',
      type: 'upload',
      required: true,
      relationTo: 'media',
      hasMany: true,
      minRows: 3,
      maxRows: 10
    },
    {
      name: 'general_amenities',
      label: 'General Amenities',
      type: 'relationship',
      relationTo: 'amenities',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 100
    }
  ]
}

const CONTACT_FIELDS: Field[] = [
  {
    name: 'contact_persons',
    label: 'Contact Person(s)',
    type: 'relationship',
    relationTo: 'contact-person',
    hasMany: true,
    minRows: 1,
    maxRows: 10
  },
  Address,
  SocialMediaLinks
]

export const Guesthouses: CollectionConfig = {
  slug: 'guesthouses',
  admin: {
    useAsTitle: 'name'
  },
  access: {
    ...DEFAULT_COLLECTION_ACCESS,
    read: isLoggedInOrIsPublished
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
          fields: [DETAILS_FIELDS]
        },
        {
          name: 'contact_details',
          label: 'Contacts & Socials',
          fields: CONTACT_FIELDS
        },

        {
          name: 'seo',
          label: 'SEO & Metadata',
          fields: [SEOGroup]
        }
      ]
    }
  ]
}
