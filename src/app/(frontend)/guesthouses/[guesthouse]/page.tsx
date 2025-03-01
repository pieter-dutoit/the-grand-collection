import 'server-only'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { fetchGuestHouses } from '@/lib/data'
import { Guesthouse } from '@/payload/payload-types'
import createMetadataConfig from '@/lib/utils/create-metadata-object'
import {
  createBreadCrumbs,
  createGuesthouseStructuredData
} from '@/lib/utils/create-structured-data'

import Hero from './components/hero'
import Navbar from './components/navbar'
import Gallery from './components/gallery'
import Amenities from './components/amenities'
import Rooms from './components/rooms'
import ContactUs from './components/contact-us'
import Policies from './components/policies'

type Props = { params: Promise<{ guesthouse: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guesthouse: slug } = await params
  const res: Guesthouse[] = await fetchGuestHouses({ slug: { equals: slug } })
  const [data] = res

  if (!data) {
    return {}
  }

  const { seo } = data
  return createMetadataConfig({
    ...seo,
    twitter: seo.twitter || {}
  })
}

export async function generateStaticParams() {
  const guesthouses = await fetchGuestHouses()

  if (!guesthouses) {
    return []
  }

  return guesthouses.map((guesthouse) => ({
    guesthouse: guesthouse.slug
  }))
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
  const { guesthouse: slug } = await params
  const res: Guesthouse[] = await fetchGuestHouses({ slug: { equals: slug } })
  const [data] = res

  if (!data) {
    notFound()
  }

  const guesthouseStructuredData = await createGuesthouseStructuredData({
    guesthouse: data
  })

  const jsonLd = [
    guesthouseStructuredData,
    createBreadCrumbs([
      {
        name: 'All Guesthouses',
        item: '/guesthouses'
      },
      {
        name: data.name,
        item: '/guesthouses/' + data.slug
      }
    ])
  ]

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero guesthouse={data} />
      <Navbar />
      <Gallery data={data} />
      <Amenities data={data} />
      <Rooms data={data} />
      <Policies data={data} />
      <ContactUs data={data} />
    </>
  )
}

export const dynamicParams = true
export const revalidate = false
