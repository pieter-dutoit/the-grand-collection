import PageHeading from '@/components/ui/page-heading'
import { fetchAboutPageData } from '@/lib/data'

export default async function Hero(): Promise<JSX.Element> {
  const { hero } = await fetchAboutPageData('hero')
  if (!hero) return <></>

  const { heading, sub_heading } = hero

  return (
    <section className='container mx-auto grid w-full px-8 py-10 lg:py-20'>
      <PageHeading heading={heading} subHeading={sub_heading} />
    </section>
  )
}
