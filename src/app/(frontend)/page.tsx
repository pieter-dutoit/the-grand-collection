import { Hero } from '@/app/(frontend)/components/hero'
import Overview from '@/app/(frontend)/components/overview'
import FeaturedProperties from '@/app/(frontend)/components/featured-properties'
import {
  createBreadCrumbs,
  getOrganisationStructuredData
} from '@/lib/utils/create-structured-data'

export default async function Home() {
  const organisationSD = await getOrganisationStructuredData()
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
    </>
  )
}
