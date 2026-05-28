'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

type NavbarShellProps = {
  children: React.ReactNode
}

const MOBILE_MENU_CLOSE_ANIMATION_MS = 200
const DESKTOP_NAV_MEDIA_QUERY = '(min-width: 80rem)'

function isElementVisible(element: HTMLElement): boolean {
  return (
    !element.hidden &&
    element.getClientRects().length > 0 &&
    window.getComputedStyle(element).visibility !== 'hidden'
  )
}

function moveFocusBeforeHide(
  container: HTMLElement,
  fallbackFocusElement: HTMLElement | null
) {
  const activeElement = document.activeElement

  if (
    !(activeElement instanceof HTMLElement) ||
    !container.contains(activeElement)
  ) {
    return
  }

  if (fallbackFocusElement && isElementVisible(fallbackFocusElement)) {
    fallbackFocusElement.focus({ preventScroll: true })
    return
  }

  activeElement.blur()
}

export default function NavbarShell({ children }: NavbarShellProps) {
  const rootRef = useRef<HTMLElement>(null)
  const mobileCloseTimerRef = useRef<number | null>(null)
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobilePresent, setIsMobilePresent] = useState(false)
  const [isDesktopNav, setIsDesktopNav] = useState(false)

  const isMobileMenuVisible = !isDesktopNav && isMobilePresent
  const isMobileMenuExpanded = !isDesktopNav && isMobileOpen

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    root
      .querySelectorAll<HTMLButtonElement>('[data-nav-trigger]')
      .forEach((trigger) => {
        const isExpanded = trigger.dataset.navTrigger === activeMenu
        trigger.setAttribute('aria-expanded', String(isExpanded))
      })

    root.querySelectorAll<HTMLElement>('[data-nav-panel]').forEach((panel) => {
      const isActive = panel.dataset.navPanel === activeMenu
      const trigger = Array.from(
        root.querySelectorAll<HTMLButtonElement>('[data-nav-trigger]')
      ).find((item) => item.dataset.navTrigger === panel.dataset.navPanel)

      panel.dataset.state = isActive ? 'open' : 'closed'

      if (!isActive) {
        moveFocusBeforeHide(panel, trigger ?? null)
      }

      panel.setAttribute('aria-hidden', String(!isActive))
      panel.toggleAttribute('inert', !isActive)
    })
  }, [activeMenu])

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_NAV_MEDIA_QUERY)

    const handleMediaQueryChange = () => {
      const isDesktop = mediaQuery.matches

      setIsDesktopNav(isDesktop)

      if (isDesktop) {
        if (mobileCloseTimerRef.current) {
          window.clearTimeout(mobileCloseTimerRef.current)
          mobileCloseTimerRef.current = null
        }

        setIsMobileOpen(false)
        setIsMobilePresent(false)
      }
    }

    handleMediaQueryChange()
    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    root
      .querySelectorAll<HTMLButtonElement>('[data-mobile-menu-trigger]')
      .forEach((trigger) => {
        trigger.setAttribute('aria-expanded', String(isMobileMenuExpanded))
      })

    root.querySelectorAll<HTMLElement>('[data-mobile-menu]').forEach((menu) => {
      const isPanel = menu.hasAttribute('data-mobile-menu-panel')

      menu.hidden = !isMobileMenuVisible
      menu.dataset.state = isMobileMenuExpanded ? 'open' : 'closed'

      if (isPanel) {
        if (!isMobileMenuExpanded) {
          const trigger =
            Array.from(
              root.querySelectorAll<HTMLButtonElement>(
                '[data-mobile-menu-trigger]'
              )
            ).find(isElementVisible) ?? null

          moveFocusBeforeHide(menu, trigger)
        }

        menu.setAttribute('aria-hidden', String(!isMobileMenuExpanded))
        menu.toggleAttribute('inert', !isMobileMenuExpanded)
      }
    })

    document.body.style.overflow = isMobileMenuVisible ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuExpanded, isMobileMenuVisible])

  useEffect(() => {
    if (mobileCloseTimerRef.current) {
      window.clearTimeout(mobileCloseTimerRef.current)
      mobileCloseTimerRef.current = null
    }

    if (isMobileOpen) {
      setIsMobilePresent(true)
      return
    }

    if (!isMobilePresent) return

    mobileCloseTimerRef.current = window.setTimeout(() => {
      setIsMobilePresent(false)
      mobileCloseTimerRef.current = null
    }, MOBILE_MENU_CLOSE_ANIMATION_MS)

    return () => {
      if (mobileCloseTimerRef.current) {
        window.clearTimeout(mobileCloseTimerRef.current)
        mobileCloseTimerRef.current = null
      }
    }
  }, [isMobileOpen, isMobilePresent])

  useEffect(() => {
    setActiveMenu(null)
    setIsMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const mobileTrigger = target.closest<HTMLButtonElement>(
        '[data-mobile-menu-trigger]'
      )
      const desktopTrigger =
        target.closest<HTMLButtonElement>('[data-nav-trigger]')
      const closeTrigger = target.closest<HTMLElement>('[data-nav-close]')
      const link = target.closest<HTMLAnchorElement>('a')

      if (mobileTrigger && root.contains(mobileTrigger)) {
        setActiveMenu(null)
        setIsMobileOpen((current) => !current)
        return
      }

      if (desktopTrigger && root.contains(desktopTrigger)) {
        const nextMenu = desktopTrigger.dataset.navTrigger
        if (!nextMenu) return
        setIsMobileOpen(false)
        setActiveMenu((current) => (current === nextMenu ? null : nextMenu))
        return
      }

      if (
        (closeTrigger && root.contains(closeTrigger)) ||
        (link && root.contains(link))
      ) {
        setActiveMenu(null)
        setIsMobileOpen(false)
      }
    }

    root.addEventListener('click', handleClick)

    return () => {
      root.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setActiveMenu(null)
      setIsMobileOpen(false)
    }

    const handlePointerDown = (event: PointerEvent) => {
      const root = rootRef.current
      if (!root || root.contains(event.target as Node)) return
      setActiveMenu(null)
      setIsMobileOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  return (
    <header
      ref={rootRef}
      className="sticky top-0 left-0 z-50 h-16 w-full text-white before:pointer-events-none before:absolute before:inset-0 before:z-0 before:border-b before:border-white/10 before:bg-black/60 before:shadow-[0_12px_36px_rgba(0,0,0,0.18)] before:backdrop-blur-sm before:backdrop-saturate-150 before:content-['']"
    >
      {children}
    </header>
  )
}
