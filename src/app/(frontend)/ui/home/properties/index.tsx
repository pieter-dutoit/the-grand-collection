import Image, { StaticImageData } from 'next/image';

import image_01 from '../overview/images/overview-01.jpg';
import image_02 from '../overview/images/overview-02.jpg';
import image_03 from '../overview/images/overview-03.jpg';

const properties = [
  {
    name: 'The Paarl Grand',
    images: [image_01, image_02, image_03]
  },
  {
    name: 'The Kathu Grand',
    images: [image_01, image_02, image_03]
  }
];

function PropertyPreview({
  name,
  images,
  alignment
}: {
  name: string;
  images: StaticImageData[];
  alignment: 'start' | 'end';
}): JSX.Element {
  const alignmentClass = alignment === 'start' ? 'self-start' : 'self-end';

  return (
    <div className={`flex flex-col gap-4 ${alignmentClass}`}>
      <div className='bg-green-400 grid grid-cols-3'>
        {images.map((src, index) => {
          return <Image key={'img' + index} src={src} alt='' />;
        })}
      </div>
      <div className='bg-blue-500'>
        <h3>{name}</h3>
      </div>
    </div>
  );
}

export default function Properties(): JSX.Element {
  return (
    <section id='properties' className='dark:bg-foreground-100 w-full'>
      <div className='mx-auto max-w-screen-lg p-6 md:py-16'>
        <h2 className='text-foreground-600 whitespace-normal text-center text-2xl font-light capitalize sm:text-3xl md:whitespace-pre-wrap md:leading-tight lg:text-4xl lg:leading-tight'>
          Discover Unique Stays
        </h2>
        <div className='flex flex-col gap-5'>
          {properties.map(({ name, images }, index) => (
            <PropertyPreview
              key={name}
              name={name}
              alignment={index % 2 === 0 ? 'start' : 'end'}
              images={images}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
