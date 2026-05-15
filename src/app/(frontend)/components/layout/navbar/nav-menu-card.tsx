import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { getButtonStyles } from '@/components/ui/button'

type NavImage = {
  alt: string
  isSvg: boolean
  url: string
}

type LinkDataProps = {
  [key: `data-${string}`]: string | number | undefined
  'aria-label'?: string
  rel?: string
  target?: '_blank' | '_parent' | '_self' | '_top'
}

export type NavMenuCardAction = {
  href: string
  label: string
  linkProps?: LinkDataProps
}

type NavMenuCardProps = {
  actions: NavMenuCardAction[]
  body: string
  href: string
  image: NavImage
  primaryLinkProps?: LinkDataProps
  title: string
}

const actionLinkStyles = twMerge(
  getButtonStyles({
    variant: 'outline',
    colour: 'olive',
    size: 'sm'
  }),
  'text-xs'
)

const externalHrefPattern = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i

export default function NavMenuCard({
  actions,
  body,
  href,
  image,
  primaryLinkProps,
  title
}: NavMenuCardProps) {
  return (
    <li className='flex h-full flex-col rounded-lg border border-olive-100 bg-white p-3 transition-colors hover:bg-olive-50/60'>
      <Link href={href} className='flex min-w-0 gap-3' {...primaryLinkProps}>
        <div className='border-gold-100 relative h-18 w-24 shrink-0 overflow-hidden rounded-md border bg-olive-100'>
          {image.url && (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className='object-cover object-center'
              sizes='96px'
              fetchPriority='low'
              unoptimized={image.isSvg}
            />
          )}
        </div>
        <span className='flex min-w-0 flex-col'>
          <span className='truncate text-base font-semibold text-olive-800'>
            {title}
          </span>
          <span className='mt-1 line-clamp-2 min-h-8 text-xs text-olive-600'>
            {body}
          </span>
        </span>
      </Link>
      <div className='mt-auto flex min-h-8 flex-wrap gap-2 pt-3'>
        {actions.map(({ href: actionHref, label, linkProps }) => {
          const isExternalHref = externalHrefPattern.test(actionHref)

          if (isExternalHref) {
            return (
              <a
                key={actionHref}
                href={actionHref}
                className={actionLinkStyles}
                {...linkProps}
              >
                {label}
              </a>
            )
          }

          return (
            <Link
              key={actionHref}
              href={actionHref}
              className={actionLinkStyles}
              {...linkProps}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </li>
  )
}
