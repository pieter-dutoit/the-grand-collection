import { GroupField } from 'payload'

import { validateSlug } from '@/payload/utils/validation'

const CTA: GroupField = {
  name: 'cta',
  label: 'Call to Action',
  type: 'group',
  fields: [
    {
      name: 'cta_text',
      type: 'text',
      label: 'Link Text',
      admin: {
        placeholder: 'E.g. Learn More'
      },
      required: true,
      minLength: 3,
      maxLength: 100
    },
    {
      name: 'cta_link',
      type: 'text',
      label: 'Link Path/URL',
      defaultValue: '#',
      required: true,
      validate: validateSlug
    }
  ]
}

export default CTA
