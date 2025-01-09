import 'server-only'

import { notFound } from 'next/navigation'

import { getGuestHouses } from '@/lib/data'
import { Guesthouse } from '@/payload/payload-types'

import Hero from './components/hero'
import Navbar from './components/navbar'
import Gallery from './components/gallery'
import Amenities from './components/amenities'
import { Rooms } from './components/rooms'
import ContactUs from './components/contact-us'

type Params = Promise<{ guesthouse: string }>

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

export default async function ThePaarlGrand({
  params
}: {
  params: Params
}): Promise<JSX.Element> {
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
