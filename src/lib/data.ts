import 'server-only'

import { getPayload, Where } from 'payload'
import config from '@payload-config'
import { Guesthouse, HomePage } from '@/payload/payload-types'

export async function fetchHomePageData(
  field: string
): Promise<Partial<HomePage>> {
  const payload = await getPayload({ config })
  const res = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
      [field]: true
    }
  })
  if (!res) {
    throw new Error('Failed to fetch home page data')
  }
  return res as Partial<HomePage>
}

export const getGuestHouses = async (query?: Where): Promise<Guesthouse[]> => {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'guesthouses',
    depth: 2,
    pagination: false,
    sort: '-name',
    where: query || {}
  })
  if (!res) {
    throw new Error('Failed to fetch guesthouse page data')
  }
  return res.docs
}
