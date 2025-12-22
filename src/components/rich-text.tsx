import {
  RichText as RichTextConverter,
  type JSXConvertersFunction
} from '@payloadcms/richtext-lexical/react'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { twMerge } from 'tailwind-merge'

import BlurredBackdropImage from '@/components/ui/blurred-backdrop-image'
import { extractImageProps } from '@/lib/utils'
import type { Media } from '@/payload/payload-types'

type Props = {
  data: SerializedEditorState
  className?: string
}

const isMedia = (value: unknown): value is Media => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'url' in value &&
    'mimeType' in value &&
    'filename' in value
  )
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters
}) => ({
  ...defaultConverters,
  upload: ({ node }) => {
    if (!isMedia(node.value)) return null

    const { url, alt, width, height } = extractImageProps(node.value)
    if (!url) return null

    const aspectRatio = width && height ? width / height : undefined
    const isPortrait = typeof aspectRatio === 'number' && aspectRatio < 1
    const maxWidth = 'max-w-full'
    const sizes = isPortrait
      ? '(min-width: 1024px) 576px, 90vw'
      : '(min-width: 1024px) 768px, 90vw'

    return (
      <figure className='my-8'>
        <BlurredBackdropImage
          src={url}
          alt={alt}
          sizes={sizes}
          aspectRatio={aspectRatio}
          containerClassName={twMerge(
            'w-full rounded-2xl border-2 border-olive-200 bg-olive-100 lg:max-h-[50vh]',
            maxWidth
          )}
        />
        {alt ? (
          <figcaption className='mt-2 text-xs font-semibold text-olive-500'>
            Image: {alt}
          </figcaption>
        ) : null}
      </figure>
    )
  }
})

export function ArticleRichText({ data, className }: Props) {
  return (
    <RichTextConverter
      data={data}
      converters={jsxConverters}
      className={twMerge(
        'prose max-w-none prose-headings:font-light prose-p:leading-relaxed prose-p:text-olive-800 prose-blockquote:text-olive-800 prose-figcaption:text-xs prose-figcaption:font-semibold prose-figcaption:text-olive-500 prose-strong:text-olive-900 prose-li:opacity-90 prose-img:rounded-2xl',
        className
      )}
    />
  )
}
