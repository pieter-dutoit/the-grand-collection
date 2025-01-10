import { Metadata } from 'next'

import { getGuestHouses } from '@/lib/data'
import { Guesthouse } from '@/payload/payload-types'
import createMetadataConfig from '@/lib/utils/create-metadata-object'

type Props = Readonly<{
  children: React.ReactNode
  params: Promise<{
    guesthouse: string
  }>
}>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guesthouse: slug } = await params
  const res: Guesthouse[] = await getGuestHouses({ slug: { equals: slug } })
  const [data] = res

  const { seo } = data
  if (!seo) return {}

  return createMetadataConfig(seo)
}

export default async function Layout({ children }: Props) {
  return <>{children}</>
}
