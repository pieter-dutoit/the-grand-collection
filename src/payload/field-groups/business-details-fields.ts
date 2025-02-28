import { Field } from 'payload'

const BusinessDetailsFields: Field[] = [
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
  },
  {
    type: 'group',
    name: 'geo',
    label: 'Geolocation (Match Google Maps)',
    fields: [
      {
        name: 'latitude',
        label: 'Latitude',
        type: 'text',
        required: true
      },
      {
        name: 'longitude',
        label: 'Longitude',
        type: 'text',
        required: true
      },
      {
        name: 'maps_link',
        label: 'Maps Link (format: https://maps.app.goo.gl/xxxxxxxxxxxx)',
        type: 'text',
        required: true
      },
      {
        name: 'maps_embed_url',
        label:
          'Maps Embed (format: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1dxxxxxxxxxxxx)',
        type: 'text',
        required: true
      }
    ]
  }
  // {
  //   name: 'policies',
  //   label: 'Policies',
  //   type: 'group',
  //   fields: [
  //     {
  //       name: 'check_in_age_required',
  //       label: 'Check-In Age Required (Optional)',
  //       type: 'number',
  //       defaultValue: 0
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'free_breakfast',
  //       label: 'Free Breakfast',
  //       defaultValue: true
  //     },
  //     {
  //       name: 'laundry_service',
  //       label: 'Laundry Service',
  //       type: 'checkbox',
  //       defaultValue: true
  //     },

  //     {
  //       type: 'checkbox',
  //       name: 'kids_alllowed',
  //       label: 'Kids Allowed',
  //       defaultValue: true
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'extra_beds',
  //       label: 'Extra Beds Available',
  //       defaultValue: true
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'pets_allowed',
  //       label: 'Pets Allowed',
  //       defaultValue: false
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'smoking_allowed',
  //       label: 'Smoking Allowed',
  //       defaultValue: false
  //     },
  //     {
  //       type: 'checkbox',
  //       name: 'events_allowed',
  //       label: 'Events Allowed',
  //       defaultValue: false
  //     },
  //     {
  //       type: 'group',
  //       name: 'quiet_hours',
  //       label: 'Quiet Hours',
  //       fields: [
  //         {
  //           name: 'enabled',
  //           label: 'Enabled',
  //           type: 'checkbox',
  //           defaultValue: false
  //         },
  //         {
  //           name: 'start',
  //           label: 'Start',
  //           type: 'select',
  //           options: [
  //             { label: '20:00', value: '20:00' },
  //             { label: '21:00', value: '21:00' },
  //             { label: '22:00', value: '22:00' },
  //             { label: '23:00', value: '23:00' },
  //             { label: '00:00', value: '00:00' }
  //           ]
  //         },
  //         {
  //           name: 'end',
  //           label: 'End',
  //           type: 'select',
  //           options: [
  //             { label: '06:00', value: '06:00' },
  //             { label: '07:00', value: '07:00' },
  //             { label: '08:00', value: '08:00' },
  //             { label: '09:00', value: '09:00' },
  //             { label: '10:00', value: '10:00' }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: 'cancelation_policy',
  //       label: 'Cancelation Policy',
  //       type: 'textarea'
  //     }
  //   ]
  // }
]

export default BusinessDetailsFields
