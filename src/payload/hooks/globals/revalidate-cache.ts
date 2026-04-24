import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'

const revalidateCache =
  (cacheTagName: string): GlobalAfterChangeHook =>
  async ({ doc }) => {
    if (doc._status === 'published') {
      revalidateTag(cacheTagName, 'max')
    }
    return doc
  }

export default revalidateCache
