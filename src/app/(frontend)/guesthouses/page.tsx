import { Metadata } from 'next'

import { fetchGuesthousesPageData, getGuestHouses } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-object'

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

  const guesthouses = await getGuestHouses()

  const { heading, sub_heading } = content

  return (
    <section className='w-full bg-white'>
      <div className='container mx-auto py-10 lg:py-16'>
        <h1 className='text-center text-3xl font-semibold text-gold-700 lg:text-4xl xl:text-5xl'>
          {heading}
        </h1>

        <h2 className='my-6 text-center text-base text-olive-500 md:text-xl'>
          {sub_heading}
        </h2>

        {!!guesthouses && (
          <ul className='mt-10 flex flex-col gap-8 lg:mt-16'>
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
      </div>
    </section>
  )
}
