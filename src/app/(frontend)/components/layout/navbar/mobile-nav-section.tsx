'use client'

import React, { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type MobileNavSectionProps = {
  children: React.ReactNode
  className?: string
  defaultOpen?: boolean
  title: string
}

const sectionStyles = 'border-t border-white/10 pt-2'

const triggerStyles =
  'group flex w-full cursor-pointer list-none items-center justify-between rounded-md py-3 text-left text-sm font-bold uppercase text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-white/60'

const chevronStyles =
  'size-4 transition-transform duration-200 data-[state=open]:rotate-180 motion-reduce:transition-none'

const chevronFrameStyles =
  'flex size-6 shrink-0 items-center justify-center overflow-hidden'

const contentStyles =
  'grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0 data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100 motion-reduce:transition-none'

export default function MobileNavSection({
  children,
  className,
  defaultOpen = false,
  title
}: MobileNavSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = useId()
  const state = isOpen ? 'open' : 'closed'

  return (
    <div className={twMerge(sectionStyles, className)} data-state={state}>
      <button
        type='button'
        aria-controls={contentId}
        aria-expanded={isOpen}
        className={triggerStyles}
        data-state={state}
        onClick={() => {
          setIsOpen((current) => !current)
        }}
      >
        <span className='min-w-0 flex-1'>{title}</span>
        <span className={chevronFrameStyles}>
          <ChevronDown
            className={chevronStyles}
            data-state={state}
            aria-hidden='true'
          />
        </span>
      </button>
      <div
        id={contentId}
        aria-hidden={!isOpen}
        className={contentStyles}
        data-state={state}
        inert={isOpen ? undefined : true}
      >
        <div className='min-h-0 overflow-hidden'>{children}</div>
      </div>
    </div>
  )
}
