import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import Image from 'next/image'
import { getButtonStyles } from '@/components/ui/button'
import { fetchHomePageData, fetchLogo } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

export async function Hero(): Promise<React.JSX.Element> {
  const { hero } = await fetchHomePageData('hero')
  const logo = await fetchLogo('logo_light')
  const { logo_light } = logo
  const logoProps = extractImageProps(logo_light)

  if (!hero) return <></>

  const { title, background_image, locations_link } = hero
  const { url, alt, isSvg } = extractImageProps(background_image)
  const logoAspectRatio =
    logoProps.width > 0 && logoProps.height > 0
      ? `${logoProps.width} / ${logoProps.height}`
      : '36 / 7'

  return (
    <section className='bg-sage-700 relative h-[75vh] max-h-[40rem] w-screen sm:max-h-none'>
      <div className='absolute inset-x-0 -top-16 bottom-0'>
        {url && (
          <Image
            src={url}
            alt={alt}
            className='object-cover object-center'
            fill
            sizes='100vw'
            priority
            fetchPriority='high'
            unoptimized={isSvg}
          />
        )}
        <div className='bg-custom-gradient-mobile sm:bg-custom-gradient absolute inset-0' />
      </div>

      <div className='relative z-10 flex size-full flex-col items-center justify-center gap-4 p-3 sm:gap-5 lg:gap-6'>
        <div
          className='relative w-[80vw] md:w-96 lg:w-125'
          style={{ aspectRatio: logoAspectRatio }}
        >
          <Image
            src={logoProps.url}
            alt={logoProps.alt}
            fill
            className='object-contain object-center'
            sizes='(max-width: 767px) 80vw, (max-width: 1023px) 24rem, 500px'
            priority
            fetchPriority='high'
            unoptimized={logoProps.isSvg}
          />
        </div>

        <h1 className='mx-auto max-w-screen-lg px-6 text-center text-white drop-shadow-sm md:text-lg lg:text-xl'>
          {title}
        </h1>

        <Link
          className={twMerge(
            getButtonStyles({
              variant: 'default',
              colour: 'gold',
              size: 'lg'
            }),
            'flex flex-row items-center drop-shadow-xl'
          )}
          href={locations_link.link_url}
        >
          {locations_link.link_text}
        </Link>
      </div>
    </section>
  )
}
