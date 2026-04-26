import { revalidateTag } from 'next/cache'
import { CollectionAfterChangeHook } from 'payload'

const revalidateCache =
  (
    cacheTagName: string,
    checkIfPublished: boolean = false
  ): CollectionAfterChangeHook =>
  async ({ doc }) => {
    if (checkIfPublished && doc._status === 'published') {
      revalidateTag(cacheTagName, 'max')
    } else {
      revalidateTag(cacheTagName, 'max')
    }
    return doc
  }

export default revalidateCache
