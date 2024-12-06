import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import ScrollAnchor from '@/ui/scroll-anchor'
import { buttonVariants } from '@/components/ui/button'

import { fetchHomePageData } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

export default async function Overview(): Promise<JSX.Element> {
  const data = await fetchHomePageData('overview')
  const {
    overview: {
      heading,
      description,
      features = [],
      images = [],
      cta_locations
    }
  } = data

  return (
    <section className='relative w-full'>
      <ScrollAnchor id='overview' />
      <div className='mx-auto max-w-screen-lg p-6 md:py-16'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <h2 className='whitespace-normal text-4xl font-light capitalize sm:text-5xl md:whitespace-pre-wrap md:leading-tight lg:text-6xl lg:leading-tight'>
            {heading}
          </h2>
          <p className='text-justify text-lg font-light leading-normal tracking-wide lg:leading-loose'>
            {description}
          </p>

          <div className='h-fit w-full place-self-center'>
            <ul className='my-auto grid h-fit grid-cols-2 gap-4'>
              {images.map((image, index) => {
                const { url, alt } = extractImageProps(image)
                const { classes, sizes } =
                  index === 0
                    ? {
                        classes:
                          'relative col-span-2 aspect-[3/1] overflow-hidden rounded-md',
                        sizes:
                          '(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30rem'
                      }
                    : {
                        classes:
                          'relative col-span-1 aspect-[2/1] overflow-hidden rounded-md',
                        sizes:
                          '(max-width: 768px) 45vw, (max-width: 1024px) 20vw, 15rem'
                      }

                return (
                  <li key={url} className={classes}>
                    <Image
                      fill
                      className={twMerge(classes, 'object-cover object-center')}
                      src={url}
                      alt={alt}
                      sizes={sizes}
                    />
                  </li>
                )
              })}
            </ul>
          </div>

          <ul className='flex flex-col items-center justify-center text-center'>
            {features.map(({ title, description }) => {
              return (
                <li key={title} className='mb-3'>
                  <h3 className='text-2xl font-semibold'>{title}</h3>
                  <p className='mt-2 text-base font-light'>{description}</p>
                </li>
              )
            })}
            <li>
              <Link
                className={twMerge(
                  buttonVariants({ variant: 'outline' }),
                  'mt-2 flex flex-row items-center'
                )}
                href={cta_locations.cta_link}
              >
                {cta_locations.cta_text}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
