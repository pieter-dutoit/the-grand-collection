'use client'

import Link from 'next/link'
import {
  forwardRef,
  type ComponentProps,
  type MouseEvent as ReactMouseEvent
} from 'react'

type HashLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

const isModifiedClick = (event: ReactMouseEvent<HTMLAnchorElement>) =>
  event.metaKey || event.altKey || event.ctrlKey || event.shiftKey

const getTargetId = (hash: string) => {
  const rawHash = hash.slice(1)

  if (!rawHash) {
    return null
  }

  try {
    return decodeURIComponent(rawHash)
  } catch {
    return rawHash
  }
}

const shouldUseNativeNavigation = (
  event: ReactMouseEvent<HTMLAnchorElement>,
  anchor: HTMLAnchorElement,
  target?: ComponentProps<typeof Link>['target']
) => {
  if (event.defaultPrevented) return true
  if (event.button !== 0) return true
  if (isModifiedClick(event)) return true
  if (anchor.hasAttribute('download')) return true

  const linkTarget = target ?? anchor.getAttribute('target')

  return !!linkTarget && linkTarget !== '_self'
}

const HashLink = forwardRef<HTMLAnchorElement, HashLinkProps>(
  ({ href, onClick, target, ...props }, ref) => {
    const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
      onClick?.(event)

      const anchor = event.currentTarget

      if (shouldUseNativeNavigation(event, anchor, target)) {
        return
      }

      let url: URL

      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }

      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search
      ) {
        return
      }

      const targetId = getTargetId(url.hash)

      if (!targetId) {
        return
      }

      const targetElement = document.getElementById(targetId)

      if (!targetElement) {
        return
      }

      event.preventDefault()

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? 'instant' : 'smooth',
        block: 'start'
      })
      window.history.replaceState(
        null,
        '',
        `${url.pathname}${url.search}${url.hash}`
      )
    }

    return (
      <Link
        ref={ref}
        href={href}
        target={target}
        onClick={handleClick}
        {...props}
      />
    )
  }
)

HashLink.displayName = 'HashLink'

export default HashLink
