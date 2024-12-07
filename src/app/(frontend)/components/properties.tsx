import Image, { StaticImageData } from 'next/image'
import ScrollAnchor from './scroll-anchor'

const properties = [
  {
    name: 'The Paarl Grand',
    images: []
  },
  {
    name: 'The Kathu Grand',
    images: []
  }
]

function PropertyPreview({
  name,
  images,
  alignment
}: {
  name: string
  images: StaticImageData[]
  alignment: 'start' | 'end'
}): JSX.Element {
  const alignmentClass = alignment === 'start' ? 'self-start' : 'self-end'

  return (
    <div className={`flex flex-col gap-4 ${alignmentClass}`}>
      <div className='grid grid-cols-3'>
        {images.map((src, index) => {
          return <Image key={'img' + index} src={src} alt='' />
        })}
      </div>
      <div>
        <h3>{name}</h3>
      </div>
    </div>
  )
}

export default function Properties(): JSX.Element {
  return (
    <section className='relative w-full'>
      <ScrollAnchor id='properties' />
      <div className='container mx-auto py-8'>
        <h2 className='whitespace-normal text-center text-3xl font-light capitalize text-gold-700 sm:text-3xl md:whitespace-pre-wrap md:leading-tight lg:text-4xl lg:leading-tight'>
          Discover Unique Stays
        </h2>
        <p className='text-base'>
          <em>View Our Featured Guesthouses</em>
        </p>
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
  )
}
