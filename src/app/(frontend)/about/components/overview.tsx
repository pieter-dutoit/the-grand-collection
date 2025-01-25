import SectionHeading from '@/components/ui/section-heading'
import Image from '@/components/ui/image'

export default function Overview(): JSX.Element {
  return (
    <section className='w-full bg-gray-100'>
      <div className='grid items-center gap-8 sm:grid-cols-2'>
        {/* Image */}

        <div className='relative size-full min-h-32 bg-sage-300'>
          <Image
            src='/images/josefin-WS5yjFjycNY-unsplash.webp'
            alt=''
            fill
            className='object-cover object-center'
            sizes='(max-width: 640px) 100vw, 50vw'
          />
        </div>

        {/* Text */}
        <div className='container mx-auto py-8 lg:py-16'>
          <SectionHeading heading='About us' headingClassNames='sm:text-left' />

          <p className='mx-auto mt-4 text-center font-light sm:text-left md:text-lg'>
            At The Grand Collection, we believe in redefining luxury hospitality
            for the modern traveler. Our journey began with a vision: to create
            excepyional spaces where business and leisure travelers feel equally
            at home. Each of our guesthouses is a testament to this vision,
            offering an unmatched blend of comfort, elegance, and personalized
            service.
          </p>
        </div>
      </div>
    </section>
  )
}
