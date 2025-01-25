import { twMerge } from 'tailwind-merge'

interface Props {
  headingClassNames?: string
  containerClassNames?: string
  subHeadingClassNames?: string
  heading: string
  subHeading?: string
}

export default function PageHeading({
  heading,
  subHeading,
  containerClassNames,
  headingClassNames,
  subHeadingClassNames
}: Props): JSX.Element {
  return (
    <div className={twMerge('w-full py-8 lg:py-16', containerClassNames)}>
      <h1
        className={twMerge(
          'font-base whitespace-pre-line text-center text-4xl capitalize text-olive-600 md:text-5xl lg:text-6xl',
          headingClassNames
        )}
      >
        {heading}
      </h1>

      {subHeading && (
        <p
          className={twMerge(
            'mx-auto mt-6 max-w-4xl text-center text-lg font-light leading-6 md:text-2xl lg:text-3xl lg:leading-10',
            subHeadingClassNames
          )}
        >
          {subHeading}
        </p>
      )}
    </div>
  )
}
