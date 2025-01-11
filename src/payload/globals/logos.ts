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
      label: 'Default Logo, Dark (SVG Recommended)',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      required: true
    },
    {
      name: 'logo_light',
      label: 'Default Logo, Light (SVG Recommended)',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      required: true
    },
    {
      name: 'minimal_dark',
      label: 'Minimal Dark Logo (SVG Recommended)',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      required: true
    },
    {
      name: 'minimal_light',
      label: 'Minimal Light Logo (SVG Recommended)',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      required: true
    }
  ]
}
