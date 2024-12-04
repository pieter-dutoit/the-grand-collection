import { GroupField } from 'payload';

const OverviewFields: GroupField = {
  name: 'overview',
  label: 'Overview Section',
  type: 'group',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading (H2: Ideally 20 to 60 characters for SEO)',
      required: true
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 500,
      minLength: 50,
      label: 'Description (Ideally 50 to 300 characters for SEO)',
      required: true
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Select 3 Images',
      validate: (value) => {
        if (!value || value.length !== 3) {
          return 'You must select exactly 3 images.';
        }
        return true;
      }
    }
  ]
};

export default OverviewFields;
