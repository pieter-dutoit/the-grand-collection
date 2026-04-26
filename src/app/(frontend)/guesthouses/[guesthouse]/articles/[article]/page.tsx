import 'server-only'

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { fetchArticles, fetchGuestHouses } from '@/lib/data'
import {
  extractImageProps,
  getBaseUrl,
  getPublicImageSizeUrl
} from '@/lib/utils'
import { extractH2Headings } from '@/lib/utils/richtext'
import {
  createArticleStructuredData,
  createFaqStructuredData,
  createPageStructuredData
} from '@/lib/utils/create-structured-data'
import {
  getGuesthouseArticlesPath,
  getGuesthousePostPath,
  getGuesthouseSlug
} from '@/lib/utils/articles'
import { getGuesthousePostBreadcrumbs } from '@/lib/utils/breadcrumbs'
import { ArticleRichText } from '@/components/rich-text'
import BlurredBackdropImage from '@/components/ui/blurred-backdrop-image'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import FaqSection from '@/components/faq-section'
import JsonLd from '@/components/seo/json-ld'
import MoreArticlesSection from '@/components/more-articles'
import { ShareButton } from '@/components/share-button'

import Divider from '../../components/divider'
import { getGuesthousePostPageData } from '../lib/guesthouse-article-data'

type Props = {
  params: Promise<{ guesthouse: string; article: string }>
}

const normalizeText = (value?: string | null) => {
  if (!value) return undefined
  const trimmed = value.trim()
  return trimmed.length ? trimmed : undefined
}

export async function generateStaticParams() {
  const [articles, guesthouses] = await Promise.all([
    fetchArticles({ type: { equals: 'guesthouse_post' } }),
    fetchGuestHouses()
  ])

  const guesthouseSlugById = new Map(
    guesthouses.map((guesthouse) => [guesthouse.id, guesthouse.slug])
  )

  return articles.flatMap((article) => {
    if (!article.slug) {
      return []
    }

    const guesthouseSlug = getGuesthouseSlug(
      article.guesthouse,
      guesthouseSlugById
    )

    if (!guesthouseSlug) {
      return []
    }

    return [
      {
        guesthouse: guesthouseSlug,
        article: article.slug
      }
    ]
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guesthouse: guesthouseSlug, article: articleSlug } = await params
  const { guesthouse, article, canonical } = await getGuesthousePostPageData(
    guesthouseSlug,
    articleSlug
  )

  const seo = article.seo
  const descriptionFallback = article.excerpt
  const pageTitleFallback = `${article.title} | ${guesthouse.name}`
  const metaTitle = normalizeText(seo?.meta?.title)
  const metaDescription = normalizeText(seo?.meta?.description)
  const ogTitle = normalizeText(seo?.open_graph?.title)
  const ogDescription = normalizeText(seo?.open_graph?.description)
  const ogSiteName = normalizeText(seo?.open_graph?.site_name)

  const resolvedTitle = metaTitle ?? pageTitleFallback
  const resolvedDescription = metaDescription ?? descriptionFallback
  const resolvedOgTitle = ogTitle ?? metaTitle ?? pageTitleFallback
  const resolvedOgDescription =
    ogDescription ?? metaDescription ?? descriptionFallback

  const thumbnailProps = extractImageProps(article.thumbnail)
  const seoOgImage = seo?.open_graph?.image
  const seoOgImageProps = seoOgImage ? extractImageProps(seoOgImage) : null
  const ogImageUrl = seoOgImageProps?.url || thumbnailProps.url
  const ogImageAlt = seoOgImageProps?.alt || thumbnailProps.alt || article.title
  const ogImageSource = seoOgImageProps?.url ? seoOgImage : article.thumbnail
  const twitterImageUrl =
    getPublicImageSizeUrl(ogImageSource, 'twitter') || ogImageUrl

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical
    },
    openGraph: {
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      ...(ogSiteName ? { siteName: ogSiteName } : {}),
      type: 'article',
      url: canonical,
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      authors: [article.author?.trim() || 'The Grand Collection'],
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            alt: ogImageAlt || article.title
          }
        ]
      })
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      ...(seo?.twitter?.creator ? { creator: seo.twitter.creator } : {}),
      ...(seo?.twitter?.creatorId ? { creatorId: seo.twitter.creatorId } : {}),
      ...(twitterImageUrl ? { images: [twitterImageUrl] } : {})
    }
  }
}

export default async function GuesthousePostPage({ params }: Props) {
  const { guesthouse: guesthouseSlug, article: articleSlug } = await params
  const {
    guesthouse,
    articles,
    article,
    canonical,
    createdDate,
    modifiedDate,
    updatedDate,
    authorName,
    authorType,
    authorUrl,
    hasFaq,
    ogImage,
    thumbnail
  } = await getGuesthousePostPageData(guesthouseSlug, articleSlug)
  const breadcrumbs = getGuesthousePostBreadcrumbs(guesthouse, article)
  const headingLinks = extractH2Headings(article.body)
  const relatedArticles = articles
    .filter((related) => related.id !== article.id)
    .slice(0, 6)
  const baseUrl = getBaseUrl()
  const guesthousePath = `/guesthouses/${guesthouse.slug}`
  const articlesPath = getGuesthouseArticlesPath(guesthouse.slug)
  const articleStructuredData = createArticleStructuredData({
    pageUrl: canonical,
    articleType: 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: createdDate.dateTime,
    dateModified: modifiedDate.dateTime,
    authorName,
    authorType,
    authorUrl,
    image: ogImage,
    aboutId: `${baseUrl}${guesthousePath}#lodgingbusiness`
  })
  const faqStructuredData = createFaqStructuredData({
    faq: article.faq,
    pageUrl: canonical,
    name: `${article.title} FAQs`
  })
  const jsonLd = await createPageStructuredData({
    pageUrl: canonical,
    name: article.title,
    description: article.excerpt,
    breadcrumbs,
    mainEntityId: articleStructuredData['@id'] as string | undefined,
    additionalNodes: [articleStructuredData, faqStructuredData]
  })

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className='absolute inset-x-0 top-16 z-20 w-full py-3'>
        <div className='container mx-auto w-full'>
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </section>
      <section
        id={article.slug}
        className='relative flex w-full flex-col justify-between bg-olive-50'
      >
        <div className='container mx-auto flex flex-col items-start gap-6 pt-14 pb-10'>
          <Link
            href={articlesPath}
            className='inline-flex items-center gap-2 text-sm font-medium text-olive-500 transition hover:text-olive-700'
          >
            <ArrowLeft className='size-4' />
            Back to articles
          </Link>
          <h1 className='max-w-3xl text-3xl font-semibold text-pretty text-olive-900 md:text-4xl lg:text-5xl'>
            {article.title}
          </h1>

          <div className='flex w-full flex-row flex-wrap items-center justify-between gap-4'>
            <div className='flex flex-wrap gap-2'>
              <Badge className='flex flex-wrap items-center gap-x-1 gap-y-0.5'>
                <span>{authorName}</span>
                <span className='mx-1'>&bull;</span>
                <time dateTime={createdDate.dateTime}>
                  {createdDate.humanReadable}
                </time>
              </Badge>
              {updatedDate && (
                <Badge
                  variant='outline'
                  className='flex flex-wrap items-center gap-x-1 gap-y-0.5'
                >
                  <span>Updated on</span>
                  <time dateTime={updatedDate.dateTime}>
                    {updatedDate.humanReadable}
                  </time>
                </Badge>
              )}
            </div>

            <ShareButton
              size='icon'
              colour='sage'
              title={article.title}
              text={article.excerpt || undefined}
              url={canonical}
            />
          </div>

          {thumbnail.url && (
            <figure className='w-full'>
              <BlurredBackdropImage
                src={thumbnail.url}
                alt={thumbnail.altText}
                sizes={thumbnail.sizes}
                priority
                aspectRatio={thumbnail.aspectRatio}
                containerClassName={twMerge(
                  'w-full rounded-2xl border border-olive-200 bg-olive-100 lg:max-h-[40vh]',
                  thumbnail.maxWidthClass
                )}
              />
            </figure>
          )}
        </div>
      </section>

      <div className='relative'>
        <div className='container mx-auto flex w-full justify-between gap-8 lg:gap-12'>
          <section className='flex w-full max-w-prose flex-col gap-6 py-10 lg:py-20'>
            <ArticleRichText
              data={article.body}
              headings={headingLinks}
              className='lg:prose-lg w-full'
            />
          </section>

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
                    In this post
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
                          <Link href={`#${heading.id}`}>
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
                      <Link href={`#${article.slug}`}>Back to top</Link>
                    </Button>
                  </li>
                  <li>
                    <Button asChild variant='ghost' colour='olive'>
                      <Link href={guesthousePath}>{guesthouse.name}</Link>
                    </Button>
                  </li>
                  <li>
                    <Button asChild variant='ghost' colour='olive'>
                      <Link href={articlesPath}>Articles</Link>
                    </Button>
                  </li>
                  {relatedArticles.length > 0 && (
                    <li>
                      <Button asChild variant='link' colour='olive'>
                        <Link href='#more-articles'>
                          More from {guesthouse.name}
                        </Link>
                      </Button>
                    </li>
                  )}
                  {guesthouse.destination &&
                    typeof guesthouse.destination !== 'string' && (
                      <li>
                        <Button asChild variant='ghost' colour='olive'>
                          <Link
                            href={`/destinations/${guesthouse.destination.slug}`}
                          >
                            {guesthouse.destination.name} guides
                          </Link>
                        </Button>
                      </li>
                    )}

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

      {relatedArticles.length > 0 && (
        <>
          <Divider />
          <MoreArticlesSection
            label='Articles'
            title={`More from ${guesthouse.name}`}
            description={`Recent articles from ${guesthouse.name}.`}
            viewAllHref={articlesPath}
            viewAllLabel='View all articles'
            relatedArticles={relatedArticles}
            articleHrefBuilder={(related) =>
              getGuesthousePostPath(guesthouse.slug, related.slug)
            }
          />
        </>
      )}

      <FaqSection
        faq={article.faq}
        parentLabel='Frequently asked questions'
        title={`${article.title} FAQs`}
      />
    </>
  )
}

export const dynamicParams = true
export const revalidate = false
