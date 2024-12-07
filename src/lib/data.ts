import 'server-only'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function fetchHomePageData(field: string) {
  const payload = await getPayload({ config })
  const res = await payload.findGlobal({
    slug: 'home-page',
    select: {
      [field]: true
    }
  })
  return res
}
