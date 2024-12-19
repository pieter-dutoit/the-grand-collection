import 'server-only'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import { getGuestHouses } from '@/lib/data'
import { Guesthouse } from '@/payload/payload-types'
import { getButtonStyles } from '@/components/ui/button'

import Hero from './components/hero'

type Params = Promise<{ guesthouse: string }>

export async function generateStaticParams() {
  const guesthouses = await getGuestHouses()

  if (!guesthouses) {
    return []
  }

  return guesthouses.map((guesthouse) => ({
    guesthouse: guesthouse.slug,
    ...guesthouse
  }))
}

export default async function ThePaarlGrand({
  params
}: {
  params: Params
}): Promise<JSX.Element> {
  const { guesthouse: slug } = await params

  const res: Guesthouse[] = await getGuestHouses({ slug: { equals: slug } })
  const [data] = res

  if (!data) return notFound()

  const NAV_OPTIONS = [
    { href: '#gallery', text: 'Gallery' },
    { href: '#rooms', text: 'Rooms' },
    { href: '#amenities', text: 'Amenities' },
    { href: '#contact', text: 'Contact Us' }
  ]

  return (
    <>
      <Hero guesthouse={data} />
      <nav className='sticky left-0 top-16 z-40 h-14 w-full bg-olive-50 lg:h-16'>
        <ul className='container mx-auto flex h-full snap-x items-center space-x-4 overflow-x-auto'>
          {NAV_OPTIONS.map(({ href, text }) => (
            <li key={href} className='snap-center'>
              <Link
                href={href}
                className={twMerge(
                  getButtonStyles({
                    variant: 'ghost',
                    colour: 'gold'
                  }),
                  'font-semibold'
                )}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className='h-[200vh]'>hello</div>
    </>
  )
}

export const dynamicParams = false
export const revalidate = false
