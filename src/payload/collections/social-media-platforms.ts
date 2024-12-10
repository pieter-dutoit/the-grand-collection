import type { CollectionConfig } from 'payload'
import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

export const SocialMediaPlatforms: CollectionConfig = {
  slug: 'social-media-platforms',
  labels: {
    singular: 'Social Media Platform',
    plural: 'Social Media Platforms'
  },
  admin: {
    useAsTitle: 'platform'
  },
  access: DEFAULT_COLLECTION_ACCESS,
  fields: [
    {
      name: 'platform',
      label: 'Social Media Platform',
      type: 'text',
      required: true
    }
  ]
}
