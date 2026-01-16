import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DestinationNav() {
  return (
    <nav
      aria-label='On this page'
      className='sticky top-16 z-40 border-b border-olive-200 bg-white/70 py-2 backdrop-blur-md'
    >
      <ul className='container mx-auto flex w-full flex-row items-center gap-2 overflow-x-auto py-2'>
        <li>
          <Button asChild colour='olive' variant='outline'>
            <Link href={`#travel-guides`}>Travel guides</Link>
          </Button>
        </li>
        <li>
          <Button asChild variant='outline' colour='olive'>
            <Link href={`#where-to-stay`}>Where to stay</Link>
          </Button>
        </li>

        <li>
          <Button asChild variant='outline' colour='olive'>
            <Link href='#faq'>FAQs</Link>
          </Button>
        </li>
      </ul>
    </nav>
  )
}
