import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { ChevronDown, MapPin } from 'lucide-react'

import { FullLogo } from '@/ui/logo'
import { buttonVariants } from '@/components/ui/button'
import { fetchHomePageData } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

export async function Hero(): Promise<JSX.Element> {
  const {
    hero: { title, background_image, cta_locations, cta_learn_more }
  } = await fetchHomePageData('hero')

  const { url, alt } = extractImageProps(background_image)

  return (
    <section className='relative h-[75vh] max-h-[40rem] w-screen bg-sage-700 sm:h-[calc(100vh_-_4rem)] sm:max-h-none'>
      <div className='absolute inset-0 size-full'>
        <Image
          src={url ?? ''}
          alt={alt}
          className='object-cover object-center'
          fill
          sizes='100vw'
          priority
        />
        <div className='absolute inset-0 bg-custom-gradient-mobile sm:bg-custom-gradient' />
        <div className='absolute inset-0 flex flex-col items-center justify-center p-3'>
          <FullLogo className='w-72 md:w-96 lg:w-[500px]' />

          <h1 className='mx-auto mt-8 max-w-screen-lg px-6 text-center text-white drop-shadow-sm md:text-lg lg:text-xl'>
            {title}
          </h1>

          <Link
            className={twMerge(
              buttonVariants({ variant: 'secondary' }),
              'mt-8 hidden sm:flex sm:flex-row sm:items-center'
            )}
            href={cta_locations.cta_link}
          >
            <MapPin />
            {cta_locations.cta_text}
          </Link>

          <Link
            href={cta_learn_more.cta_link}
            className='absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center sm:flex'
          >
            <span className='text-white'>{cta_learn_more.cta_text}</span>
            <ChevronDown className='size-12 animate-pulse text-white' />
          </Link>
        </div>
      </div>
    </section>
  )
}
