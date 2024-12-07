'use client'

import dynamic from 'next/dynamic'

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

import { NavLabel, NavOption } from './data'
import useMediaQuery from '@/hooks/use-media-query'
import Link from 'next/link'

// Prevent the dropdown from being rendered on the server since it's only used on desktop.
const DropdownMenu = dynamic(() => import('./dropdown-menu'), {
  ssr: false
})

export default function NestedNav({
  label,
  options
}: {
  label: NavLabel
  options: NavOption[]
}): JSX.Element | null {
  // The purpose of this hook is to lazy load the dropdown on mobile devices.
  // It's not for responsive design.
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <>
      {/* DESKTOP */}
      {/* Hide on mobile using CSS */}
      <NavigationMenuTrigger
        className='hidden md:flex'
        aria-hidden={!isDesktop}
      >
        {label.text}
      </NavigationMenuTrigger>

      {/* Only render on desktop since it adversely affects mobile 
      performance (unused javascript + longer load time) */}
      {isDesktop && <DropdownMenu options={options} />}

      {/* MOBILE */}
      {/* Hide in Desktop using CSS */}
      {/* Load regardless of Desktop/Mobile to ensure it's available 
      immediately on mobile devices. Negligible impact on Desktop performance */}
      <p className='my-2 ml-4 w-full text-left text-lg font-bold text-gold-500 md:hidden'>
        {label.text}
      </p>
      <NavigationMenuList className='flex flex-col items-start space-x-0 pl-4 md:hidden'>
        {options.map(({ label, href }: NavOption) => (
          <NavigationMenuItem key={label.text}>
            <Link href={href ?? '#'} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {label.text}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </>
  )
}
