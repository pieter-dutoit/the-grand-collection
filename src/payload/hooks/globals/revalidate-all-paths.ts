import { revalidatePath } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

const revalidateAllPaths: GlobalAfterChangeHook = async ({ doc }) => {
  try {
    revalidatePath('/(frontend)', 'layout')
  } catch (error) {
    console.error(error)
  }
  return doc
}

export default revalidateAllPaths
