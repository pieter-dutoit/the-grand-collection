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

const createCollectionSlug: CollectionBeforeChangeHook = async ({ data }) => {
  const source = getSlugSource(data)

  if (!source) {
    return data
  }

  return {
    ...data,
    slug: createSlug(source)
  }
}

export default createCollectionSlug
