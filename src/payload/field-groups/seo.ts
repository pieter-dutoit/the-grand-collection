import { GroupField } from 'payload'

const SEOGroup: GroupField = {
  name: 'seo',
  label: 'Search Engine Optimisation',
  type: 'group',
  fields: [
    {
      name: 'meta',
      label: 'Meta Title & Description',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Meta Title (Auto generated)',
          type: 'text',
          admin: {
            readOnly: true
          }
        },
        {
          name: 'description',
          label:
            'Meta Description. (About 150 to 160 characters for best SEO results). For example: "The Paarl Grand is a luxurious guesthouse in the heart of wine country, offering a unique blend of modern comfort and old-world charm."',
          type: 'textarea',
          required: true,
          minLength: 70,
          maxLength: 200
        }
      ]
    }
  ]
}

export default SEOGroup
