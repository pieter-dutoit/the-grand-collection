import Image from "next/image";
import { Button } from "@nextui-org/react";

import { FullLogo } from "@/ui/logo";

// import { ChevronDown } from "lucide-react";

import bg from "../images/home-gallery-01.jpg";

export function Hero() {
  return (
    <div className='absolute inset-0 z-0 block h-5/6 w-screen bg-slate-800 sm:h-screen'>
      <Image
        src={bg}
        placeholder='blur'
        alt='Hero image'
        priority
        loading='eager'
        layout='fill'
        style={{
          objectFit: "cover"
        }}
      />
      <div className='absolute inset-0 bg-custom-gradient-mobile sm:bg-custom-gradient' />
      <div className='absolute inset-0 flex flex-col items-center justify-center p-3'>
        <FullLogo className='w-72 md:w-96 lg:w-[500px]' />

        <h1 className='mt-8 text-center text-medium text-white drop-shadow-sm md:text-lg lg:text-xl'>
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

        {/* <ChevronDown className='mt-8 h-8 w-8 animate-bounce text-white' /> */}
      </div>
    </div>
  );
}
