import Link from 'next/link'

import type { Article } from '@/payload/payload-types'
import { cn, extractImageProps } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import BlurredBackdropImage from '@/components/ui/blurred-backdrop-image'

type ArticleTileBaseProps = {
  article: Pick<
    Article,
    | 'id'
    | 'slug'
    | 'title'
    | 'excerpt'
    | 'thumbnail'
    | 'featured'
    | 'createdAt'
    | 'updatedAt'
  >
  destinationSlug: string
  badgeText?: string
}

type ArticleTileProps = ArticleTileBaseProps & {
  className?: string
}

export default function ArticleTile({
  article,
  destinationSlug,
  className
}: ArticleTileProps) {
  const { url, alt } = extractImageProps(article.thumbnail)
  const thumbnailAlt = alt || article.title
  const href = `/destinations/${destinationSlug}/guides/${article.slug}`

  return (
    <div
      className={cn(
        'group relative w-full rounded-2xl border border-olive-200 bg-white transition-shadow hover:shadow-lg',
        className
      )}
    >
      <Link href={href} className='block'>
        {url && (
          <BlurredBackdropImage
            src={url}
            alt={thumbnailAlt}
            sizes='(min-width: 1024px) 320px, (min-width: 768px) 45vw, 85vw'
            containerClassName='relative rounded-t-xl bg-olive-100 z-0'
            foregroundClassName='transition duration-300 group-hover:scale-105'
          />
        )}

        {article.featured && (
          <Badge className='absolute left-4 top-4 z-10'>Featured</Badge>
        )}

        <div className='flex flex-col items-start gap-2 p-4'>
          <h3 className='line-clamp-1 text-lg font-semibold text-olive-900 transition group-hover:text-olive-800'>
            {article.title}
          </h3>

          <p className='line-clamp-1 text-sm text-olive-700'>
            {article.excerpt}
          </p>
        </div>
      </Link>
    </div>
  )
}
