import SectionHeading from '@/components/section-heading'
import { Guesthouse } from '@/payload/payload-types'

interface PropTypes {
  data: Guesthouse
}

export default function Policies({ data }: PropTypes): JSX.Element {
  const {
    content: {
      policies: { heading, description, label, policies_list }
    }
  } = data

  return (
    <section className='mx-auto py-8 lg:py-16'>
      <div id='policies' className='absolute -mt-36 lg:-mt-48' />
      <div className='container mx-auto flex flex-col gap-8'>
        <SectionHeading
          title={heading}
          parentLabel={label}
          description={description}
        />

        <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {policies_list?.map((item) => {
            if (typeof item === 'string') return null
            const { items } = item
            return items?.map((policy) => {
              if (typeof policy === 'string') return null
              const { id, heading, description } = policy
              return (
                <li
                  key={id}
                  className='overflow-hidden rounded-lg border border-gold-200 bg-white'
                >
                  <div className='border-b border-gold-100 bg-gray-50 px-4 py-3'>
                    <h3 className='text-base font-semibold text-olive-900'>
                      {heading}
                    </h3>
                  </div>
                  <div className='px-4 py-3 text-sm leading-relaxed text-olive-700'>
                    <p className='whitespace-pre-line'>{description}</p>
                  </div>
                </li>
              )
            })
          })}
        </ul>
      </div>
    </section>
  )
}
