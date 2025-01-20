import type { CollectionConfig } from 'payload'
import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

export const SocialMediaPlatforms: CollectionConfig = {
  slug: 'social-media-platforms',
  labels: {
    singular: 'Social Media Platform',
    plural: 'Social Media Platforms'
  },
  admin: {
    useAsTitle: 'name'
  },
  access: DEFAULT_COLLECTION_ACCESS,
  fields: [
    {
      name: 'name',
      label: 'Platform Name',
      type: 'text',
      required: true,
      unique: true
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'upload',
      relationTo: 'media',
      required: true
    }
  ]
}
