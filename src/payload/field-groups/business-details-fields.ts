import { Field } from 'payload'

export const BusinessDetailsFields: Field[] = [
  {
    type: 'group',
    label: 'Business Hours',
    name: 'hours',
    fields: [
      {
        name: 'opening_time',
        label: 'Opening Time',
        type: 'select',
        options: [
          { label: '24/7', value: '00:00' },
          { label: '6:00 AM', value: '06:00' },
          { label: '7:00 AM', value: '07:00' },
          { label: '8:00 AM', value: '08:00' },
          { label: '9:00 AM', value: '09:00' },
          { label: '10:00 AM', value: '10:00' }
        ],
        required: true
      },
      {
        name: 'closing_time',
        label: 'Closing Time',
        type: 'select',
        options: [
          { label: '24/7', value: '23:59' },
          { label: '6:00 PM', value: '18:00' },
          { label: '7:00 PM', value: '19:00' },
          { label: '8:00 PM', value: '20:00' },
          { label: '9:00 PM', value: '21:00' },
          { label: '10:00 PM', value: '22:00' }
        ],
        required: true
      }
    ]
  },
  {
    type: 'group',
    name: 'check_in_out',
    label: 'Check In & Check Out',
    fields: [
      {
        name: 'check_in_time',
        label: 'Check-In Time',
        type: 'select',
        options: [
          { label: '12:00 PM', value: 'T12:00:00+02:00' },
          { label: '1:00 PM', value: 'T13:00:00+02:00' },
          { label: '2:00 PM', value: 'T14:00:00+02:00' },
          { label: '3:00 PM', value: 'T15:00:00+02:00' },
          { label: '4:00 PM', value: 'T16:00:00+02:00' }
        ],
        required: true
      },
      {
        name: 'check_out_time',
        label: 'Check-Out Time',
        type: 'select',
        options: [
          { label: '10:00 AM', value: 'T10:00:00+02:00' },
          { label: '11:00 AM', value: 'T11:00:00+02:00' },
          { label: '12:00 PM', value: 'T12:00:00+02:00' },
          { label: '1:00 PM', value: 'T13:00:00+02:00' },
          { label: '2:00 PM', value: 'T14:00:00+02:00' }
        ],
        required: true
      }
    ]
  }
]
