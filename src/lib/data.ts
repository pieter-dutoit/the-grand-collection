import 'server-only'

import { getPayload } from 'payload'

import config from '@payload-config'
import { HomePage } from '@/payload/payload-types'

export async function fetchHomePageData(
  field: string
): Promise<Partial<HomePage>> {
  const payload = await getPayload({ config })
  const res = await payload.findGlobal({
    slug: 'home-page',
    select: {
      [field]: true
    }
  })
  return res as Partial<HomePage>
}
