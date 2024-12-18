import type { CollectionConfig } from 'payload'
import { DEFAULT_COLLECTION_ACCESS } from '../access/default-config'

export const ContactPersons: CollectionConfig = {
  slug: 'contact-persons',
  labels: {
    singular: 'Contact Person',
    plural: 'Contact Persons'
  },
  admin: {
    useAsTitle: 'name'
  },
  access: DEFAULT_COLLECTION_ACCESS,
  fields: [
    {
      name: 'name',
      label: 'Contact Person Full Name',
      type: 'text',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      required: true
    },
    {
      name: 'position',
      label: 'Position / Title',
      type: 'text',
      required: true
    }
  ]
}
