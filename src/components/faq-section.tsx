'use client'

import { ChevronDown } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import type { Faq } from '@/payload/payload-types'
import { getFaqItems } from '@/lib/utils/faq'
import SectionHeading from './section-heading'

type FaqSectionProps = {
  title?: string
  parentLabel?: string
  faq?: Faq | string | null
  id?: string
  className?: string
}

export default function FaqSection({
  faq,
  id = 'faq',
  parentLabel,
  title,
  className
}: FaqSectionProps) {
  const items = getFaqItems(faq)
  if (items.length === 0) {
    return null
  }

  return (
    <section className={cn('relative py-8 lg:py-16', className)}>
      <div id={id} className='absolute -mt-36 lg:-mt-48' />
      <div className='container mx-auto flex flex-col gap-8'>
        <SectionHeading
          title={title || 'Frequently Asked Questions'}
          parentLabel={parentLabel || 'Good to know'}
        />

        <div className='flex flex-col gap-3'>
          {items.map((item) => (
            <Collapsible
              key={item.id}
              className='rounded-2xl border border-gold-200 bg-white/90 shadow-sm'
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
