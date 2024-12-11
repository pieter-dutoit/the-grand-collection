import { Field } from 'payload'

import { validateSlug } from '@/payload/utils/validation'

const ActionLinkFields: Field[] = [
  {
    name: 'link_text',
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
    name: 'link_url',
    type: 'text',
    label: 'Link Path/URL',
    defaultValue: '#',
    required: true,
    validate: validateSlug
  }
]

export default ActionLinkFields
