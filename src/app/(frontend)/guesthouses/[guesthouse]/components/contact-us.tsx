import { Guesthouse } from '@/payload/payload-types'
import Socials from '@/app/(frontend)/components/socials'

import ContactPersons from '@/app/(frontend)/components/contact-persons'
import SectionHeading from '@/components/ui/section-heading'

interface ContactUsProps {
  data: Guesthouse
}

function Heading({ children }: { children: string }): JSX.Element {
  return (
    <h4 className='text-xl font-bold uppercase text-gold-600'>{children}</h4>
  )
}

export default function ContactUs({
  data: {
    contact_details: { address, contact_persons, socials }
  }
}: ContactUsProps): JSX.Element {
  const { street, suburb, city, province, postalCode } = address

  return (
    <section className='py-8 lg:py-16'>
      <div id='contact' className='absolute -mt-36 lg:-mt-48' />
      <SectionHeading heading='Contact Us' subtitle='Get In Touch' />

      <div className='container mx-auto mt-8 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3'>
        {contact_persons && (
          <div className='flex flex-col items-center'>
            <Heading>Contact Info</Heading>
            <ContactPersons
              contactPersons={contact_persons}
              className='mt-4 flex flex-col items-center md:mt-4 md:text-center'
            />
          </div>
        )}

        {socials && (
          <div className='mt-8 flex flex-col items-center md:mt-0'>
            <Heading>Follow Us</Heading>
            <Socials socials={socials} className='mt-4 md:mt-4' />
          </div>
        )}

        <div className='mt-8 flex flex-col items-center md:mt-0'>
          <Heading>Find Us</Heading>
          <address className='mt-4 flex text-center font-medium md:mt-4'>
            {street},<br /> {suburb},<br /> {city},<br /> {province},
            <br />
            {postalCode}
          </address>
        </div>
      </div>
    </section>
  )
}
