import { Hero } from '@/app/(frontend)/components/hero'
import Overview from '@/app/(frontend)/components/overview'
import FeaturedProperties from '@/app/(frontend)/components/featured-properties'
import FaqSection from '@/components/faq-section'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchHomePageData } from '@/lib/data'
import { getOrganisationStructuredData } from '@/lib/utils/create-structured-data'
import {
  createBreadcrumbListStructuredData,
  getHomeBreadcrumbs
} from '@/lib/utils/breadcrumbs'

export default async function Home() {
  const organisationSD = await getOrganisationStructuredData()
  const { faq } = await fetchHomePageData('faq')
  const breadcrumbs = getHomeBreadcrumbs()
  const jsonLd = [
    createBreadcrumbListStructuredData(breadcrumbs),
    organisationSD
  ]

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
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
