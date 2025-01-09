import { Hero } from '@/app/(frontend)/components/hero'
import Overview from '@/app/(frontend)/components/overview'
import FeaturedProperties from '@/app/(frontend)/components/featured-properties'

export default function Home() {
  return (
    <>
      <Hero />
      <Overview />
      <FeaturedProperties />
    </>
  )
}

// export const revalidate = 30
