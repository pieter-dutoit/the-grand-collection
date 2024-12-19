import { getGuestHouses } from '@/lib/data'
import PropertyPreview from '../components/property-preview'

export default async function AllGuestHouses(): Promise<JSX.Element> {
  const guesthouses = await getGuestHouses()

  return (
    <section className='w-full bg-white'>
      <div className='container mx-auto py-10 lg:py-16'>
        <h1 className='text-center text-3xl font-semibold text-gold-700 lg:text-4xl xl:text-5xl'>
          Explore Our Guesthouses in South Africa
        </h1>

        <h2 className='my-6 text-center text-base text-olive-500 md:text-xl'>
          Comfort and Luxury in Every Stay
        </h2>

        {!!guesthouses && (
          <ul className='mt-10 flex flex-col gap-8 lg:mt-16'>
            {guesthouses.map((guesthouse) => {
              return (
                <PropertyPreview
                  key={guesthouse.slug}
                  guesthouse={guesthouse}
                />
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
