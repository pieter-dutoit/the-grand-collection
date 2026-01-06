import { CollectionBeforeChangeHook } from 'payload'
import createSlug from '../../utils/create-slug'

const getSlugSource = (data: Record<string, unknown>): string | null => {
  const name = typeof data.name === 'string' ? data.name.trim() : ''
  if (name) {
    return name
  }

  const title = typeof data.title === 'string' ? data.title.trim() : ''
  if (title) {
    return title
  }

  return null
}

const createArticleSlug: CollectionBeforeChangeHook = async ({
  data,
  originalDoc
}) => {
  const hasSlugField = Object.prototype.hasOwnProperty.call(data, 'slug')
  const slugValue = typeof data.slug === 'string' ? data.slug.trim() : ''

  if (slugValue) {
    return data
  }

  if (!hasSlugField) {
    const existingSlug =
      typeof originalDoc?.slug === 'string' ? originalDoc.slug.trim() : ''
    if (existingSlug) {
      return data
    }
  }

  const source = getSlugSource(data)

  if (!source) {
    return data
  }

  return {
    ...data,
    slug: createSlug(source)
  }
}

export default createArticleSlug
