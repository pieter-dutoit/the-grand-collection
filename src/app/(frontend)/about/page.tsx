import { Metadata } from 'next'

import Hero from './components/hero'
import SubSections from './components/sub-sections'
import Overview from './components/overview'

import { fetchAboutPageData } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-object'
import {
  createBreadCrumbs,
  getOrganisationStructuredData
} from '@/lib/utils/create-structured-data'
import { getBaseUrl } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await fetchAboutPageData('seo')
  if (!seo) return {}
  return createMetadataConfig({
    ...seo,
    twitter: seo.twitter || {}
  })
}

export default async function About(): Promise<JSX.Element> {
  const { seo } = await fetchAboutPageData('seo')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://thegrandcollection.co.za/about',
    url: getBaseUrl() + '/about',
    name: seo?.meta.title,
    description: seo?.meta.description,
    breadcrumb: createBreadCrumbs([
      {
        name: 'About',
        item: '/about'
      }
    ]),
    mainEntity: getOrganisationStructuredData({ minimal: true })
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Overview />
      <SubSections />
    </>
  )
}
