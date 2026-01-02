import { Metadata } from 'next'

import Hero from './components/hero'
import SubSections from './components/sub-sections'
import Overview from './components/overview'

import { fetchAboutPageData } from '@/lib/data'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import JsonLd from '@/components/seo/json-ld'
import createMetadataConfig from '@/lib/utils/create-metadata-object'
import {
  createPageStructuredData,
  getOrganisationId
} from '@/lib/utils/create-structured-data'
import { getBaseUrl } from '@/lib/utils'
import { getAboutBreadcrumbs } from '@/lib/utils/breadcrumbs'

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
  const pageUrl = `${baseUrl}/about`

  const jsonLd = await createPageStructuredData({
    pageUrl,
    pageType: 'AboutPage',
    name: seo?.meta.title,
    description: seo?.meta.description,
    breadcrumbs,
    mainEntityId: getOrganisationId()
  })

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className='container mx-auto pt-5'>
        <Breadcrumbs items={breadcrumbs} />
      </section>
      <Hero />
      <Overview />
      <SubSections />
    </>
  )
}
