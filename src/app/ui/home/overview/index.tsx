import Image from "next/image";

import image_01 from "./images/overview-01.jpg";
import image_02 from "./images/overview-02.jpg";
import image_03 from "./images/overview-03.jpg";

const features: { title: string; description: string }[] = [
  {
    title: "Perfect for Business & Leisure",
    description: "Tailored stays for every traveler"
  },
  {
    title: "Exceptional Locations",
    description: "Close to iconic attractions and scenic beauty"
  },
  {
    title: "Unparalleled Comfort",
    description: "World-class service and amenities"
  }
];

export default function Overview(): JSX.Element {
  return (
    <section id='welcome' className='mx-auto max-w-screen-lg p-6 md:py-16'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <h2 className='whitespace-normal text-4xl font-light capitalize text-secondary-700 sm:text-5xl md:whitespace-pre-wrap md:leading-tight lg:text-6xl lg:leading-tight'>
          Experience{"\n"}South Africa’s{"\n"}Finest Luxury Guesthouses
        </h2>
        <p className='text-justify text-lg font-light leading-normal tracking-wide lg:leading-loose'>
          At The Grand Collection, we offer a selection of carefully curated
          luxury guesthouses across South Africa, each uniquely designed to
          cater to <em>business and leisure</em> travelers. From tranquil
          retreats in scenic wine country to vibrant stays in bustling towns,
          our properties combine elegance, comfort, and local charm. Discover
          exceptional service and thoughtfully tailored experiences that make
          every visit unforgettable.
        </p>

        <ul className='grid grid-cols-2 gap-4'>
          <li className='relative col-span-2 aspect-[3/1] overflow-hidden rounded-md'>
            <Image
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center"
              }}
              placeholder='blur'
              src={image_03}
              alt=''
              loading='lazy'
            />
          </li>
          <li className='relative col-span-1 aspect-[2/1] overflow-hidden rounded-md'>
            <Image
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center"
              }}
              placeholder='blur'
              src={image_02}
              alt=''
              loading='lazy'
            />
          </li>
          <li className='relative col-span-1 aspect-[2/1] overflow-hidden rounded-md'>
            <Image
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center"
              }}
              placeholder='blur'
              src={image_01}
              alt=''
              loading='lazy'
            />
          </li>
        </ul>

        <ul className='flex flex-col items-center justify-center text-center'>
          {features.map(({ title, description }) => {
            return (
              <li key={title} className='mb-3'>
                <h3 className='text-2xl font-semibold text-primary-600'>
                  {title}
                </h3>
                <p className='mt-2 text-base font-light text-gray-600 dark:text-gray-300'>
                  {description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}