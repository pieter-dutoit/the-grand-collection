import 'server-only'

import { Metadata } from 'next'

import { fetchDestinations } from '@/lib/data'
import { getBaseUrl } from '@/lib/utils'
import createMetadataConfig from '@/lib/utils/create-metadata-object'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import Divider from '@/app/(frontend)/guesthouses/[guesthouse]/components/divider'
import { getDestinationBreadcrumbs } from '@/lib/utils/breadcrumbs'

import DestinationHero from './components/hero'
import ArticleIndex from './components/article-index'
import DestinationGuidesStructuredData from './components/structured-data'
import DestinationWhereToStay from './components/where-to-stay'
import DestinationFaq from './components/faq'
import { getDestinationData } from './lib/destination-data'

type Props = {
  params: Promise<{ destination: string }>
}

export async function generateStaticParams() {
  const destinations = await fetchDestinations()

  return destinations.map((destination) => ({
    destination: destination.slug
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { destination: destinationSlug } = await params

  const [destination] = await fetchDestinations({
    slug: { equals: destinationSlug }
  })

  if (!destination) return {}

  const canonical = `${getBaseUrl()}/destinations/${destination.slug}`

  const seo = destination.seo

  const metadata = createMetadataConfig({
    meta: seo.meta,
    open_graph: seo.open_graph,
    twitter: seo.twitter || {}
  })

  return {
    ...metadata,
    alternates: {
      canonical
    },
    openGraph: {
      ...(metadata.openGraph ?? {}),
      url: canonical
    }
  }
}

export default async function ArticlesPage({ params }: Props) {
  const { destination: destinationSlug } = await params
  const { destination } = await getDestinationData(destinationSlug)
  const breadcrumbs = getDestinationBreadcrumbs(destination)

  return (
    <>
      <DestinationGuidesStructuredData destinationSlug={destinationSlug} />
      <section className='container mx-auto px-8 pt-6'>
        <Breadcrumbs items={breadcrumbs} />
      </section>
      <DestinationHero destinationSlug={destinationSlug} />
      <ArticleIndex destinationSlug={destinationSlug} />
      <Divider />
      <DestinationWhereToStay destinationSlug={destinationSlug} />
      <DestinationFaq destinationSlug={destinationSlug} />
    </>
  )
}
