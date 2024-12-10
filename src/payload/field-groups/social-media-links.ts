import { GroupField } from 'payload'

const SocialMediaLinks: GroupField = {
  name: 'socials',
  label: 'Social Media Links',
  type: 'group',
  fields: [
    {
      name: 'name',
      label: 'Platform Name',
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
