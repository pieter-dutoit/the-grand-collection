import Hero from './components/hero'
import SubSections from './components/sub-sections'
import Overview from './components/overview'

export default function About(): JSX.Element {
  return (
    <>
      <Hero />
      <Overview />
      <SubSections />
    </>
  )
}
