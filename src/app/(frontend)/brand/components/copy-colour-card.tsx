'use client'

import { Copy } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import type { BrandColour } from './brand-data'

export default function CopyColourCard({ foreground, hex, name }: BrandColour) {
  const handleCopy = async () => {
    if (!navigator.clipboard?.writeText) {
      toast.error('Clipboard not available')
      return
    }

    try {
      await navigator.clipboard.writeText(hex)
      toast.success(`${name} · ${hex} copied`)
    } catch {
      toast.error(`Could not copy ${hex}`)
    }
  }

  return (
    <button
      type='button'
      onClick={handleCopy}
      className='focus-visible:ring-gold-500 overflow-hidden rounded-xl border border-olive-200 bg-white text-left shadow-sm hover:border-olive-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden'
      aria-label={`Copy ${name} colour ${hex}`}
    >
      <span
        className={cn(
          'flex h-32 items-start justify-end p-4',
          foreground === 'light' ? 'text-white' : 'text-olive-950'
        )}
        style={{ backgroundColor: hex }}
        aria-hidden='true'
      >
        <span className='rounded-full bg-current/10 p-2 opacity-70'>
          <Copy className='size-4' />
        </span>
      </span>
      <span className='flex items-end justify-between gap-3 p-4'>
        <span>
          <span className='block font-semibold text-olive-950'>{name}</span>
          <span className='mt-1 block font-mono text-sm text-olive-600'>
            {hex}
          </span>
        </span>
        <span className='text-xs font-semibold tracking-wide text-olive-500 uppercase'>
          Copy
        </span>
      </span>
    </button>
  )
}
