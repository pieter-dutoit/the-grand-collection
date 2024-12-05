'use client'

import dynamic from 'next/dynamic'

import { NavigationMenuTrigger } from '@/components/ui/navigation-menu'

import { NavOption } from '../data'
import useMediaQuery from '@/hooks/use-media-query'

const DesktopMenuDropdown = dynamic(() => import('./dropdown'), { ssr: false })

export default function DropdownWrapper({
  label,
  options
}: {
  label: string
  options: NavOption[]
}): JSX.Element | null {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <>
      <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
      {isDesktop && <DesktopMenuDropdown options={options} />}
    </>
  )
}
