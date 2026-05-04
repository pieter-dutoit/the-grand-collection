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
            className='lg:prose-lg w-full'
          />
        </section>

        {/* Right content - sticky */}
        <div className='sticky top-16 hidden w-80 flex-col self-start py-10 md:block lg:py-20'>
          <nav
            aria-label='On this page'
            className='border-gold-100 flex w-full flex-col items-start gap-2 rounded-lg border p-4'
          >
            <h2 className='text-lg font-extrabold text-olive-600'>
              On this page
            </h2>
            {headingLinks.length > 0 && (
              <div className='flex w-full flex-col items-start gap-2'>
                <p className='text-xs font-semibold tracking-wide text-olive-400 capitalize'>
                  In this article
                </p>
                <ul className='flex w-full flex-col items-start'>
                  {headingLinks.map((heading) => (
                    <li key={heading.id} className='w-full overflow-hidden'>
                      <Button
                        asChild
                        variant='link'
                        colour='olive'
                        className='w-full min-w-0 justify-start'
                      >
                        <Link
                          href={`#${heading.id}`}
                          data-analytics-event='article_anchor_click'
                          data-analytics-source-section='article_toc'
                          data-analytics-cta-label={heading.text}
                          data-analytics-destination-slug={destination.slug}
                          data-analytics-article-slug={article.slug}
                        >
                          <span className='block w-full truncate text-left'>
                            {heading.text}
                          </span>
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className='border-gold-100 mt-4 flex w-full flex-col items-start gap-2 border-t pt-4'>
              <p className='text-xs font-semibold tracking-wide text-olive-400 capitalize'>
                Quick links
              </p>
              <ul className='flex w-full flex-col items-start'>
                <li>
                  <Button asChild variant='ghost' colour='olive'>
                    <Link
                      href={`#${article.slug}`}
                      data-analytics-event='article_anchor_click'
                      data-analytics-source-section='article_quick_links'
                      data-analytics-cta-label='Back to top'
                      data-analytics-destination-slug={destination.slug}
                      data-analytics-article-slug={article.slug}
                    >
                      Back to top
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant='link' colour='olive'>
                    <Link
                      href={`#more-articles`}
                      data-analytics-event='article_anchor_click'
                      data-analytics-source-section='article_quick_links'
                      data-analytics-cta-label='More travel guides'
                      data-analytics-destination-slug={destination.slug}
                      data-analytics-article-slug={article.slug}
                    >
                      More travel guides
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant='ghost' colour='olive'>
                    <Link
                      href={`#where-to-stay`}
                      data-analytics-event='article_guesthouse_click'
                      data-analytics-source-section='article_quick_links'
                      data-analytics-cta-label={`Where to stay in ${destination.name}`}
                      data-analytics-destination-slug={destination.slug}
                      data-analytics-article-slug={article.slug}
                    >
                      Where to stay in {destination.name}
                    </Link>
                  </Button>
                </li>

                {hasFaq && (
                  <li>
                    <Button asChild variant='ghost' colour='olive'>
                      <Link
                        href='#faq'
                        data-analytics-event='article_anchor_click'
                        data-analytics-source-section='article_quick_links'
                        data-analytics-cta-label='FAQs'
                        data-analytics-destination-slug={destination.slug}
                        data-analytics-article-slug={article.slug}
                      >
                        FAQs
                      </Link>
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
