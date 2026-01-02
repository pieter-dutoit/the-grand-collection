import { fetchHomePageData } from '@/lib/data'

import SectionHeading from '@/components/section-heading'
import PropertyPreview from './property-preview'

export default async function Properties(): Promise<JSX.Element> {
  const { featured } = await fetchHomePageData('featured')
  if (!featured) return <></>

  const { heading, subheading, guesthouses } = featured

  return (
    <section className='relative w-full'>
      <div id='locations' className='absolute -top-16' />
      <div className='container mx-auto py-8 lg:py-16'>
        <SectionHeading
          title={heading}
          parentLabel={subheading}
          description='Take a look at our featured properties in Paarl and Kathu. Compare photos, check availability, and book a stay that suits your plans.'
        />

        <ul className='my-8 flex flex-col gap-12'>
          {guesthouses?.map((guesthouse, index) => {
            if (typeof guesthouse === 'string') return null
            return (
              <li key={guesthouse.slug + '-' + index}>
                <PropertyPreview guesthouse={guesthouse} />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
