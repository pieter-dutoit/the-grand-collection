import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { House } from 'lucide-react'

import { FullLogo } from '@/components/ui/logos'
import { getButtonStyles } from '@/components/ui/button'
import { fetchHomePageData } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

export async function Hero(): Promise<JSX.Element> {
  const {
    hero: { title, background_image, locations_link }
  } = await fetchHomePageData('hero')

  const { url, alt } = extractImageProps(background_image)

  return (
    <section className='relative h-[75vh] max-h-[40rem] w-screen bg-sage-700 sm:max-h-none'>
      <div className='absolute inset-0 size-full'>
        <Image
          src={url ?? ''}
          alt={alt}
          className='object-cover object-center'
          fill
          sizes='100vw'
          priority
          quality={80}
        />
        <div className='absolute inset-0 bg-custom-gradient-mobile sm:bg-custom-gradient' />
        <div className='absolute inset-0 flex flex-col items-center justify-center p-3'>
          <FullLogo className='w-72 md:w-96 lg:w-[500px]' />

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
