import { Metadata } from 'next'

import { fetchGuesthousesPageData, fetchGuestHouses } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-object'
import {
  createBreadCrumbs,
  getGuesthouseListStructure
} from '@/lib/utils/create-structured-data'

import PageHeading from '@/components/ui/page-heading'

import PropertyPreview from '../components/property-preview'

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await fetchGuesthousesPageData('seo')
  if (!seo) return {}
  return createMetadataConfig({
    ...seo,
    twitter: seo.twitter || {}
  })
}

export default async function AllGuestHouses(): Promise<JSX.Element> {
  const { content } = await fetchGuesthousesPageData('content')
  if (!content) return <></>
  const { heading, sub_heading } = content

  const guesthouses = await fetchGuestHouses()

  const guesthouseListStructuredData = await getGuesthouseListStructure()
  const jsonLd = [
    guesthouseListStructuredData,
    createBreadCrumbs([
      {
        name: 'All Guesthouses',
        item: '/guesthouses'
      }
    ])
  ]

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className='container mx-auto grid w-full px-8 py-10 lg:py-20'>
        <PageHeading heading={heading} subHeading={sub_heading} />
        {!!guesthouses && (
          <ul className='mt-4 flex flex-col gap-8 lg:mt-8'>
            {guesthouses.map((guesthouse) => {
              return (
                <PropertyPreview
                  key={guesthouse.slug}
                  guesthouse={guesthouse}
                />
              )
            })}
          </ul>
        )}
      </section>
    </>
  )
}
