'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { Copy, Mail, MessageCircle, Share2 } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

type ShareButtonProps = Omit<ButtonProps, 'children' | 'onClick'> & {
  title?: string
  text?: string
  url?: string
}

const buildWhatsAppHref = ({ title, url }: { title?: string; url: string }) => {
  const message = title ? `Check out this guide: ${title}\n\n${url}` : url
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

const buildMailtoHref = ({ title, url }: { title?: string; url: string }) => {
  const subject = title
    ? `Guide: ${title}`
    : 'A guide from The Grand Collection'
  const body = title
    ? `I thought you might like this:\n\n${title}\n\n${url}`
    : url

  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body
  )}`
}

export function ShareButton({
  title,
  text,
  url,
  className,
  type = 'button',
  ...buttonProps
}: ShareButtonProps) {
  const resolvedUrlRef = React.useRef<string>('')

  React.useEffect(() => {
    resolvedUrlRef.current = url || window.location.href
  }, [url])

  const getResolvedUrl = () => {
    return resolvedUrlRef.current || url || window.location.href
  }

  const handleCopy = async () => {
    const shareUrl = getResolvedUrl()

    if (!navigator.clipboard?.writeText) {
      toast.error('Clipboard not available')
      return
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Link copied to clipboard')
    } catch {
      toast.error('Failed to copy link')
    }
  }

  const handleNativeShare = async () => {
    const shareUrl = getResolvedUrl()
    const shareData: ShareData = {
      title: title ?? document.title,
      ...(text ? { text } : {}),
      url: shareUrl
    }

    if (navigator.share) {
      try {
        if (!navigator.canShare || navigator.canShare(shareData)) {
          await navigator.share(shareData)
          return
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        toast.error('Failed to share')
        return
      }
    }

    await handleCopy()
  }

  const hrefUrl = url || ''
  const hrefWhatsApp = hrefUrl
    ? buildWhatsAppHref({ title, url: hrefUrl })
    : undefined
  const hrefEmail = hrefUrl
    ? buildMailtoHref({ title, url: hrefUrl })
    : undefined

  const dropdownItemClassName =
    'flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gold-200 px-3 py-2 text-left text-sm font-medium text-olive-800 transition-transform hover:bg-olive-50 focus:bg-olive-50 focus:text-olive-900 active:scale-[0.98]'

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          {...buttonProps}
          type={type}
          className={cn('transition-transform active:scale-[0.95]', className)}
          aria-label='Share article'
        >
          <Share2 className='size-4' />
          <span className='sr-only'>Share article</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        sideOffset={8}
        className='space-y-2 rounded-lg border border-olive-200 bg-olive-50 p-2'
      >
        <DropdownMenuItem asChild className='p-0'>
          <button
            type='button'
            onClick={handleCopy}
            className={dropdownItemClassName}
          >
            <Copy className='size-4 text-olive-600' />
            <span>Copy link</span>
          </button>
        </DropdownMenuItem>

        {hrefWhatsApp && (
          <DropdownMenuItem asChild className='p-0'>
            <a
              href={hrefWhatsApp}
              target='_blank'
              rel='noreferrer'
              className={dropdownItemClassName}
            >
              <MessageCircle className='size-4 text-olive-600' />
              <span>WhatsApp</span>
            </a>
          </DropdownMenuItem>
        )}

        {hrefEmail && (
          <DropdownMenuItem asChild className='p-0'>
            <a href={hrefEmail} className={dropdownItemClassName}>
              <Mail className='size-4 text-olive-600' />
              <span>Email</span>
            </a>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild className='p-0'>
          <button
            type='button'
            onClick={handleNativeShare}
            className={dropdownItemClassName}
          >
            <Share2 className='size-4 text-olive-600' />
            <span>More options</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
