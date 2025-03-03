import { Guesthouse } from '@/payload/payload-types'
import Socials from '@/app/(frontend)/components/socials'
import SectionHeading from '@/components/ui/section-heading'

interface ContactUsProps {
  data: Guesthouse
}

import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import { extractContactDetails } from '@/lib/utils'

export default function ContactUs({
  data: {
    business_details: {
      geo: { maps_link, maps_embed_url }
    },
    contact_details: { address, contact_persons, socials }
  }
}: ContactUsProps): JSX.Element {
  const contacts = extractContactDetails(contact_persons)
  const { street, suburb, city, province, postalCode } = address

  return (
    <section className='bg-gradient-to-b from-olive-100 to-white py-6 lg:py-16'>
      <div className='container mx-auto mt-8 gap-4'>
        <div id='contact' className='absolute -mt-36 lg:-mt-48' />
        <SectionHeading heading='Contact Us' subtitle='Get In Touch' />

        <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-2'>
          {/* Email & Phone Card */}
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h3 className='text-xl font-semibold'>Contact Information</h3>
            <ul>
              {contacts.map(({ phone, phoneLink, email }) => (
                <li key={email} className='mt-2 space-y-2'>
                  <Link
                    href={`mailto:${email}`}
                    className='flex items-center gap-2'
                  >
                    <Mail className='size-6 text-sage-500' />
                    <span>{email}</span>
                  </Link>
                  <Link
                    href={`tel:+27${phoneLink}`}
                    className='flex items-center gap-2'
                  >
                    <Phone className='size-6 text-sage-500' />
                    <span>{phone}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Address */}
            <h3 className='mt-6 text-xl font-semibold'>Address</h3>
            <div className='mt-2 flex flex-col gap-4'>
              <p>
                {street}
                <br /> {suburb}
                <br /> {city}
                <br /> {province}
                <br /> {postalCode}
              </p>
              <Link
                href={maps_link}
                className='flex items-center gap-1 text-sage-500 underline underline-offset-2'
                target='_blank'
              >
                <MapPin className='size-6' />
                Get Directions
              </Link>
            </div>

            {/* Socials */}
            <h3 className='mt-6 text-xl font-semibold'>Follow us</h3>
            {socials && <Socials socials={socials} className='mt-2' />}
          </div>

          {/* Maps Card */}
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h3 className='text-xl font-semibold'>Location</h3>
            <div className='mt-4 aspect-video'>
              <iframe
                title='Guesthouse Map Location'
                src={maps_embed_url}
                width='600'
                height='400'
                style={{ border: 0 }}
                allowFullScreen={false}
                loading='eager'
                referrerPolicy='no-referrer-when-downgrade'
                className='size-full rounded-md md:min-h-80'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
