import type { GroupField } from 'payload';

const HeroFields: GroupField = {
  name: 'hero',
  label: 'Hero/Landing Section',
  type: 'group',
  fields: [
    {
      name: 'background_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Select the Background Image'
    },
    {
      name: 'title',
      type: 'text',
      label: 'Heading (H1: Ideally 20 to 70 characters for SEO)',
      minLength: 20
    }
  ]
};

export default HeroFields;
