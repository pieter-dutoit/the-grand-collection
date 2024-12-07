/**
 * Custom hook to determine if a given media query matches the current viewport.
 *
 * @param query - The media query string to evaluate.
 * @returns A boolean indicating whether the media query matches the current viewport.
 *
 * @remarks
 * This hook uses the `window.matchMedia` API to evaluate the media query.
 * It is important to note that this hook should not be used as a replacement for CSS media queries.
 * CSS media queries are more performant and should be used for styling purposes.
 * This hook is useful for conditional rendering or logic based on viewport size in JavaScript.
 */
'use client'

import { useEffect, useState } from 'react'

export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    setMatches(window.matchMedia(query).matches)
  }, [query])

  return matches
}
