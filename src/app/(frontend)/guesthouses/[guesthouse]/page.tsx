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
import FaqSection from '@/components/faq-section'

import Hero from './components/hero'
import Navbar from './components/navbar'
import Gallery from './components/gallery'
import Amenities from './components/amenities'
import Rooms from './components/rooms'
import ContactUs from './components/contact-us'
import Policies from './components/policies'
import Divider from './components/divider'

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
  const hasFaq =
    typeof data.faq === 'object' &&
    data.faq !== null &&
    'items' in data.faq &&
    Array.isArray(data.faq.items) &&
    data.faq.items.length > 0

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero guesthouse={data} />
      <Navbar showFaq={hasFaq} />
      <Rooms data={data} />
      <Amenities data={data} />
      <Gallery data={data} />
      <Divider />
      <ContactUs data={data} />
      <Divider />
      <Policies data={data} />
      <FaqSection
        faq={data.faq}
        parentLabel='Frequently asked questions'
        title={`${data.name} FAQs`}
      />
    </>
  )
}

export const dynamicParams = true
export const revalidate = false
