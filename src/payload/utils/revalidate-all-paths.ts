import { revalidatePath } from 'next/cache'

const revalidateAllPaths = async () => {
  'use server'
  try {
    revalidatePath('/(frontend)', 'layout')
  } catch (error) {
    console.error(error)
  }
}

export default revalidateAllPaths
