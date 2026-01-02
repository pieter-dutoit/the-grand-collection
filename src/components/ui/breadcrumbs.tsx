import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { BreadcrumbItem } from '@/lib/utils/breadcrumbs'
import { ChevronRight } from 'lucide-react'

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
  listClassName?: string
}

export default function Breadcrumbs({
  items,
  className,
  listClassName
}: BreadcrumbsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav
      aria-label='Breadcrumb'
      className={cn(
        'text-xs font-semibold tracking-wide text-olive-500',
        className
      )}
    >
      <ol
        className={cn('flex items-center gap-2 overflow-x-auto', listClassName)}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.name}-${index}`} className='flex items-center'>
              {index > 0 && <ChevronRight className='size-4 text-olive-600' />}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className='rounded-sm bg-white/60 px-2 py-1 backdrop-blur-md transition-colors hover:text-olive-800'
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={cn(
                    'line-clamp-1 rounded-sm bg-white/60 px-2 py-1 backdrop-blur-md',
                    isLast ? 'text-olive-800' : 'text-olive-500'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.name}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
