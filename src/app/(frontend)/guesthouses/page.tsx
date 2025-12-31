import { Metadata } from 'next'

import { fetchGuesthousesPageData, fetchGuestHouses } from '@/lib/data'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import createMetadataConfig from '@/lib/utils/create-metadata-object'
import { getGuesthouseListStructure } from '@/lib/utils/create-structured-data'
import {
  createBreadcrumbListStructuredData,
  getGuesthousesBreadcrumbs
} from '@/lib/utils/breadcrumbs'

import PageHeading from '@/components/ui/page-heading'
import JsonLd from '@/components/seo/json-ld'

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
  const breadcrumbs = getGuesthousesBreadcrumbs()

  const guesthouseListStructuredData = await getGuesthouseListStructure()
  const jsonLd = [
    guesthouseListStructuredData,
    createBreadcrumbListStructuredData(breadcrumbs)
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className='container mx-auto grid w-full px-8 py-10 lg:py-20'>
        <Breadcrumbs items={breadcrumbs} className='mb-6' />
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
