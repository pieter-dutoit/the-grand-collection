import Link from 'next/link'
import { ExternalLink, MapPin } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { getButtonStyles } from '@/components/ui/button'
import { extractImageProps } from '@/lib/utils'

import type { NavOption } from '../data'

function BlockLink({ label, href }: NavOption): JSX.Element {
  const { variant, color, text } = label
  return (
    <Link legacyBehavior href={href ?? '#'} passHref>
      <NavigationMenuLink
        className={twMerge(
          getButtonStyles({
            ...label,
            variant,
            colour: color
          }),
          'mb-1 w-full bg-olive-50 md:bg-olive-50/50'
        )}
      >
        {text}
      </NavigationMenuLink>
    </Link>
  )
}

function DetailedNavLink({
  label,
  href,
  image,
  address
}: NavOption): JSX.Element {
  const { text } = label
  const { alt } = image ? extractImageProps(image) : { alt: '' }
  return (
    <Link legacyBehavior href={href ?? '#'} passHref className='my-1 flex'>
      <NavigationMenuLink className='my-1 w-[250px] overflow-hidden rounded-lg border border-olive-100 bg-olive-50 transition-colors hover:bg-olive-50/50 active:border-olive-300 sm:w-[350px] md:bg-transparent'>
        <div className='flex grow'>
          <Image
            width={90}
            height={90}
            alt={alt}
            src={'/'}
            className='h-14 w-12 content-center rounded-l-lg bg-olive-100 object-cover sm:size-[90px]'
            loading='lazy'
          />

          <div className='flex size-full flex-col items-start px-2 py-1'>
            <h3 className='text-nowrap text-base font-semibold text-olive-700'>
              {text}
            </h3>

            <p className='my-1 flex items-center text-xs font-semibold italic text-olive-500 sm:text-sm'>
              <MapPin className='mr-1 size-4' /> {address}
            </p>

            <p
              className={twMerge(
                getButtonStyles({
                  variant: 'link',
                  colour: 'default',
                  size: 'sm'
                }),
                'hidden pl-0 sm:flex'
              )}
            >
              See More
            </p>
          </div>
        </div>
      </NavigationMenuLink>
    </Link>
  )
}

function ExternalNavLink({
  label,
  href,
  externalSiteName
}: NavOption): JSX.Element {
  return (
    <NavigationMenuLink
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='my-1 flex min-w-48 flex-row items-center justify-end rounded-sm border border-olive-200 bg-gold-50/0 py-1 pl-4 pr-2 transition-colors hover:border-olive-950 active:border-olive-500'
    >
      <div className='flex flex-col items-end'>
        <span className='text-nowrap text-base text-olive-800'>
          {label.text}
        </span>
        <em className='text-nowrap text-xs'>
          Book on <strong className='font-semibold'>{externalSiteName}</strong>
        </em>
      </div>
      <ExternalLink className='ml-2 text-olive-800' />
    </NavigationMenuLink>
  )
}

function DefaultLink({ label, href }: NavOption): JSX.Element {
  const { text, variant, color } = label

  return (
    <Link legacyBehavior href={href ?? '#'} passHref>
      <NavigationMenuLink
        className={getButtonStyles({
          ...label,
          variant,
          colour: color
        })}
      >
        {text}
      </NavigationMenuLink>
    </Link>
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
