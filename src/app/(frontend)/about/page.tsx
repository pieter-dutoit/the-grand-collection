import Future from './components/future'
import Hero from './components/hero'
import Mission from './components/mission'
import Overview from './components/overview'
import Values from './components/values'

export default function About(): JSX.Element {
  return (
    <>
      <Hero />
      <Overview />
      <Mission />
      <Values />
      <Future />
    </>
  )
}
