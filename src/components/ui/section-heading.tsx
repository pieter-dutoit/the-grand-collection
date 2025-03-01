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
          'text-center text-4xl font-light text-olive-600 md:text-5xl',
          headingClassNames
        )}
      >
        {heading}
      </h2>
      {subtitle && (
        <h3
          className={twMerge(
            'mt-2 text-center text-base font-bold uppercase text-olive-500 md:text-lg lg:mt-5 lg:text-xl',
            subtitleClassNames
          )}
        >
          {subtitle}
        </h3>
      )}
    </>
  )
}
