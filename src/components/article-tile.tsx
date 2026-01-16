import Link from 'next/link'

import type { Article } from '@/payload/payload-types'
import { cn, extractImageProps, formatDateLabel } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import BlurredBackdropImage from '@/components/ui/blurred-backdrop-image'

type ArticleTileBaseProps = {
  article: ArticleTileArticle
  destinationSlug: string
  badgeText?: string
}

type ArticleTileProps = ArticleTileBaseProps & {
  className?: string
}

type ArticleCategory = {
  id?: string
  name?: string | null
  slug?: string | null
}

type ArticleTileArticle = Pick<
  Article,
  | 'id'
  | 'slug'
  | 'title'
  | 'excerpt'
  | 'thumbnail'
  | 'featured'
  | 'createdAt'
  | 'updatedAt'
> & {
  categories?: (string | ArticleCategory)[] | null
}

const getCategoryLabel = (categories?: (string | ArticleCategory)[] | null) => {
  if (!Array.isArray(categories)) {
    return null
  }

  for (const category of categories) {
    if (!category || typeof category !== 'object') {
      continue
    }

    const name = typeof category.name === 'string' ? category.name.trim() : ''
    if (name) {
      return name
    }
  }

  return null
}

export default function ArticleTile({
  article,
  destinationSlug,
  className
}: ArticleTileProps) {
  const { url, alt } = extractImageProps(article.thumbnail)
  const thumbnailAlt = alt || article.title
  const href = `/destinations/${destinationSlug}/guides/${article.slug}`
  const categoryLabel = getCategoryLabel(article.categories)
  const publishedDate = formatDateLabel(article.createdAt)

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

        <ul className='absolute inset-0 z-10 flex flex-row flex-wrap gap-2 p-4'>
          {article.featured && (
            <li>
              <Badge>Featured</Badge>
            </li>
          )}
          {categoryLabel && (
            <li>
              <Badge variant='secondary'>{categoryLabel}</Badge>
            </li>
          )}
        </ul>

        <div className='flex flex-col items-start gap-2 p-4'>
          <h3 className='line-clamp-1 text-lg font-semibold text-olive-900 transition group-hover:text-olive-800'>
            {article.title}
          </h3>

          <p className='line-clamp-1 text-sm text-olive-700'>
            {article.excerpt}
          </p>

          {publishedDate && <Badge variant='outline'>{publishedDate}</Badge>}
        </div>
      </Link>
    </div>
  )
}
