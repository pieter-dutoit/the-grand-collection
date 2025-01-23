import 'server-only'

import { getPayload, Where } from 'payload'
import config from '@payload-config'
import {
  Guesthouse,
  AllGuesthousesPage,
  HomePage,
  Logo
} from '@/payload/payload-types'

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
  return res
}

export async function fetchGuesthousesPageData(
  field: string
): Promise<Partial<AllGuesthousesPage>> {
  const payload = await getPayload({ config })
  const res = await payload.findGlobal({
    slug: 'all-guesthouses-page',
    depth: 2,
    select: {
      [field]: true
    }
  })
  if (!res) {
    throw new Error('Failed to fetch guesthouses page data')
  }
  return res
}

export async function getLogo(variant: string): Promise<Partial<Logo>> {
  const payload = await getPayload({ config })
  const res = await payload.findGlobal({
    slug: 'logos',
    depth: 2,
    select: {
      [variant]: true
    }
  })
  if (!res) {
    throw new Error('Failed to fetch logo data')
  }
  return res
}

export const getGuestHouses = async (query?: Where): Promise<Guesthouse[]> => {
  const payload = await getPayload({ config })
  const res = await payload.find({
    draft: false,
    collection: 'guesthouses',
    depth: 3,
    pagination: false,
    sort: '-name',
    where: {
      ...query,
      _status: {
        equals: 'published'
      }
    }
  })

  if (!res) {
    throw new Error('Failed to fetch guesthouse page data')
  }
  return res.docs
}
