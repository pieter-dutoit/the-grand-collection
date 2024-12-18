import { fetchHomePageData } from '@/lib/data'

import PropertyPreview from './property-preview'

export default async function Properties(): Promise<JSX.Element> {
  const { featured } = await fetchHomePageData('featured')
  if (!featured) return <></>

  const { heading, subheading, guesthouses } = featured

  return (
    <section className='relative w-full'>
      <div id='locations' className='absolute -top-16' />
      <div className='container mx-auto py-8'>
        <h2 className='whitespace-normal text-center text-4xl font-light capitalize text-gold-700 sm:text-5xl md:whitespace-pre-wrap md:leading-tight lg:text-6xl'>
          {heading}
        </h2>
        <h3 className='mt-6 text-center text-xl font-light sm:text-2xl'>
          {subheading}
        </h3>
        <div className='my-8 flex flex-col gap-12'>
          {guesthouses?.map((guesthouse, index) => {
            if (typeof guesthouse === 'string') return null
            return (
              <PropertyPreview
                key={guesthouse.slug + '-' + index}
                guesthouse={guesthouse}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
