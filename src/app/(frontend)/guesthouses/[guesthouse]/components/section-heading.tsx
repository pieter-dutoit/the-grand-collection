interface PropTypes {
  heading: string
  description: string
}

export default function SectionHeading({
  heading,
  description
}: PropTypes): JSX.Element {
  return (
    <>
      <h2 className='text-center text-3xl text-olive-900 md:text-5xl'>
        {heading}
      </h2>
      <h3 className='mt-2 text-center text-2xl text-olive-600 md:mt-5 md:text-4xl'>
        {description}
      </h3>
    </>
  )
}
