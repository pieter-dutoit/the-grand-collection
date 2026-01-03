import SectionHeading from '@/components/section-heading'
import Image from '@/components/ui/image'
import { fetchAboutPageData } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

export default async function Overview(): Promise<JSX.Element> {
  const { overview } = await fetchAboutPageData('overview')
  if (!overview) return <></>

  const { title, description, image } = overview
  const { url, alt } = extractImageProps(image)

  return (
    <section className='w-full bg-gradient-to-tr from-sage-50 to-sage-100'>
      <div className='grid items-center gap-8 sm:grid-cols-2'>
        {/* Image */}

        <div className='relative size-full min-h-32 bg-sage-300'>
          <Image
            src={url}
            alt={alt}
            fill
            className='object-cover object-center'
            sizes='(max-width: 640px) 100vw, 50vw'
          />
        </div>

        {/* Text */}
        <div className='container mx-auto py-8 lg:py-16'>
          <SectionHeading title={title} className='text-center sm:text-left' />

          <p className='mx-auto mt-4 text-center font-light sm:text-left md:text-lg'>
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
