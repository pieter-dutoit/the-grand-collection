import Link from 'next/link'

import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { getButtonVariants } from '@/components/ui/button'

import type { NavOption } from '../../data'
import { ExternalLink } from 'lucide-react'

// import Image from 'next/image'
// import { extractImageProps } from '@/lib/utils'

// function DetailedNavLink({ image }: NavOption): JSX.Element {
//   const { url, alt } = image ? extractImageProps(image) : { url: '', alt: '' }
//   return (
//     <div>
//       {image && (
//         <Image
//           width={80}
//           height={80}
//           alt={alt}
//           src={url}
//           className='content-center object-cover'
//         />
//       )}
//       <div className='flex w-[300px] flex-col items-end'>{text}</div>
//     </div>
//   )
// }

function ExternalNavLink({
  label,
  href,
  externalSiteName
}: NavOption): JSX.Element {
  return (
    <NavigationMenuLink
      href={href}
      target='_blank'
      className='my-1 flex min-w-48 flex-row items-center justify-end rounded-sm border border-olive-500 bg-gold-50/50 py-1 pl-4 pr-2 transition-colors hover:border-olive-950 active:border-olive-500'
    >
      <div className='flex flex-col items-end'>
        <span className='text-nowrap font-bold text-olive-800'>
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
        className={getButtonVariants({
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
    detailed: DefaultLink,
    external: ExternalNavLink
  }[variant]

  return <LinkType {...props} />
}
