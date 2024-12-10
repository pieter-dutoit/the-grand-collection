import { GroupField } from 'payload'

const BookingPlatform: GroupField = {
  name: 'booking_platform',
  label: 'Booking Platform',
  type: 'group',
  admin: {
    position: 'sidebar'
  },
  fields: [
    {
      name: 'name',
      type: 'select',
      label: 'Select Platform',
      required: true,
      options: [{ label: 'NightsBridge', value: 'NightsBridge' }]
    },
    {
      name: 'url',
      type: 'text',
      label: 'Booking Link URL',
      required: true
    }
  ]
}

export default BookingPlatform
