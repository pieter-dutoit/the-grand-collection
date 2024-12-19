'use client'

import { useParams } from 'next/navigation'

import createSlug from '@/payload/utils/create-slug'

import NavLink from './nav-link'
import { NavOption } from '../data'

type Props = {
  options: NavOption[]
}

export default function BookingOptions({ options }: Props): JSX.Element[] {
  const { guesthouse = '' } = useParams()

  const sorted = options.sort((a, b) => {
    if (createSlug(a.label.text) === guesthouse) return -1
    if (createSlug(b.label.text) === guesthouse) return 1
    return 0
  })

  return sorted.map((option, index) => (
    <NavLink
      key={option.href + '-booking'}
      {...option}
      isHighlighted={!!guesthouse && !index}
    />
  ))
}
