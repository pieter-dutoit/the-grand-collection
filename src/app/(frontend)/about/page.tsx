import { Metadata } from 'next'

import Hero from './components/hero'
import SubSections from './components/sub-sections'
import Overview from './components/overview'

import { fetchAboutPageData } from '@/lib/data'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import createMetadataConfig from '@/lib/utils/create-metadata-object'
import { getOrganisationStructuredData } from '@/lib/utils/create-structured-data'
import { getBaseUrl } from '@/lib/utils'
import {
  createBreadcrumbListStructuredData,
  getAboutBreadcrumbs
} from '@/lib/utils/breadcrumbs'

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
  const breadcrumbs = getAboutBreadcrumbs()
  const baseUrl = getBaseUrl()

  const jsonLd = [
    createBreadcrumbListStructuredData(breadcrumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${baseUrl}/about`,
      url: `${baseUrl}/about`,
      name: seo?.meta.title,
      description: seo?.meta.description,
      mainEntity: await getOrganisationStructuredData()
    }
  ]

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
      <section className='container mx-auto px-8 pt-6'>
        <Breadcrumbs items={breadcrumbs} />
      </section>
      <Hero />
      <Overview />
      <SubSections />
    </>
  )
}
