'use client'

import { useEffect, useState } from 'react'

export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    setMatches(window.matchMedia(query).matches)
  }, [query])

  return matches
}
