import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'

import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import SEOFields from '../field-groups/seo'
import createArticleSlug from '../hooks/collections/create-article-slug'
import revalidateCache from '../hooks/collections/revalidate-cache'
import { GoogleMapBlock } from '../blocks/google-map'

const hasFieldValue = (value: unknown) =>
  value !== null && value !== undefined && value !== ''

const getRelationValue = (
  fieldName: string,
  data: Record<string, unknown>,
  originalDoc?: Record<string, unknown>
) => {
  if (Object.prototype.hasOwnProperty.call(data, fieldName)) {
    return data[fieldName]
  }

  return originalDoc?.[fieldName]
}

const validateArticleRouting: CollectionBeforeValidateHook = ({
  data,
  originalDoc
}) => {
  if (!data) {
    return data
  }

  const original = originalDoc as Record<string, unknown> | undefined
  const type = String(data.type ?? original?.type ?? 'guide')
  const destination = getRelationValue('destination', data, original)
  const guesthouse = getRelationValue('guesthouse', data, original)
  const section = getRelationValue('section', data, original)

  if (type === 'guide' && !hasFieldValue(destination)) {
    throw new Error('Guide articles must be linked to a destination.')
  }

  if (type === 'guesthouse_post') {
    if (!hasFieldValue(guesthouse)) {
      throw new Error('Guesthouse posts must be linked to a guesthouse.')
    }

    if (!hasFieldValue(section)) {
      throw new Error('Guesthouse posts must be linked to an article section.')
    }
  }

  return data
}

export const Articles: CollectionConfig = {
  slug: 'articles',
  hooks: {
    beforeValidate: [validateArticleRouting],
    beforeChange: [createArticleSlug],
    afterChange: [revalidateCache('articles', true)]
  },
  admin: {
    useAsTitle: 'title'
  },
  versions: {
    drafts: true
  },
  fields: [
    {
      name: 'slug',
      label: 'Article Slug / URL (Auto Generated)',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'destination',
      label: 'Destination',
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: false,
      index: true,
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) =>
          !siblingData.type || siblingData.type === 'guide'
      }
    },
    {
      name: 'guesthouse',
      label: 'Guesthouse',
      type: 'relationship',
      relationTo: 'guesthouses',
      hasMany: false,
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData.type === 'guesthouse_post'
      }
    },
    {
      name: 'section',
      label: 'Section',
      type: 'relationship',
      relationTo: 'article-sections',
      hasMany: false,
      index: true,
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData.type === 'guesthouse_post'
      }
    },
    {
      name: 'faq',
      label: 'FAQ Section',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: false,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'featured',
      label: 'Featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'categories',
      label: 'Categories',
      type: 'relationship',
      relationTo: 'article-categories',
      hasMany: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      required: true,
      defaultValue: 'guide',
      options: [
        {
          label: 'Guide',
          value: 'guide'
        },
        {
          label: 'Guesthouse Post',
          value: 'guesthouse_post'
        }
      ],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text',
      unique: false,
      required: true,
      defaultValue: 'The Grand Collection',
      admin: {
        position: 'sidebar'
      }
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'thumbnail',
              label: 'Thumbnail',
              type: 'upload',
              relationTo: 'media',
              hasMany: false,
              required: true
            },
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              minLength: 1,
              maxLength: 200
            },
            {
              name: 'excerpt',
              type: 'text',
              label: 'Excerpt',
              required: true,
              minLength: 10,
              maxLength: 500
            },
            {
              name: 'body',
              type: 'richText',
              label: 'Content',
              required: true,
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  BlocksFeature({
                    blocks: [GoogleMapBlock]
                  })
                ]
              })
            }
          ]
        },
        {
          name: 'seo',
          label: 'SEO',
          fields: SEOFields
        }
      ]
    }
  ]
}
