import { twMerge } from 'tailwind-merge'

interface PropTypes {
  heading: string
  headingClassNames?: string
  subtitle?: string
  subtitleClassNames?: string
}

export default function SectionHeading({
  heading,
  headingClassNames,
  subtitle,
  subtitleClassNames
}: PropTypes): JSX.Element {
  return (
    <>
      <h2
        className={twMerge(
          'text-center text-3xl font-light text-olive-600 md:text-4xl lg:text-5xl',
          headingClassNames
        )}
      >
        {heading}
      </h2>
      {subtitle && (
        <h3
          className={twMerge(
            'playball mt-2 text-center text-xl capitalize text-olive-500 md:text-2xl lg:mt-5 lg:text-3xl',
            subtitleClassNames
          )}
        >
          {subtitle}
        </h3>
      )}
    </>
  )
}
