import PropertyPreview from '@/app/(frontend)/components/property-preview'
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
    <section
      id='where-to-stay'
      className='flex flex-col gap-8 bg-gradient-to-b from-olive-200/70 to-olive-200 py-10 lg:py-20'
    >
      <div className='container mx-auto flex flex-col items-start'>
        <span className='text-sm font-extrabold text-olive-500'>
          Close to many of the places above
        </span>
        <h2 className='text-3xl font-semibold text-olive-900 md:text-4xl'>
          Where to stay in {destination.name}
        </h2>
      </div>

      <div className='container mx-auto flex w-full flex-col items-start gap-8'>
        <div className='flex w-full flex-col gap-8'>
          {guesthouses.map((guesthouse) => (
            <PropertyPreview key={guesthouse.id} guesthouse={guesthouse} />
          ))}
        </div>
      </div>
    </section>
  )
}
