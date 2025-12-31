import { Hero } from '@/app/(frontend)/components/hero'
import Overview from '@/app/(frontend)/components/overview'
import FeaturedProperties from '@/app/(frontend)/components/featured-properties'
import FaqSection from '@/components/faq-section'
import JsonLd from '@/components/seo/json-ld'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchHomePageData } from '@/lib/data'
import { getBaseUrl } from '@/lib/utils'
import {
  createFaqStructuredData,
  getOrganisationStructuredData
} from '@/lib/utils/create-structured-data'
import {
  createBreadcrumbListStructuredData,
  getHomeBreadcrumbs
} from '@/lib/utils/breadcrumbs'

export default async function Home() {
  const organisationSD = await getOrganisationStructuredData()
  const { faq } = await fetchHomePageData('faq')
  const breadcrumbs = getHomeBreadcrumbs()
  const faqStructuredData = createFaqStructuredData({
    faq,
    pageUrl: getBaseUrl()
  })
  const jsonLd = [
    createBreadcrumbListStructuredData(breadcrumbs),
    organisationSD,
    ...(faqStructuredData ? [faqStructuredData] : [])
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className='container mx-auto px-8 py-4'>
        <Breadcrumbs items={breadcrumbs} />
      </section>
      <Hero />
      <Overview />
      <FeaturedProperties />
      {/* <Divider /> */}
      <FaqSection
        faq={faq}
        parentLabel='Frequently asked questions'
        title='The Grand Collection FAQs'
      />
    </>
  )
}
