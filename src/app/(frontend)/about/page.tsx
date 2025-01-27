import { Metadata } from 'next'

import Hero from './components/hero'
import SubSections from './components/sub-sections'
import Overview from './components/overview'

import { fetchAboutPageData } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-object'

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await fetchAboutPageData('seo')
  if (!seo) return {}
  return createMetadataConfig({
    ...seo,
    twitter: seo.twitter || {}
  })
}

export default function About(): JSX.Element {
  return (
    <>
      <Hero />
      <Overview />
      <SubSections />
    </>
  )
}
