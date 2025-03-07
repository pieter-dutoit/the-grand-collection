import type { GlobalConfig } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/is-logged-in-or-is-published'
import { isLoggedIn } from '@/payload/access/is-logged-in'

import SEOFields from '../field-groups/seo'
import revalidateCache from '../hooks/globals/revalidate-cache'

export const AllGuesthousesPage: GlobalConfig = {
  slug: 'all-guesthouses-page',
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [revalidateCache('all-guesthouses-page')]
  },
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: 'Content',
          fields: [
            {
              name: 'heading',
              label: 'Page Heading',
              type: 'text',
              required: true,
              minLength: 3,
              maxLength: 200,
              defaultValue: 'Explore Our Guesthouses in South Africa'
            },
            {
              name: 'sub_heading',
              label: 'Sub Heading',
              type: 'text',
              required: true,
              minLength: 3,
              maxLength: 200,
              defaultValue: 'Comfort and Luxury in Every Stay'
            }
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
