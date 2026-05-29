import { Button } from '@/components/ui/button'
import HashLink from '@/components/hash-link'

export default function DestinationNav() {
  return (
    <nav
      aria-label='On this page'
      className='sticky top-16 z-40 border-b border-olive-200 bg-white/70 py-2 backdrop-blur-md'
    >
      <ul className='container mx-auto flex w-full flex-row items-center gap-2 overflow-x-auto py-2'>
        <li>
          <Button asChild colour='olive' variant='outline'>
            <HashLink
              href={`#travel-guides`}
              data-analytics-event='article_anchor_click'
              data-analytics-source-section='destination_section_nav'
              data-analytics-cta-label='Travel guides'
            >
              Travel guides
            </HashLink>
          </Button>
        </li>
        <li>
          <Button asChild variant='outline' colour='olive'>
            <HashLink
              href={`#where-to-stay`}
              data-analytics-event='article_guesthouse_click'
              data-analytics-source-section='destination_section_nav'
              data-analytics-cta-label='Where to stay'
            >
              Where to stay
            </HashLink>
          </Button>
        </li>

        <li>
          <Button asChild variant='outline' colour='olive'>
            <HashLink
              href='#faq'
              data-analytics-event='article_anchor_click'
              data-analytics-source-section='destination_section_nav'
              data-analytics-cta-label='FAQs'
            >
              FAQs
            </HashLink>
          </Button>
        </li>
      </ul>
    </nav>
  )
}
