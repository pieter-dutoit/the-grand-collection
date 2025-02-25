import { CollectionBeforeChangeHook } from 'payload'
import createSlug from '../../utils/create-slug'

const createCollectionSlug: CollectionBeforeChangeHook = async ({ data }) => {
  return {
    ...data,
    slug: createSlug(data.name)
  }
}

export default createCollectionSlug
