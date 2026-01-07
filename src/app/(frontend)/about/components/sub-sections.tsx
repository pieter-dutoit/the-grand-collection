import {
  JSXConvertersFunction,
  RichText
} from '@payloadcms/richtext-lexical/react'

import SectionHeading from '@/components/section-heading'
import { fetchAboutPageData } from '@/lib/data'
import Divider from '../../guesthouses/[guesthouse]/components/divider'
import { Fragment } from 'react'

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters
})

export default async function SubSections(): Promise<JSX.Element> {
  const { subsections } = await fetchAboutPageData('subsections')
  if (!subsections?.length) return <></>

  return (
    <div className='my-4 lg:my-8'>
      {subsections.map((subsection, index) => {
        if (typeof subsection === 'string') return null

        const { heading, content } = subsection

        return (
          <Fragment key={`subsection-${index}`}>
            {index !== 0 && <Divider />}
            <section key={index} className='container mx-auto py-8 lg:py-16'>
              <SectionHeading title={heading} className='text-center' />
              <RichText
                data={content}
                className='mx-auto mt-6 max-w-prose lg:mt-12'
                converters={jsxConverters}
              />
            </section>
          </Fragment>
        )
      })}
    </div>
  )
}
