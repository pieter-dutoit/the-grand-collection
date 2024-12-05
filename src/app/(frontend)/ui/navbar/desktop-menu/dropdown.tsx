'use client'

import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { NavOption } from '../data'
// import DesktopMenuDropdownContent from './dropdown-content'

export default function DesktopMenuDropdown({
  // options,
  label
}: {
  options: NavOption[]
  label: string
}): JSX.Element {
  return (
    <Button variant='ghost' className='text-md w-full justify-start text-olive'>
      {label}
      <ChevronDown />
      {/* <DesktopMenuDropdownContent options={options} /> */}
    </Button>
  )
}
