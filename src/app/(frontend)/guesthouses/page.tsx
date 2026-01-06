import { Metadata } from 'next'

import { fetchGuesthousesPageData, fetchGuestHouses } from '@/lib/data'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import createMetadataConfig from '@/lib/utils/create-metadata-object'
import { getBaseUrl } from '@/lib/utils'
import {
  createPageStructuredData,
  getGuesthouseListStructure
} from '@/lib/utils/create-structured-data'
import { getGuesthousesBreadcrumbs } from '@/lib/utils/breadcrumbs'

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
  const pageUrl = `${getBaseUrl()}/guesthouses`

  const guesthouseListStructuredData = await getGuesthouseListStructure()
  const jsonLd = await createPageStructuredData({
    pageUrl,
    pageType: 'CollectionPage',
    name: heading,
    description: sub_heading,
    breadcrumbs,
    mainEntityId: guesthouseListStructuredData['@id'] as string | undefined,
    additionalNodes: [guesthouseListStructuredData]
  })

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className='container mx-auto pt-3'>
        <Breadcrumbs items={breadcrumbs} />
      </section>
      <section className='container mx-auto grid w-full pb-10 lg:pb-20'>
        <PageHeading heading={heading} subHeading={sub_heading} />
        {!!guesthouses && (
          <ul className='mt-4 flex flex-col gap-8 lg:mt-8'>
            {guesthouses.map((guesthouse) => {
              return (
                <li key={guesthouse.slug}>
                  <PropertyPreview guesthouse={guesthouse} />
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </>
  )
}
