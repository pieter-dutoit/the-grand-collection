import { Hero } from '@/app/(frontend)/components/hero'
import Overview from '@/app/(frontend)/components/overview'
// import Properties from '@/app/(frontend)/components/properties'

export default function Home() {
  return (
    <main>
      <Hero />
      <Overview />
      {/* <Properties /> */}
    </main>
  )
}
