import type { GroupField } from 'payload'
import CTA from './call-to-action'

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
      name: 'cta_locations',
      type: 'group',
      label: 'Locations Button Details',
      fields: CTA.fields
    },
    {
      name: 'cta_learn_more',
      type: 'group',
      label: 'Learn More Button Details',
      fields: CTA.fields
    }
  ]
}

export default HeroFields
