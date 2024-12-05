import Image from 'next/image'
import Link from 'next/link'
// import { Button } from '@nextui-org/react';
import {
  ChevronDown
  // MapPin
} from 'lucide-react'

import { FullLogo } from '@/ui/logo'

// import desktopBg from './images/home-gallery-01.jpg';
// import mobileBg from './images/mobile-gallery-01.jpg';

export function Hero() {
  return (
    <section className='bg-slate-800 relative h-[75vh] max-h-[40rem] w-screen sm:h-[calc(100vh_-_4rem)] sm:max-h-none'>
      <div className='absolute inset-0 size-full'>
        {/* Mobile background image */}
        <Image
          src='/api/media/file/home-gallery-01.webp'
          alt='Hero image'
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          fill
          sizes='70vw'
          className='block lg:hidden'
        />
        {/* Desktop background image */}
        <Image
          src='/api/media/file/home-gallery-01.webp'
          alt='Hero image'
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          fill
          sizes='100vw'
          className='hidden lg:block'
          priority
        />
        <div className='absolute inset-0 bg-custom-gradient-mobile sm:bg-custom-gradient' />
        <div className='absolute inset-0 flex flex-col items-center justify-center p-3'>
          <FullLogo className='w-72 md:w-96 lg:w-[500px]' />

          <h1 className='text-medium mx-auto mt-8 max-w-screen-lg px-6 text-center text-white drop-shadow-sm md:text-lg lg:text-xl'>
            Luxurious Guesthouses Across South Africa – Unique Stays for Every
            Traveler
          </h1>

          {/* <Button
            size='lg'
            color='secondary'
            variant='shadow'
            className='mt-8 hidden sm:flex sm:flex-row sm:items-center'
            as={Link}
            href='#properties'
          >
            <MapPin />
            Explore Our Locations
          </Button> */}

          {/* <Button
            color='secondary'
            variant='shadow'
            className='mt-8 flex flex-row items-center sm:hidden'
            as={Link}
            href='#properties'
          >
            <MapPin />
            Explore Our Locations
          </Button> */}

          <Link
            href='#welcome'
            className='absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center sm:flex'
          >
            <span className='text-white'>Learn More</span>
            <ChevronDown className='size-12 animate-pulse text-white' />
          </Link>
        </div>
      </div>
    </section>
  )
}
