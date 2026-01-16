import Link from 'next/link'

import { ArticleRichText } from '@/components/rich-text'
import { Button } from '@/components/ui/button'
import { extractH2Headings } from '@/lib/utils/richtext'

import { getArticlePageData } from '../lib/article-data'

type ArticleBodyProps = {
  destinationSlug: string
  articleSlug: string
}

export default async function ArticleBody({
  destinationSlug,
  articleSlug
}: ArticleBodyProps) {
  const { destination, article, hasFaq } = await getArticlePageData(
    destinationSlug,
    articleSlug
  )
  const headingLinks = extractH2Headings(article.body)

  return (
    <div className='relative'>
      <div className='container mx-auto flex w-full justify-between gap-8 lg:gap-12'>
        {/* Left content - Richtext */}
        <section className='flex w-full max-w-prose flex-col gap-6 py-10 lg:py-20'>
          <ArticleRichText
            data={article.body}
            headings={headingLinks}
            className='w-full lg:prose-lg'
          />
        </section>

        {/* Right content - sticky */}
        <div className='sticky top-16 hidden w-80 flex-col self-start py-10 md:block lg:py-20'>
          <nav
            aria-label='On this page'
            className='flex w-full flex-col items-end gap-2 rounded-lg border border-gold-100 p-4'
          >
            <h2 className='pr-4 text-lg font-extrabold text-olive-600'>
              On this page
            </h2>
            {headingLinks.length > 0 && (
              <div className='flex w-full flex-col items-end gap-2'>
                <p className='pr-4 text-xs font-semibold capitalize tracking-wide text-olive-400'>
                  In this article
                </p>
                <ul className='flex w-full flex-col items-end'>
                  {headingLinks.map((heading) => (
                    <li key={heading.id} className='w-full overflow-hidden'>
                      <Button
                        asChild
                        variant='link'
                        colour='olive'
                        className='w-full min-w-0 justify-end'
                      >
                        <Link href={`#${heading.id}`}>
                          <span className='block w-full truncate text-right'>
                            {heading.text}
                          </span>
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className='mt-4 flex w-full flex-col items-end gap-2 border-t border-gold-100 pt-4'>
              <p className='pr-4 text-xs font-semibold capitalize tracking-wide text-olive-400'>
                Quick links
              </p>
              <ul className='flex w-full flex-col items-end'>
                <li>
                  <Button asChild variant='ghost' colour='olive'>
                    <Link href={`#${article.slug}`}>Back to top</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant='link' colour='olive'>
                    <Link href={`#more-articles`}>More travel guides</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant='ghost' colour='olive'>
                    <Link href={`#where-to-stay`}>
                      Where to stay in {destination.name}
                    </Link>
                  </Button>
                </li>

                {hasFaq && (
                  <li>
                    <Button asChild variant='ghost' colour='olive'>
                      <Link href='#faq'>FAQs</Link>
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
