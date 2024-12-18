import { ArrayField } from 'payload'

const SocialMediaLinks: ArrayField = {
  name: 'socials',
  label: 'Social Media Links',
  type: 'array',
  fields: [
    {
      name: 'platform',
      label: 'Platform',
      type: 'relationship',
      relationTo: 'social-media-platforms',
      hasMany: false,
      required: true
    },
    {
      name: 'url',
      label: 'Social Account Link URL',
      type: 'text',
      required: true
    }
  ]
}

export default SocialMediaLinks
