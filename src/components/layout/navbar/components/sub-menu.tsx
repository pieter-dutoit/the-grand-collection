'use client'

import dynamic from 'next/dynamic'
import { twMerge } from 'tailwind-merge'

import {
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import useMediaQuery from '@/hooks/use-media-query'

import NavLink from './nav-link'
import { NavLabel, NavOption } from '../data'
import { getButtonStyles } from '@/components/ui/button'

// Prevent the dropdown from being rendered on the server since it's only used on desktop.
const NavigationMenuContent = dynamic(
  () =>
    import('@/components/ui/navigation-menu').then(
      (mod) => mod.NavigationMenuContent
    ),
  {
    ssr: false
  }
)

export default function SubMenu({
  label,
  options
}: {
  label: NavLabel
  options: NavOption[]
}): JSX.Element | null {
  // The purpose of this hook is to prevent loading desktop dropdown menus on mobile.
  // It's not for responsive design.
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <>
      {/* DESKTOP */}
      {/* Hide on mobile using CSS */}
      <NavigationMenuTrigger
        className={twMerge(
          'hidden md:flex',
          getButtonStyles({ ...label }),
          'hidden md:flex'
        )}
        aria-hidden={!isDesktop}
      >
        {label.text}
      </NavigationMenuTrigger>

      {/* Only render on desktop since it adversely affects mobile 
      performance (unused javascript + longer load time) */}
      {isDesktop && (
        <NavigationMenuContent>
          {options.map((option) => (
            <NavLink key={option.href + '-desktop'} {...option} />
          ))}
        </NavigationMenuContent>
      )}

      {/* MOBILE */}
      {/* Hide in Desktop using CSS */}
      {/* Load regardless of Desktop/Mobile to ensure it's available 
      immediately on mobile devices. Negligible impact on Desktop performance */}
      <p className='my-2 ml-4 w-full text-left text-lg font-bold text-gold-500 md:hidden'>
        {label.text}
      </p>
      <NavigationMenuList className='flex flex-col items-start space-x-0 pl-4 md:hidden'>
        {options.map((option: NavOption) => {
          return (
            <NavigationMenuItem
              className='flex pl-4'
              key={option.label.text + '-mobile'}
            >
              <NavLink {...option} />
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </>
  )
}
