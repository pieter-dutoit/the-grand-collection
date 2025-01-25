import 'server-only'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getGuestHouses } from '@/lib/data'
import { Guesthouse } from '@/payload/payload-types'
import createMetadataConfig from '@/lib/utils/create-metadata-object'

import Hero from './components/hero'
import Navbar from './components/navbar'
import Gallery from './components/gallery'
import Amenities from './components/amenities'
import Rooms from './components/rooms'
import ContactUs from './components/contact-us'

type Props = { params: Promise<{ guesthouse: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guesthouse: slug } = await params
  const res: Guesthouse[] = await getGuestHouses({ slug: { equals: slug } })
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
  const guesthouses = await getGuestHouses()

  if (!guesthouses) {
    return []
  }

  return guesthouses.map((guesthouse) => ({
    guesthouse: guesthouse.slug,
    ...guesthouse
  }))
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
  const { guesthouse: slug } = await params

  const res: Guesthouse[] = await getGuestHouses({ slug: { equals: slug } })
  const [data] = res

  if (!data) {
    notFound()
  }

  return (
    <>
      <Hero guesthouse={data} />
      <Navbar />
      <Gallery data={data} />
      <Amenities data={data} />
      <Rooms data={data} />
      <ContactUs data={data} />
    </>
  )
}

export const dynamicParams = true
export const revalidate = false
