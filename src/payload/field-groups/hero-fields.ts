import type { GroupField } from 'payload'

import ActionLinkFields from './action-link'

const HeroFields: GroupField = {
  name: 'hero',
  label: 'Hero/Landing Section',
  type: 'group',
  fields: [
    {
      name: 'background_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Select the Background Image',
      required: true
    },
    {
      name: 'title',
      type: 'text',
      label: 'Heading (H1: Ideally 20 to 70 characters for SEO)',
      minLength: 20,
      required: true
    },
    {
      name: 'locations_link',
      type: 'group',
      label: 'Locations Link',
      fields: ActionLinkFields
    }
  ]
}

export default HeroFields
