import 'server-only'
import Link from 'next/link'

import Image from '@/components/ui/image'
import {
  // fetchHomePageData,
  fetchGuestHouses,
  fetchLogo
} from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

// import Socials from '../../socials'
import ContactPersons from '../../contact-persons'

export default async function Footer(): Promise<JSX.Element> {
  // const { socials } = await fetchHomePageData('socials')
  // const { contactPersons } = await fetchHomePageData('contactPersons')
  const guesthouses = await fetchGuestHouses()
  const logo = await fetchLogo('minimal_light')
  const { minimal_light } = logo
  const { url, alt } = extractImageProps(minimal_light)

  return (
    <footer className='w-full justify-center bg-olive-950/95 py-8'>
      <div className='container mx-auto grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-5'>
        {/* Logo & Socials */}
        <div className='flex flex-col md:col-span-3 lg:col-span-2'>
          <Link href='/'>
            <div className='relative mx-auto h-16 w-52 max-w-full md:mx-0'>
              <Image
                src={url}
                alt={alt}
                fill
                className='object-contain object-center'
              />
            </div>
          </Link>

          {/* Socials */}
          {/* {socials && (
            <Socials socials={socials} className='mx-auto mt-6 md:mx-0' />
          )} */}
          {/* Contact Persons */}

          <div className='mt-8 flex flex-col text-olive-100'>
            <h3 className='text-center text-lg font-bold uppercase text-gold-400 md:text-left'>
              Get in touch
            </h3>

            <ul>
              {guesthouses.map(
                ({ id, contact_details: { contact_persons } }) => {
                  if (!contact_persons) return null
                  return (
                    <li key={id} className='mt-2'>
                      <ContactPersons
                        contactPersons={contact_persons.slice(0, 1)}
                        contactLinksClasses='md:justify-start'
                      />
                    </li>
                  )
                }
              )}
            </ul>
          </div>
        </div>

        {/* Home Page Links */}
        <div className='flex flex-col text-center text-olive-100 md:text-left'>
          <Link
            href='/'
            className='mb-4 text-lg font-bold uppercase text-gold-400'
          >
            Home
          </Link>

          <ul className='flex flex-col gap-2'>
            {[
              {
                label: 'Overview',
                url: '/#overview'
              },
              {
                label: 'Featured Properties',
                url: '/#locations'
              }
            ].map(({ label, url }) => {
              return (
                <li key={url}>
                  <Link href={url}>{label}</Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Guesthouses */}
        <div className='flex flex-col text-center text-olive-100 md:text-left'>
          <Link
            href='/guesthouses'
            className='mb-4 text-lg font-bold uppercase text-gold-400'
          >
            Guesthouses
          </Link>

          <ul className='flex flex-col gap-2'>
            {guesthouses.map(({ name, slug }) => {
              return (
                <li key={slug}>
                  <Link href={`/guesthouses/${slug}`}>{name}</Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Other pages */}
        <div className='flex flex-col text-center text-olive-100 md:text-left'>
          <h4 className='mb-4 text-lg font-bold uppercase text-gold-400'>
            Other
          </h4>

          <ul className='flex flex-col gap-2'>
            {[
              {
                label: 'About Us',
                url: '/about'
              }
            ].map(({ label, url }) => {
              return (
                <li key={url}>
                  <Link href={url}>{label}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <p className='mt-8 text-center text-sm text-white/60'>
        &copy; {new Date().getFullYear()} The Grand Collection. All rights
        reserved.
      </p>
    </footer>
  )
}
