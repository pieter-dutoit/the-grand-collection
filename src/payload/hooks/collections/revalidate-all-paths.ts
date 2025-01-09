import { revalidatePath } from 'next/cache'
import { CollectionAfterChangeHook } from 'payload'

const revalidateAllPaths: CollectionAfterChangeHook = async ({ doc }) => {
  if (doc._status === 'published') {
    try {
      revalidatePath('/(frontend)', 'layout')
    } catch (error) {
      console.error(error)
    }
  }
  return doc
}

export default revalidateAllPaths
