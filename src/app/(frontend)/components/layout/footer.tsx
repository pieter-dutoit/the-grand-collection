import 'server-only'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'

import { MinimalTextLogo } from '@/components/ui/logos'
import { fetchHomePageData, getGuestHouses } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'
import { getButtonStyles } from '@/components/ui/button'

export default async function Footer(): Promise<JSX.Element> {
  const { socials } = await fetchHomePageData('socials')
  const { contactPersons } = await fetchHomePageData('contactPersons')
  const guesthouses = await getGuestHouses()

  if (!socials || !contactPersons || !guesthouses) return <></>

  return (
    <footer className='w-full justify-center bg-olive-500 py-8'>
      <div className='container mx-auto grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-5'>
        {/* Logo & Socials */}
        <div className='flex flex-col md:col-span-3 lg:col-span-2'>
          <Link href='/'>
            <MinimalTextLogo
              className='mx-auto w-40 max-w-full md:mx-0'
              color='text-gold-100'
            />
          </Link>

          {/* Socials */}
          <ul className='mx-auto mt-6 flex items-center gap-4 md:mx-0'>
            {socials.map((social) => {
              if (!social) return null
              const { platform, url: platformLink } = social
              if (typeof platform === 'string') return null
              const { name, icon } = platform

              const { url, alt } = extractImageProps(icon)

              return (
                <li key={platformLink} aria-label={`Link to ${name} profile`}>
                  <Link
                    href={platformLink}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <Image
                      src={url}
                      alt={alt}
                      height={40}
                      width={40}
                      className={twMerge(
                        getButtonStyles({
                          variant: 'ghost',
                          size: 'icon'
                        }),
                        'bg-white/30'
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Get in touch */}
          <div className='mt-8 flex flex-col text-olive-100'>
            <h3 className='text-center text-lg font-bold uppercase md:text-left'>
              Get in touch
            </h3>
            <ul className='mt-2 text-center md:text-left'>
              {contactPersons.map((contact) => {
                if (typeof contact === 'string') return null
                const { name, position, email, phone } = contact
                return (
                  <li key={email}>
                    <h4 className='text-lg font-semibold'>{name}</h4>
                    <p className='text-sm font-semibold'>{position}</p>

                    <div className='my-2 mt-4 flex items-center justify-center gap-2 md:justify-start'>
                      <Phone className='size-5' />{' '}
                      <a href={`tel:${phone}`}>{phone}</a>
                    </div>
                    <div className='my-2 flex items-center justify-center gap-2 md:justify-start'>
                      <Mail className='size-5' />{' '}
                      <a href={`mailto:${email}`}>{email}</a>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Home Page Links */}
        <div className='flex flex-col text-center text-olive-100 md:text-left'>
          <Link href={'/'} className='mb-4 text-lg font-bold uppercase'>
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
            className='mb-4 text-lg font-bold uppercase'
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
          <h4 className='mb-4 text-lg font-bold uppercase'>Other</h4>

          <ul className='flex flex-col gap-2'>
            {[
              {
                label: 'Contact Us',
                url: '/contact'
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
    </footer>
  )
}
