import { Guesthouse } from '@/payload/payload-types'
import Socials from '@/app/(frontend)/components/socials'

interface ContactUsProps {
  data: Guesthouse
}

import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import { extractContactDetails } from '@/lib/utils'
import SectionHeading from '@/components/section-heading'

export default function ContactUs({
  data: {
    slug,
    business_details: {
      geo: { maps_link, maps_embed_url }
    },
    contact_details: { address, contact_persons, socials }
  }
}: ContactUsProps): React.JSX.Element {
  const contacts = extractContactDetails(contact_persons)
  const { street, suburb, city, province, postalCode } = address

  return (
    <section className='py-6 lg:py-16'>
      <div className='container mx-auto flex flex-col gap-8'>
        <div id='contact' className='absolute -mt-36 lg:-mt-48' />
        <SectionHeading
          title='Contact & Location'
          parentLabel='Get In Touch'
          description='Find our contact details and map for easy arrival, or reach out if you’d like help with your booking or stay.'
        />

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {/* Email & Phone Card */}
          <div className='border-gold-200 rounded-xl border bg-white p-6 shadow-md'>
            <h3 className='text-lg font-semibold text-olive-600'>
              Contact Information
            </h3>
            <ul className='text-sm'>
              {contacts.map(({ phone, phoneLink, email }) => (
                <li key={email} className='mt-2 space-y-2'>
                  <Link
                    href={`mailto:${email}`}
                    className='flex items-center gap-2'
                    data-analytics-event='contact_click'
                    data-analytics-source-section='contact_section'
                    data-analytics-cta-label='Email'
                    data-analytics-guesthouse-slug={slug}
                    data-analytics-target-url={`mailto:${email}`}
                  >
                    <Mail className='text-sage-500 size-4' />
                    <span className='opacity-90'>{email}</span>
                  </Link>
                  <Link
                    href={`tel:+27${phoneLink}`}
                    className='flex items-center gap-2'
                    data-analytics-event='contact_click'
                    data-analytics-source-section='contact_section'
                    data-analytics-cta-label='Phone'
                    data-analytics-guesthouse-slug={slug}
                    data-analytics-target-url={`tel:+27${phoneLink}`}
                  >
                    <Phone className='text-sage-500 size-4' />
                    <span className='opacity-90'>{phone}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Address */}
            <h3 className='mt-6 text-lg font-semibold text-olive-600'>
              Address
            </h3>
            <div className='mt-2 flex flex-col gap-4 text-sm opacity-90'>
              <p>
                {street}, {suburb}, {city}, {province}, {postalCode}
              </p>
              <Link
                href={maps_link}
                className='text-sage-500 flex items-center gap-1 underline underline-offset-2'
                target='_blank'
                rel='noopener noreferrer'
                data-analytics-event='maps_click'
                data-analytics-source-section='contact_section'
                data-analytics-cta-label='Get Directions'
                data-analytics-guesthouse-slug={slug}
                data-analytics-target-url={maps_link}
              >
                <MapPin className='size-4' />
                Get Directions
              </Link>
            </div>

            {/* Socials */}
            <h3 className='mt-6 text-lg font-semibold text-olive-600'>
              Follow us
            </h3>
            {socials && <Socials socials={socials} className='mt-2' />}
          </div>

          {/* Maps Card */}
          <div className='border-gold-200 rounded-xl border bg-white p-6 shadow-md'>
            <h3 className='text-lg font-semibold text-olive-600'>Location</h3>
            <div className='border-gold-100 mt-4 overflow-hidden rounded-lg border'>
              <iframe
                title='Guesthouse Map Location'
                src={maps_embed_url}
                width='600'
                height='400'
                style={{ border: 0 }}
                allowFullScreen={false}
                loading='eager'
                referrerPolicy='no-referrer-when-downgrade'
                className='size-full md:min-h-80'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
