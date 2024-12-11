import { CollectionBeforeChangeHook } from 'payload'

const beforeGuesthouseSave: CollectionBeforeChangeHook = async ({ data }) => {
  return {
    ...data,
    slug: data.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }
}

export default beforeGuesthouseSave
