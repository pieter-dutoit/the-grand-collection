import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { House } from 'lucide-react'

import Image from '@/components/ui/image'
import { getButtonStyles } from '@/components/ui/button'
import { fetchHomePageData, getLogo } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

export async function Hero(): Promise<JSX.Element> {
  const { hero } = await fetchHomePageData('hero')
  const logo = await getLogo('logo_light')
  const { logo_light } = logo
  const logoProps = extractImageProps(logo_light)

  if (!hero) return <></>

  const { title, background_image, locations_link } = hero
  const { url, alt } = extractImageProps(background_image)

  return (
    <section className='relative h-[75vh] max-h-[40rem] w-screen bg-sage-700 sm:max-h-none'>
      <div className='absolute inset-0 size-full'>
        {url && (
          <Image
            src={url}
            alt={alt}
            className='object-cover object-center'
            fill
            sizes='(max-width: 510px) 90vw, 100vw'
            priority
            portrait
          />
        )}
        <div className='absolute inset-0 bg-custom-gradient-mobile sm:bg-custom-gradient' />
        <div className='absolute inset-0 flex flex-col items-center justify-center p-3'>
          <div className='relative h-[30vh] w-full md:h-52 md:w-96 lg:h-80 lg:w-[500px]'>
            <Image
              src={logoProps.url}
              alt={logoProps.alt}
              fill
              className='object-contain object-center'
              sizes='(max-width: 510px) 90vw, 30rem'
            />
          </div>

          <h1 className='mx-auto mt-8 max-w-screen-lg px-6 text-center text-white drop-shadow-sm md:text-lg lg:text-xl'>
            {title}
          </h1>

          <Link
            className={twMerge(
              getButtonStyles({
                variant: 'default',
                colour: 'sage',
                size: 'lg'
              }),
              'mt-8 flex flex-row items-center drop-shadow-xl'
            )}
            href={locations_link.link_url}
          >
            <House />
            {locations_link.link_text}
          </Link>
        </div>
      </div>
    </section>
  )
}
