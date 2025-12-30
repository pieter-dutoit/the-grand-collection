import PropertyPreview from '@/app/(frontend)/components/property-preview'
import SectionHeading from '@/components/section-heading'
import type { Destination, Guesthouse } from '@/payload/payload-types'

type WhereToStayProps = {
  guesthouses: Guesthouse[]
  destination: Destination
}

export default function WhereToStaySection({
  guesthouses,
  destination
}: WhereToStayProps) {
  if (guesthouses.length === 0) {
    return null
  }

  return (
    <section id='where-to-stay' className='flex flex-col gap-8 py-10 lg:py-20'>
      <div className='container mx-auto flex flex-col items-start gap-8'>
        <SectionHeading
          parentLabel='Stay close to the places above'
          title={`Where to stay in ${destination.name}`}
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
