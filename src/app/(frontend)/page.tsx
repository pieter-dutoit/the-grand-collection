import { Metadata } from 'next'

import { Hero } from '@/app/(frontend)/components/hero'
import Overview from '@/app/(frontend)/components/overview'
import FeaturedProperties from '@/app/(frontend)/components/featured-properties'

import { fetchHomePageData } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-object'

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await fetchHomePageData('seo')

  if (!seo) return {}

  return createMetadataConfig({
    ...seo,
    twitter: seo.twitter || {}
  })
}

export default function Home() {
  return (
    <>
      <Hero />
      <Overview />
      <FeaturedProperties />
    </>
  )
}
