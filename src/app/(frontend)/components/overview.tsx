import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { Home } from 'lucide-react'

import Image from 'next/image'
import { getButtonStyles } from '@/components/ui/button'

import { fetchHomePageData } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

export default async function Overview(): Promise<JSX.Element> {
  const data = await fetchHomePageData('overview')

  if (!data?.overview) return <></>

  const {
    overview: {
      heading,
      description,
      features = [],
      images = [],
      locations_link
    }
  } = data

  return (
    <section className='relative w-full'>
      <div id='overview' className='absolute -top-16' />
      <div className='container mx-auto py-8 lg:py-16'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <h2 className='max-w-72 whitespace-normal text-5xl font-light capitalize text-gold-700 sm:max-w-full sm:text-5xl md:max-w-96 md:whitespace-pre-wrap md:leading-tight lg:text-6xl lg:leading-tight'>
            {heading}
          </h2>

          {/* Q2  */}
          <p className='text-justify text-lg font-light leading-normal tracking-wide text-olive-700 lg:leading-loose'>
            {description}
          </p>

          {/* Q3 */}
          <div className='h-fit w-full place-self-center'>
            <ul className='my-auto grid h-fit grid-cols-2 gap-2'>
              {images.map((image, index) => {
                const { url, alt } = extractImageProps(image)
                const { classes, sizes } =
                  index === 0
                    ? {
                        classes: 'col-span-2 aspect-[3/1]',
                        sizes:
                          '(max-width: 768px) 85vw, (max-width: 1024px) 21rem, 27rem'
                      }
                    : {
                        classes: 'col-span-1 aspect-[2/1]',
                        sizes:
                          '(max-width: 768px) 40vw, (max-width: 1024px) 10rem, 13rem'
                      }

                return (
                  <li
                    key={url}
                    className={twMerge(
                      classes,
                      'relative overflow-hidden rounded-lg border-2 border-gold-300 bg-olive-300'
                    )}
                  >
                    <Image
                      fill
                      className='object-cover object-center'
                      src={url}
                      alt={alt}
                      sizes={sizes}
                    />
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Q4 */}
          <ul className='flex flex-col items-center justify-center text-center'>
            {features.map(({ title, description }) => {
              return (
                <li key={title} className='mb-3'>
                  <h3 className='text-xl font-semibold text-olive-600 md:text-2xl'>
                    {title}
                  </h3>
                  <p className='mt-2 text-base font-light'>{description}</p>
                </li>
              )
            })}
            <li>
              <Link
                className={twMerge(
                  getButtonStyles({
                    variant: 'outline',
                    colour: 'gold',
                    size: 'lg'
                  }),
                  'mt-2 flex flex-row items-center'
                )}
                href={locations_link?.link_url ?? '#'}
              >
                <Home />
                {locations_link?.link_text}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
