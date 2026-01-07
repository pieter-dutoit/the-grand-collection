import PropertyPreview from '@/app/(frontend)/components/property-preview'
import SectionHeading from '@/components/section-heading'
import type { Destination, Guesthouse } from '@/payload/payload-types'

type WhereToStayProps = {
  title?: string
  label?: string
  description?: string
  guesthouses: Guesthouse[]
  destination: Destination
}

export default function WhereToStaySection({
  label,
  title,
  description,
  guesthouses,
  destination
}: WhereToStayProps) {
  if (guesthouses.length === 0) {
    return null
  }

  return (
    <section className='relative flex flex-col gap-8 py-10 lg:py-20'>
      <div id='where-to-stay' className='absolute -mt-36 lg:-mt-48' />
      <div className='container mx-auto flex flex-col items-start gap-8'>
        <SectionHeading
          parentLabel={label || 'Stay in comfort'}
          title={title || `Where to stay in ${destination.name}`}
          description={description}
        />
        <div className='flex w-full flex-col gap-8'>
          {guesthouses.map((guesthouse) => (
            <PropertyPreview key={guesthouse.id} guesthouse={guesthouse} />
          ))}
        </div>
      </div>
    </section>
  )
}
