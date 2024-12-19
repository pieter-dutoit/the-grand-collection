import { CollectionBeforeChangeHook } from 'payload'
import createSlug from '../utils/create-slug'

const beforeGuesthouseSave: CollectionBeforeChangeHook = async ({ data }) => {
  return {
    ...data,
    slug: createSlug(data.name)
  }
}

export default beforeGuesthouseSave
