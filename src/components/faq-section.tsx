'use client'

import { ChevronDown } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import type { Faq } from '@/payload/payload-types'

type FaqSectionProps = {
  title?: string
  parentLabel?: string
  faq?: Faq | string | null
  id?: string
  className?: string
}

type FaqItem = NonNullable<Faq['items']>[number]

const isFaqDocument = (value: Faq | string | null | undefined): value is Faq =>
  typeof value === 'object' && value !== null && 'items' in value

const getFaqItems = (items: FaqItem[]) =>
  items.reduce<{ id: string; question: string; answer: string }[]>(
    (acc, item, index) => {
      const question = item.question?.trim()
      const answer = item.answer?.trim()

      if (!question || !answer) {
        return acc
      }

      const id =
        typeof item.id === 'string' && item.id.length > 0
          ? item.id
          : `${index}-${question}`

      acc.push({ id, question, answer })
      return acc
    },
    []
  )

export default function FaqSection({
  faq,
  id = 'faq',
  parentLabel,
  title,
  className
}: FaqSectionProps) {
  if (!isFaqDocument(faq)) {
    return null
  }

  const items = getFaqItems(faq.items ?? [])
  if (items.length === 0) {
    return null
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    }))
  }

  return (
    <section
      id={id}
      className={cn(
        'bg-gradient-to-b from-transparent to-olive-100 py-10 lg:py-20',
        className
      )}
    >
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
      <div className='container mx-auto flex flex-col gap-8'>
        <div className='flex flex-col items-start'>
          <span className='text-sm font-extrabold text-olive-500'>
            {parentLabel || 'Good to know'}
          </span>
          <h2 className='text-3xl font-semibold text-olive-900 md:text-4xl'>
            {title || 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className='flex flex-col gap-3'>
          {items.map((item) => (
            <Collapsible
              key={item.id}
              className='rounded-2xl border border-olive-200 bg-white/90 shadow-sm'
            >
              <CollapsibleTrigger className='group flex w-full items-center justify-between gap-4 px-5 py-4 text-left'>
                <span className='text-base font-semibold text-olive-900'>
                  {item.question}
                </span>
                <ChevronDown className='size-5 text-olive-500 transition-transform group-data-[state=open]:rotate-180' />
              </CollapsibleTrigger>
              <CollapsibleContent className='overflow-hidden'>
                <div className='px-5 pb-5 text-sm leading-relaxed text-olive-700'>
                  <p className='whitespace-pre-line'>{item.answer}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  )
}
