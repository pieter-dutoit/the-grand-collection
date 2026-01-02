import 'server-only'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { fetchArticles, fetchGuestHouses } from '@/lib/data'
import { Guesthouse } from '@/payload/payload-types'
import { getBaseUrl } from '@/lib/utils'
import createMetadataConfig from '@/lib/utils/create-metadata-object'
import {
  createFaqStructuredData,
  createGuesthouseStructuredData,
  createPageStructuredData
} from '@/lib/utils/create-structured-data'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { getGuesthouseBreadcrumbs } from '@/lib/utils/breadcrumbs'
import FaqSection from '@/components/faq-section'
import JsonLd from '@/components/seo/json-ld'
import { hasFaqItems } from '@/lib/utils/faq'

import Hero from './components/hero'
import Navbar from './components/navbar'
import Gallery from './components/gallery'
import Amenities from './components/amenities'
import Rooms from './components/rooms'
import ContactUs from './components/contact-us'
import Policies from './components/policies'
import Divider from './components/divider'
import MoreArticlesSection from '@/components/more-articles'

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

  const pageUrl = `${getBaseUrl()}/guesthouses/${data.slug}`
  const guesthouseStructuredData = await createGuesthouseStructuredData({
    guesthouse: data,
    pageUrl
  })

  if (!data.destination || typeof data.destination === 'string') {
    notFound()
  }

  const breadcrumbs = getGuesthouseBreadcrumbs(data.destination, data)
  const faqStructuredData = createFaqStructuredData({
    faq: data.faq,
    pageUrl,
    name: `${data.name} FAQs`
  })
  const jsonLd = await createPageStructuredData({
    pageUrl,
    name: data.name,
    description: data.content.description,
    breadcrumbs,
    mainEntityId: guesthouseStructuredData['@id'],
    additionalNodes: [guesthouseStructuredData, faqStructuredData]
  })
  const hasFaq = hasFaqItems(data.faq)

  const relatedArticles =
    typeof data.destination === 'object' && data.destination !== null
      ? await fetchArticles(
          {
            destination: { equals: data.destination.id }
          },
          {
            sort: ['-featured', '-updatedAt', '-createdAt'],
            limit: 6
          }
        )
      : []

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className='container mx-auto py-4'>
        <Breadcrumbs items={breadcrumbs} />
      </section>
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

      <Divider />

      {data.destination &&
        typeof data.destination !== 'string' &&
        relatedArticles.length > 0 && (
          <MoreArticlesSection
            label='Nearby highlights'
            title={`Things to do near ${data.destination.name}`}
            description='A short list of local favorites, plus a few guides to help you choose what to do.'
            destination={data.destination}
            relatedArticles={relatedArticles}
          />
        )}
    </>
  )
}

export const dynamicParams = true
export const revalidate = false
