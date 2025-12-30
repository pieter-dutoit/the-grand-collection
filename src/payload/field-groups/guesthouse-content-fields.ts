import { Field, GroupField } from 'payload'

const Amenities: GroupField = {
  name: 'amenities',
  type: 'group',
  label: 'Amenities',
  fields: [
    {
      name: 'label',
      label: 'Amenities Label',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100
    },
    {
      name: 'heading',
      label: 'Amenities Heading',
      type: 'text',
      minLength: 3,
      maxLength: 100,
      required: true
    },
    {
      name: 'description',
      label: 'Amenities Description',
      type: 'textarea',
      required: true,
      minLength: 3,
      maxLength: 1000
    },
    {
      name: 'background_image',
      label: 'Amenities Background Image',
      type: 'upload',
      relationTo: 'media',
      required: true
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
    }
  ]
}

const Gallery: GroupField = {
  name: 'gallery',
  type: 'group',
  label: 'Gallery',
  fields: [
    {
      name: 'label',
      label: 'Gallery Label',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100
    },
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
}

const Rooms: GroupField = {
  name: 'rooms',
  label: 'Rooms',
  type: 'group',
  fields: [
    {
      name: 'label',
      label: 'Rooms Label',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100
    },
    {
      name: 'heading',
      label: 'Rooms Heading',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100
    },
    {
      name: 'description',
      label: 'Rooms Description',
      type: 'textarea',
      required: true,
      minLength: 3,
      maxLength: 1000
    },
    {
      name: 'people_icon',
      label: 'People Icon',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'rooms',
      label: 'Rooms',
      type: 'relationship',
      relationTo: 'rooms',
      hasMany: true,
      minRows: 1,
      maxRows: 10
    }
  ]
}

const Images: GroupField = {
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

const Policies: GroupField = {
  name: 'policies',
  type: 'group',
  label: 'Policies',
  fields: [
    {
      name: 'label',
      label: 'Policies Label',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100
    },
    {
      name: 'heading',
      label: 'Policies Heading',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100
    },
    {
      name: 'description',
      label: 'Policies Description',
      type: 'textarea',
      required: true,
      minLength: 3,
      maxLength: 1000
    },
    {
      name: 'policies_list',
      label: 'Policies List',
      type: 'relationship',
      relationTo: 'policies',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 50
    }
  ]
}

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
  Rooms,
  Amenities,
  Gallery,
  Images,
  Policies
]

export default GuesthouseContentFields
