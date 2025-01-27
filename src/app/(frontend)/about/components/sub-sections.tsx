import {
  JSXConvertersFunction,
  RichText
} from '@payloadcms/richtext-lexical/react'

import SectionHeading from '@/components/ui/section-heading'
import { fetchAboutPageData } from '@/lib/data'

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
          <section key={index} className='container mx-auto py-8 lg:py-16'>
            <SectionHeading heading={heading} />
            <RichText
              data={content}
              className='mt-6 lg:mt-12'
              converters={jsxConverters}
            />
          </section>
        )
      })}
    </div>
  )
}
