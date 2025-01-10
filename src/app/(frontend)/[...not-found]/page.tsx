// Workaround for showing not-found.tsx on a grouped route:
// https://github.com/vercel/next.js/discussions/50034

import { notFound } from 'next/navigation'

export default function NotFoundDummy() {
  notFound()
}
