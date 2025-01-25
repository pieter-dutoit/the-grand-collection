import PageHeading from '@/components/ui/page-heading'

export default function Hero(): JSX.Element {
  return (
    <section className='container mx-auto grid w-full px-8 py-10 lg:py-20'>
      <PageHeading
        heading='Redefining Luxury Stays'
        subHeading='We are dedicated to creating extraordinary experiences for business and leisure travelers across South Africa.'
      />
    </section>
  )
}
