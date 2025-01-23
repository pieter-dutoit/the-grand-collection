import type { ArrayField, CollectionConfig, GroupField } from 'payload'

import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

import { validateSlugFriendly } from '../utils/validation'

const BedCount: ArrayField = {
  name: 'bed_count',
  label: 'Number of Beds',
  type: 'array',
  required: true,
  minRows: 1,
  maxRows: 10,
  fields: [
    {
      name: 'bed',
      label: 'Type of Bed',
      type: 'relationship',
      relationTo: 'beds',
      hasMany: false,
      required: true,
      unique: true
    },
    {
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
      required: true,
      defaultValue: 1,
      min: 1,
      max: 10
    }
  ]
}

const RoomDetails: GroupField = {
  name: 'details',
  label: 'Room Details',
  type: 'group',
  fields: [
    {
      name: 'sleeps_adults',
      label: 'Sleeps (Adults)',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      max: 10
    },
    {
      name: 'sleeps_children',
      label: 'Sleeps (Children)',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      max: 10
    },
    BedCount
  ]
}

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  admin: {
    useAsTitle: 'name'
  },
  access: DEFAULT_COLLECTION_ACCESS,
  fields: [
    {
      name: 'name',
      label: 'Room Name',
      type: 'text',
      minLength: 3,
      maxLength: 100,
      unique: true,
      required: true,
      validate: validateSlugFriendly
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      minLength: 3,
      maxLength: 1000
    },
    RoomDetails,
    {
      name: 'amenities',
      label: 'Amenities',
      type: 'relationship',
      relationTo: 'amenities',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 100
    },
    {
      name: 'gallery',
      label: 'Gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true
    }
  ]
}
