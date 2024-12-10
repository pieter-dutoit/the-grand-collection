import type { GlobalConfig } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/is-logged-in-or-is-published'
import { isLoggedIn } from '@/payload/access/is-logged-in'

import HeroFields from '@/payload/field-groups/hero-fields'
import OverviewFields from '@/payload/field-groups/overview-fields'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn
  },
  fields: [
    HeroFields,
    OverviewFields,
    {
      name: 'featured_guesthouses',
      label: 'Featured Guesthouses',
      type: 'relationship',
      relationTo: 'guesthouses',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 4
    }
  ]
}
