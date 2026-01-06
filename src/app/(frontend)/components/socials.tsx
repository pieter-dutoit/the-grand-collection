import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import Image from 'next/image'
import { getButtonStyles } from '@/components/ui/button'
import { extractImageProps } from '@/lib/utils'
import { SocialMediaPlatform } from '@/payload/payload-types'

interface SocialProps {
  className?: string
  socials: {
    id?: string | null
    platform: string | SocialMediaPlatform
    url: string
  }[]
}

export default function Socials({
  socials,
  className = ''
}: SocialProps): JSX.Element {
  return (
    <ul className={twMerge('flex items-center gap-4', className)}>
      {socials.map((social) => {
        if (!social) return null
        const { platform, url: platformLink } = social
        if (typeof platform === 'string') return null
        const { name, icon } = platform

        const { url, alt } = extractImageProps(icon)

        return (
          <li key={platformLink} aria-label={`Link to ${name} profile`}>
            <Link
              href={platformLink}
              rel='noopener noreferrer'
              target='_blank'
              className={twMerge(
                getButtonStyles({
                  variant: 'ghost',
                  size: 'icon'
                }),
                'rounded-lg bg-white/40'
              )}
            >
              <span className='sr-only'>{name}</span>
              <Image src={url} alt={alt} height={25} width={25} />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
