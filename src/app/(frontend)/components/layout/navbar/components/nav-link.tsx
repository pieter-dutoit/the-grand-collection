import Link from 'next/link'
import { Lock, MapPin } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import Image from 'next/image'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { getButtonStyles } from '@/components/ui/button'
import { extractImageProps } from '@/lib/utils'

import type { NavOption } from '../data'

function BlockLink({ label, href }: NavOption): JSX.Element {
  const { variant, color, text } = label

  return (
    <NavigationMenuLink
      asChild
      className={twMerge(
        getButtonStyles({
          ...label,
          variant,
          colour: color
        }),
        'mb-1 w-full bg-olive-50 lg:bg-olive-50/50'
      )}
    >
      <Link href={href ?? '#'}>{text}</Link>
    </NavigationMenuLink>
  )
}

function DetailedNavLink({
  label,
  href,
  image,
  address
}: NavOption): JSX.Element {
  const { text } = label
  const { alt, url } = image ? extractImageProps(image) : { alt: '', url: '' }
  return (
    <NavigationMenuLink
      asChild
      className='my-1 w-[250px] overflow-hidden rounded-lg border border-olive-100 bg-olive-50 transition-colors hover:bg-olive-50/50 active:border-olive-300 sm:w-[350px] lg:bg-transparent'
    >
      <Link href={href ?? '#'}>
        <div className='flex grow'>
          <Image
            width={90}
            height={90}
            alt={alt}
            src={url}
            className='h-14 w-12 content-center rounded-l-lg bg-olive-100 object-cover sm:size-[90px]'
          />

          <div className='flex size-full flex-col items-start px-2 py-1'>
            <h3 className='text-nowrap text-base font-semibold text-olive-700'>
              {text}
            </h3>

            <p className='my-1 flex items-center text-xs font-semibold text-olive-500 sm:text-sm'>
              <MapPin className='mr-1 size-4' /> {address}
            </p>

            <p
              className={twMerge(
                getButtonStyles({
                  variant: 'link',
                  colour: 'olive',
                  size: 'sm'
                }),
                'hidden pl-0 sm:flex'
              )}
            >
              View details
            </p>
          </div>
        </div>
      </Link>
    </NavigationMenuLink>
  )
}

function ExternalNavLink({
  label,
  href,
  externalSiteName,
  isHighlighted
}: NavOption): JSX.Element {
  const highlightedStyles = isHighlighted ? 'bg-olive-100' : 'bg-white'

  return (
    <NavigationMenuLink
      href={href}
      className={twMerge(
        'my-1 flex min-w-48 flex-row items-center justify-end rounded-sm border border-olive-200 py-1 pl-4 pr-2 transition-colors hover:border-olive-950 active:border-olive-500',
        highlightedStyles
      )}
    >
      <div className='flex flex-col items-end'>
        <span className='text-nowrap text-base text-olive-800'>
          {label.text}
        </span>
        <div className='flex items-center gap-1'>
          <Lock className='size-2' />
          <em className='text-nowrap text-xs'>
            Opens <strong className='font-semibold'>{externalSiteName}</strong>
          </em>
        </div>
      </div>
    </NavigationMenuLink>
  )
}

function DefaultLink({ label, href }: NavOption): JSX.Element {
  const { text, variant, color } = label

  return (
    <NavigationMenuLink
      asChild
      className={getButtonStyles({
        ...label,
        variant,
        colour: color
      })}
    >
      <Link href={href ?? '#'}>{text}</Link>
    </NavigationMenuLink>
  )
}

export default function NavLink(props: NavOption): JSX.Element {
  const { variant = 'default' } = props

  const LinkType = {
    default: DefaultLink,
    detailed: DetailedNavLink,
    external: ExternalNavLink,
    block: BlockLink
  }[variant]

  return <LinkType {...props} />
}
