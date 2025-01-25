import type { GlobalConfig } from 'payload'

import { isLoggedInOrIsPublished } from '@/payload/access/is-logged-in-or-is-published'
import { isLoggedIn } from '@/payload/access/is-logged-in'

export const Logos: GlobalConfig = {
  slug: 'logos',
  versions: {
    drafts: true
  },
  access: {
    read: isLoggedInOrIsPublished,
    update: isLoggedIn
  },
  fields: [
    {
      name: 'logo_dark',
      label: 'Large Logo, Dark (Used in home page Hero)',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      required: true
    },
    {
      name: 'logo_light',
      label: 'Large Logo, Light (Used in home page Hero)',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      required: true
    },
    {
      name: 'minimal_dark',
      label: 'Small Logo, Dark (Used in navbar and footer)',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      required: true
    },
    {
      name: 'minimal_light',
      label: 'Small Logo, Light (Used in navbar and footer)',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      required: true
    }
  ]
}
