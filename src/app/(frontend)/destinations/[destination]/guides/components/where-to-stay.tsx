import PropertyPreview from '@/app/(frontend)/components/property-preview'
import type { Guesthouse } from '@/payload/payload-types'

type WhereToStayProps = {
  guesthouses: Guesthouse[]
}

export default function WhereToStaySection({ guesthouses }: WhereToStayProps) {
  if (guesthouses.length === 0) {
    return null
  }

  return (
    <section className='bg-gradient-to-b from-olive-200/70 to-olive-200 py-10 lg:py-20'>
      <div className='container mx-auto flex flex-col gap-1'>
        <p className='text-xs font-medium text-olive-500'>
          Close to many of the spots above
        </p>
        <h2 className='text-xl font-semibold text-olive-900 md:text-2xl'>
          Where to stay
        </h2>
      </div>

      <div className='container mx-auto py-6'>
        <div className='flex flex-col gap-8'>
          {guesthouses.map((guesthouse) => (
            <PropertyPreview key={guesthouse.id} guesthouse={guesthouse} />
          ))}
        </div>
      </div>
    </section>
  )
}
