import { GroupField } from 'payload'

const MetadataField: GroupField = {
  interfaceName: 'MetadataField',
  name: 'meta',
  label: 'Meta Fields (For SEO optimisation)',
  type: 'group',
  fields: [
    {
      name: 'title',
      label:
        'Page Title (Shows in the browser tab and search results) (Up to 70 characters)',
      type: 'text',
      minLength: 5,
      maxLength: 70,
      required: true
    },
    {
      name: 'description',
      label:
        'Description (Shows in search results) (Ideally 100 to 200 characters)',
      type: 'textarea',
      required: true,
      minLength: 70,
      maxLength: 200
    }
  ]
}

const OpenGraphField: GroupField = {
  interfaceName: 'OpenGraphField',
  name: 'open_graph',
  label: 'Open Graph Fields (How shared links appear on social media)',
  type: 'group',
  fields: [
    {
      name: 'site_name',
      label: 'Site Name (Up to 200 characters)',
      type: 'text',
      minLength: 5,
      maxLength: 200,
      required: true
    },
    {
      name: 'title',
      label: 'Title (Up to 70 characters)',
      type: 'text',
      minLength: 5,
      maxLength: 70,
      required: true
    },
    {
      name: 'description',
      label: 'Description (Ideally 100 to 200 characters)',
      type: 'textarea',
      required: true,
      minLength: 70,
      maxLength: 200
    },
    {
      name: 'image',
      label: 'Image (Automatically cropped to 1200 x 630 pixels)',
      type: 'upload',
      relationTo: 'seo-media',
      required: true
    }
  ]
}

const TwitterField: GroupField = {
  interfaceName: 'TwitterField',
  name: 'twitter',
  label: 'Twitter Fields',
  type: 'group',
  fields: [
    {
      name: 'creator',
      label: 'Twitter / X Username (e.g. @username) (Optional)',
      type: 'text',
      minLength: 1,
      maxLength: 200
    },
    {
      name: 'creatorId',
      label: 'Twitter / X ID (Optional)',
      type: 'text',
      minLength: 5,
      maxLength: 200
    }
  ]
}

const SEOFields = [MetadataField, OpenGraphField, TwitterField]
export default SEOFields
