'use server'
import 'server-only'

import { unstable_cache } from 'next/cache'
import { getPayload, Where } from 'payload'
import config from '@payload-config'

import {
  Guesthouse,
  AllGuesthousesPage,
  HomePage,
  Logo,
  AboutUsPage
} from '@/payload/payload-types'

type HomePageData = Partial<HomePage>

export const fetchHomePageData = unstable_cache(
  async (field: string): Promise<HomePageData> => {
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
  },
  [],
  { revalidate: false, tags: ['home-page', 'guesthouses'] }
)

type AboutPageData = Partial<AboutUsPage>

export const fetchAboutPageData = unstable_cache(
  async (field: string): Promise<AboutPageData> => {
    const payload = await getPayload({ config })
    const res = await payload.findGlobal({
      slug: 'about-us-page',
      depth: 2,
      select: {
        [field]: true
      }
    })
    if (!res) {
      throw new Error(`Failed to fetch about page ${field} data`)
    }
    return res
  },
  [],
  { revalidate: false, tags: ['about-us-page'] }
)

type GuesthousePageData = Partial<AllGuesthousesPage>

export const fetchGuesthousesPageData = unstable_cache(
  async (field: string): Promise<GuesthousePageData> => {
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
  },
  [],
  { revalidate: false, tags: ['all-guesthouses-page', 'guesthouses'] }
)

type LogoData = Partial<Logo>

export const getLogo = unstable_cache(
  async (variant: string): Promise<LogoData> => {
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
  },
  [],
  { revalidate: false, tags: ['logos'] }
)

export const getGuestHouses = unstable_cache(
  async (query?: Where): Promise<Guesthouse[]> => {
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
  },
  [],
  { revalidate: false, tags: ['guesthouses'] }
)
