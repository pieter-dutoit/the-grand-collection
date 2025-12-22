import {
  RichText as RichTextConverter,
  type JSXConvertersFunction
} from '@payloadcms/richtext-lexical/react'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { twMerge } from 'tailwind-merge'

import Image from '@/components/ui/image'
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

    const { url, alt } = extractImageProps(node.value)
    if (!url) return null

    return (
      <figure className='my-8'>
        <div className='relative aspect-video w-full overflow-hidden rounded-2xl border border-olive-200 bg-olive-100'>
          <Image
            src={url}
            alt=''
            fill
            className='not-prose z-0 scale-125 object-cover object-center blur-xl'
            sizes='(min-width: 1024px) 768px, 90vw'
          />
          <Image
            src={url}
            alt={alt}
            fill
            className='not-prose z-10 object-contain object-center'
            sizes='(min-width: 1024px) 768px, 90vw'
          />
        </div>
        {alt ? (
          <figcaption className='mt-3 text-sm text-olive-700'>{alt}</figcaption>
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
        'prose max-w-none prose-headings:font-light prose-p:leading-relaxed prose-p:text-olive-800 prose-blockquote:text-olive-800 prose-figcaption:text-olive-700 prose-strong:text-olive-900 prose-li:opacity-90 prose-img:rounded-2xl',
        className
      )}
    />
  )
}
