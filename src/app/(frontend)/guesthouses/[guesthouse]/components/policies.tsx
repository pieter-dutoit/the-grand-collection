import { Guesthouse } from '@/payload/payload-types'
import SectionHeading from '@/components/ui/section-heading'

interface PropTypes {
  data: Guesthouse
}

export default function Policies({ data }: PropTypes): JSX.Element {
  const {
    business_details: {
      check_in_out: { check_in_time, check_out_time }
    }
  } = data

  const policies = [
    {
      id: 1,
      title: 'Check-In & Check-Out',
      items: [
        {
          label: 'Check-In Time',
          value: 'From ' + check_in_time.slice(1, 6),
          note: "You'll need to let the property know in advance what time you'll arrive."
        },
        {
          label: 'Check-Out Time',
          value: 'Before ' + check_out_time.slice(1, 6)
        }
      ]
    }
  ]

  return (
    <section className='mx-auto bg-white py-8 lg:py-16'>
      <div id='policies' className='absolute -mt-36 lg:-mt-48' />
      <div className='container mx-auto mt-8 gap-4 md:mt-16'>
        <SectionHeading heading='Policies & Important Information' />

        <ul className='mt-8 grid grid-cols-1 gap-8 lg:mt-16'>
          {policies?.map(({ id, title, items }) => (
            <li
              key={id}
              className='overflow-hidden rounded-lg border-2 border-gray-200 bg-white'
            >
              <div className='border-b border-gray-200 bg-gray-50 px-6 py-4'>
                <h3 className='flex items-center gap-2 text-lg font-medium text-gray-900'>
                  {title}
                </h3>
              </div>
              <ul className='space-y-4 px-6 py-4'>
                {items?.map(({ label, value, note }, index) => (
                  <li key={index} className='space-y-1'>
                    <h4 className='text-sm font-medium text-gray-700'>
                      {label}
                    </h4>
                    <div className='text-sm text-gray-600'>{value}</div>
                    {note && (
                      <p className='text-xs italic text-gray-500'>{note}</p>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
