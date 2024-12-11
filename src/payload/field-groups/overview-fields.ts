import { GroupField } from 'payload'

import ActionLinkFields from './action-link'

const OverviewFields: GroupField = {
  name: 'overview',
  label: 'Overview Section',
  type: 'group',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading (H2: Ideally 20 to 60 characters for SEO)',
      required: true
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (Ideally 50 to 300 characters for SEO)',
      maxLength: 500,
      minLength: 50,

      required: true
    },
    {
      name: 'images',
      type: 'upload',
      label: 'Select 3 Images',
      relationTo: 'media',
      hasMany: true,
      required: true,
      validate: (value) => {
        if (!value || value.length !== 3) {
          return 'You must select exactly 3 images.'
        }
        return true
      }
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features List',
      required: true,
      minRows: 2,
      maxRows: 5,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Feature Title',
          minLength: 3,
          maxLength: 100,
          required: true
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Feature Description',
          minLength: 3,
          maxLength: 200,
          required: true
        }
      ]
    },
    {
      name: 'locations_link',
      type: 'group',
      label: 'Locations Link Details',
      fields: ActionLinkFields
    }
  ]
}

export default OverviewFields
