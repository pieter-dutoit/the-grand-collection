import { Field } from 'payload'

export const GuesthouseContentFields: Field[] = [
  {
    name: 'heading',
    type: 'text',
    label:
      'Page Heading (About 50 to 70 characters for best SEO results). For example: "Discover the Paarl Grand: A Luxurious Escape in the Heart of Wine Country"',
    required: true,
    maxLength: 100,
    minLength: 20,
    unique: true
  },
  {
    name: 'description',
    label:
      'Guesthouse Description (Property overview, ideally about 30 to 50 words).',
    type: 'textarea',
    required: true,
    minLength: 50,
    maxLength: 1000
  },
  {
    name: 'general_amenities',
    label: 'General Amenities',
    type: 'relationship',
    relationTo: 'amenities',
    hasMany: true,
    required: true,
    minRows: 1,
    maxRows: 100
  },
  {
    name: 'gallery',
    type: 'group',
    label: 'Gallery',
    fields: [
      {
        name: 'heading',
        label: 'Gallery Heading',
        type: 'text',
        required: true,
        minLength: 3,
        maxLength: 100
      },
      {
        name: 'description',
        label: 'Gallery Description',
        type: 'textarea',
        required: true,
        minLength: 3,
        maxLength: 1000
      }
    ]
  },
  {
    name: 'images',
    type: 'group',
    label: 'Images',
    fields: [
      {
        name: 'background_image',
        label: 'Background / Hero Image',
        type: 'upload',
        relationTo: 'media',
        required: true
      },
      {
        name: 'exterior',
        label: 'Exterior Gallery (3 or more images)',
        type: 'upload',
        required: true,
        relationTo: 'media',
        hasMany: true,
        minRows: 3,
        maxRows: 10
      },
      {
        name: 'interior',
        label: 'Interior Gallery (3 or more images)',
        type: 'upload',
        required: true,
        relationTo: 'media',
        hasMany: true,
        minRows: 3,
        maxRows: 10
      }
    ]
  }
]

export default GuesthouseContentFields
