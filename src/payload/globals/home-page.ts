import type { GlobalConfig } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/is-logged-in-or-is-published'
import { isLoggedIn } from '@/payload/access/is-logged-in'

import HeroFields from '@/payload/field-groups/hero-fields'
import OverviewFields from '@/payload/field-groups/overview-fields'
import FeaturedPropertiesFields from '@/payload/field-groups/featured-properties-fields'

import SocialMediaLinks from '../field-groups/social-media-links'
import revalidateAllPaths from '../hooks/globals/revalidate-all-paths'
import SEOFields from '../field-groups/seo'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [revalidateAllPaths]
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
          label: 'Content',
          fields: [
            HeroFields,
            OverviewFields,
            FeaturedPropertiesFields,
            SocialMediaLinks,
            {
              type: 'relationship',
              name: 'contactPersons',
              label: 'Contact Persons',
              relationTo: 'contact-persons',
              hasMany: true
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
