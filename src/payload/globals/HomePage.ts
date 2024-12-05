import type { GlobalConfig } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/isLoggedInOrIsPublished'
import { isLoggedIn } from '@/payload/access/isLoggedIn'

import HeroFields from '@/payload/field-groups/hero-fields'
import OverviewFields from '@/payload/field-groups/overview-fields'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn
  },
  fields: [HeroFields, OverviewFields]
}
