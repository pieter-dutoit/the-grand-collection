import Image from 'next/image'

import { Guesthouse } from '@/payload/payload-types'
import { fetchHomePageData } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

import ScrollAnchor from './scroll-anchor'

function PropertyPreview({
  guesthouse,
  alignment = 'start'
}: {
  guesthouse: Guesthouse
  alignment: string
}): JSX.Element {
  const alignmentClass = alignment === 'start' ? 'self-start' : 'self-end'

  const {
    name,
    slug,
    content: { gallery }
  } = guesthouse

  return (
    <div className={`flex flex-col gap-4 ${alignmentClass}`}>
      <div className='grid grid-cols-3'>
        {gallery.map((image) => {
          const { alt, url } = extractImageProps(image)
          return (
            <div className='relative size-20' key={url}>
              <Image
                src={url}
                alt={alt}
                fill
                className='object-cover object-center'
              />
            </div>
          )
        })}
      </div>
      <div>
        <h3>{name}</h3>
        <a href={`guesthouses/${slug}`}>{name}</a>
      </div>
    </div>
  )
}

export default async function Properties(): Promise<JSX.Element> {
  const { featured_guesthouses } = await fetchHomePageData(
    'featured_guesthouses'
  )

  return (
    <section className='relative w-full'>
      <ScrollAnchor id='properties' />
      <div className='container mx-auto py-8'>
        <h2 className='whitespace-normal text-center text-3xl font-light capitalize text-gold-700 sm:text-3xl md:whitespace-pre-wrap md:leading-tight lg:text-4xl lg:leading-tight'>
          Discover Unique Stays
        </h2>
        <p className='text-base'>
          <em>View Our Featured Guesthouses</em>
        </p>
        <div className='flex flex-col gap-5'>
          {featured_guesthouses?.map((guesthouse, index) => {
            if (typeof guesthouse === 'string') return null
            return (
              <PropertyPreview
                key={guesthouse.slug + '-' + index}
                guesthouse={guesthouse}
                alignment={index % 2 === 0 ? 'start' : 'end'}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
