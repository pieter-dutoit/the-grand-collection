import { GroupField } from 'payload'

const FeaturedPropertiesFields: GroupField = {
  name: 'featured',
  label: 'Featured Properties',
  type: 'group',
  fields: [
    {
      name: 'heading',
      label: 'Section Heading',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100,
      defaultValue: 'Featured Properties'
    },
    {
      name: 'subheading',
      label: 'Section Subheading',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100,
      defaultValue: 'Discover unique stays'
    },
    {
      name: 'guesthouses',
      label: 'Featured Guesthouses',
      type: 'relationship',
      relationTo: 'guesthouses',
      filterOptions: {
        _status: {
          equals: 'published'
        }
      },
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 4
    }
  ]
}

export default FeaturedPropertiesFields
