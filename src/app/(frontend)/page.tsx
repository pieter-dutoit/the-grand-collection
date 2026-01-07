import { Hero } from '@/app/(frontend)/components/hero'
import Overview from '@/app/(frontend)/components/overview'
import FeaturedProperties from '@/app/(frontend)/components/featured-properties'
import FaqSection from '@/components/faq-section'
import JsonLd from '@/components/seo/json-ld'

import { fetchHomePageData } from '@/lib/data'
import { getBaseUrl } from '@/lib/utils'
import {
  createFaqStructuredData,
  createPageStructuredData,
  getOrganisationId
} from '@/lib/utils/create-structured-data'
import { getHomeBreadcrumbs } from '@/lib/utils/breadcrumbs'
import Divider from './guesthouses/[guesthouse]/components/divider'

export default async function Home() {
  const { faq } = await fetchHomePageData('faq')
  const pageUrl = getBaseUrl()
  const breadcrumbs = getHomeBreadcrumbs()
  const faqStructuredData = createFaqStructuredData({
    faq,
    pageUrl,
    name: 'The Grand Collection FAQs'
  })
  const jsonLd = await createPageStructuredData({
    pageUrl,
    name: 'The Grand Collection',
    breadcrumbs,
    mainEntityId: getOrganisationId(),
    additionalNodes: [faqStructuredData]
  })

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <Overview />
      <Divider />
      <FeaturedProperties />

      <FaqSection
        faq={faq}
        parentLabel='Frequently asked questions'
        title='The Grand Collection FAQs'
      />
    </>
  )
}
