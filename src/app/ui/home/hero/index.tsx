import Image from "next/image";
import { Button } from "@nextui-org/react";

import { FullLogo } from "@/ui/logo";

import { ChevronDown } from "lucide-react";

import bg from "./images/home-gallery-01.jpg";
import Link from "next/link";

export function Hero() {
  return (
    <section className='relative h-[75vh] w-screen bg-slate-800 sm:h-[calc(100vh_-_4rem)]'>
      <div className='absolute inset-0 size-full'>
        <Image
          src={bg}
          placeholder='blur'
          alt='Hero image'
          priority
          loading='eager'
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center"
          }}
        />
        <div className='absolute inset-0 bg-custom-gradient-mobile sm:bg-custom-gradient' />
        <div className='absolute inset-0 flex flex-col items-center justify-center p-3'>
          <FullLogo className='w-72 md:w-96 lg:w-[500px]' />

          <h1 className='mx-auto mt-8 max-w-screen-lg px-6 text-center text-medium text-white drop-shadow-sm md:text-lg lg:text-xl'>
            Luxurious Guesthouses Across South Africa – Unique Stays for Every
            Traveler
          </h1>

          <Button
            size='lg'
            color='secondary'
            variant='shadow'
            className='mt-8 hidden sm:block'
          >
            Explore Our Locations
          </Button>

          <Button color='secondary' variant='shadow' className='mt-8 sm:hidden'>
            Explore Our Locations
          </Button>

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
  );
}
