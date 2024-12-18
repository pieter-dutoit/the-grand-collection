import type { GlobalConfig } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/is-logged-in-or-is-published'
import { isLoggedIn } from '@/payload/access/is-logged-in'

import HeroFields from '@/payload/field-groups/hero-fields'
import OverviewFields from '@/payload/field-groups/overview-fields'
import FeaturedPropertiesFields from '@/payload/field-groups/featured-properties-fields'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn
  },
  fields: [HeroFields, OverviewFields, FeaturedPropertiesFields]
}
