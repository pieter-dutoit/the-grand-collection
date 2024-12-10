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
        { label: 'Eastern Cape', value: 'eastern-cape' },
        { label: 'Free State', value: 'free-state' },
        { label: 'Gauteng', value: 'gauteng' },
        { label: 'KwaZulu-Natal', value: 'kwazulu-natal' },
        { label: 'Limpopo', value: 'limpopo' },
        { label: 'Mpumalanga', value: 'mpumalanga' },
        { label: 'Northern Cape', value: 'northern-cape' },
        { label: 'North West', value: 'north-west' },
        { label: 'Western Cape', value: 'western-cape' }
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
