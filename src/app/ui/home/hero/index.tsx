import Image from "next/image";

import bg from "../images/home-gallery-01.jpg";
import { FullLogo } from "@/ui/logo";

export function Hero() {
  return (
    <div className='absolute inset-0 z-0 block h-screen w-screen bg-slate-800'>
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
      <div className='absolute inset-0 bg-custom-gradient' />
      <div className='absolute inset-0 flex flex-col items-center justify-center p-3'>
        <FullLogo className='w-64 md:w-96 lg:w-[600px]' />

        <h1 className='mt-8 text-center text-lg text-white drop-shadow-sm md:text-xl lg:text-2xl'>
          Luxurious Guesthouses Across South Africa – Unique Stays for Every
          Traveler
        </h1>
      </div>
    </div>
  );
}
