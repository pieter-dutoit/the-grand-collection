import type { Block } from 'payload'

import {
  validateGoogleMapsEmbedUrl,
  validateGoogleMapsLink
} from '../utils/validation'

export const GoogleMapBlock: Block = {
  slug: 'googleMap',
  interfaceName: 'GoogleMapBlock',
  labels: {
    singular: 'Google Map',
    plural: 'Google Maps'
  },
  fields: [
    {
      name: 'title',
      label: 'Title (Optional)',
      type: 'text'
    },
    {
      name: 'maps_embed_url',
      label:
        'Maps Embed URL (format: https://www.google.com/maps/embed?pb=!1m18...)',
      type: 'text',
      required: true,
      validate: validateGoogleMapsEmbedUrl
    },
    {
      name: 'maps_link',
      label: 'Maps Link (Optional, format: https://maps.app.goo.gl/xxxx)',
      type: 'text',
      validate: validateGoogleMapsLink
    }
  ]
}
