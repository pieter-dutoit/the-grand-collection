import { CollectionBeforeChangeHook } from 'payload'
import createSlug from '../../utils/create-slug'

const createGuesthouseSlug: CollectionBeforeChangeHook = async ({ data }) => {
  return {
    ...data,
    slug: createSlug(data.name)
  }
}

export default createGuesthouseSlug
