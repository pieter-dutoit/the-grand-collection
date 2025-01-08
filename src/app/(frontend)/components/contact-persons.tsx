import { ContactPerson } from '@/payload/payload-types'
import { Mail, Phone } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface ContactsProps {
  contactPersons: (ContactPerson | string)[]
  className?: string
  contactLinksClasses?: string
}

export default function ContactPersons({
  contactPersons,
  className,
  contactLinksClasses
}: ContactsProps): JSX.Element {
  return (
    <ul className={twMerge('mt-2 text-center md:text-left', className)}>
      {contactPersons.map((contact) => {
        if (typeof contact === 'string') return null
        const { name, position, email, phone } = contact
        return (
          <li key={email}>
            <h4 className='text-lg font-semibold'>{name}</h4>
            {position && <p className='text-sm font-semibold'>{position}</p>}

            <div
              className={twMerge(
                'my-2 mt-4 flex items-center justify-center gap-2',
                contactLinksClasses
              )}
            >
              <Phone className='size-5' /> <a href={`tel:${phone}`}>{phone}</a>
            </div>
            <div
              className={twMerge(
                'my-2 mt-2 flex items-center justify-center gap-2',
                contactLinksClasses
              )}
            >
              <Mail className='size-5' />{' '}
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
