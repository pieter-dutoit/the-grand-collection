'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

type NavbarShellProps = {
  children: React.ReactNode
}

const MOBILE_MENU_CLOSE_ANIMATION_MS = 200

export default function NavbarShell({ children }: NavbarShellProps) {
  const rootRef = useRef<HTMLElement>(null)
  const mobileCloseTimerRef = useRef<number | null>(null)
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobilePresent, setIsMobilePresent] = useState(false)

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
      panel.dataset.state = isActive ? 'open' : 'closed'
      panel.setAttribute('aria-hidden', String(!isActive))
      panel.toggleAttribute('inert', !isActive)
    })
  }, [activeMenu])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    root
      .querySelectorAll<HTMLButtonElement>('[data-mobile-menu-trigger]')
      .forEach((trigger) => {
        trigger.setAttribute('aria-expanded', String(isMobileOpen))
      })

    root.querySelectorAll<HTMLElement>('[data-mobile-menu]').forEach((menu) => {
      const isPanel = menu.hasAttribute('data-mobile-menu-panel')

      menu.hidden = !isMobilePresent
      menu.dataset.state = isMobileOpen ? 'open' : 'closed'

      if (isPanel) {
        menu.setAttribute('aria-hidden', String(!isMobileOpen))
        menu.toggleAttribute('inert', !isMobileOpen)
      }
    })

    document.body.style.overflow =
      isMobileOpen || isMobilePresent ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen, isMobilePresent])

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
      className='sticky top-0 left-0 z-50 h-16 w-full border-b border-b-olive-100 bg-white'
    >
      {children}
    </header>
  )
}
