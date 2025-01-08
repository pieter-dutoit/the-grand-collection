import { getGuestHouses } from '@/lib/data'
import { Guesthouse } from '@/payload/payload-types'

type Params = Promise<{
  guesthouse: string
}>

export default async function Layout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Params
}>) {
  const { guesthouse: slug } = await params
  const res: Guesthouse[] = await getGuestHouses({ slug: { equals: slug } })
  const [data] = res

  if (!data) {
    return <></>
  }

  return <>{children}</>
}
