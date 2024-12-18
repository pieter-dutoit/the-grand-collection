import { GroupField } from 'payload'

import { validatePostalCode } from '../utils/validation'

const Address: GroupField = {
  name: 'address',
  label: 'Address',
  type: 'group',
  fields: [
    {
      name: 'street',
      type: 'text',
      label: 'Street',
      required: true
    },
    {
      name: 'suburb',
      type: 'text',
      label: 'Suburb',
      required: true
    },
    {
      name: 'city',
      type: 'text',
      label: 'City',
      required: true
    },
    {
      name: 'province',
      type: 'select',
      label: 'Select Province',
      required: true,
      options: [
        { label: 'Eastern Cape', value: 'Eastern Cape' },
        { label: 'Free State', value: 'Free State' },
        { label: 'Gauteng', value: 'Gauteng' },
        { label: 'KwaZulu-Natal', value: 'KwaZulu-Natal' },
        { label: 'Limpopo', value: 'Limpopo' },
        { label: 'Mpumalanga', value: 'Mpumalanga' },
        { label: 'Northern Cape', value: 'Northern Cape' },
        { label: 'North West', value: 'North West' },
        { label: 'Western Cape', value: 'Western Cape' }
      ]
    },
    {
      name: 'postalCode',
      type: 'text',
      label: 'Postal Code',
      required: true,
      validate: validatePostalCode
    }
  ]
}

export default Address
