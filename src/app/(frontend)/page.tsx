import { Hero } from '@/app/(frontend)/components/hero'
import Overview from '@/app/(frontend)/components/overview'
import FeaturedProperties from '@/app/(frontend)/components/featured-properties'
import FaqSection from '@/components/faq-section'
import { fetchHomePageData } from '@/lib/data'
import {
  createBreadCrumbs,
  getOrganisationStructuredData
} from '@/lib/utils/create-structured-data'

export default async function Home() {
  const organisationSD = await getOrganisationStructuredData()
  const { faq } = await fetchHomePageData('faq')
  const jsonLd = [createBreadCrumbs(), organisationSD]

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Overview />
      <FeaturedProperties />
      <FaqSection
        faq={faq}
        parentLabel='Frequently asked questions'
        title='The Grand Collection FAQs'
      />
    </>
  )
}
