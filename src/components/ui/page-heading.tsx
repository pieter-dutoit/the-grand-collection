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
}: Props): React.JSX.Element {
  return (
    <div className={twMerge('w-full py-8 lg:py-16', containerClassNames)}>
      <h1
        className={twMerge(
          'font-base text-center text-4xl whitespace-pre-line text-olive-800 capitalize md:text-5xl lg:text-6xl',
          headingClassNames
        )}
      >
        {heading}
      </h1>

      {subHeading && (
        <p
          className={twMerge(
            'mx-auto mt-6 max-w-4xl text-center text-lg leading-6 font-light md:text-2xl lg:text-3xl lg:leading-10',
            subHeadingClassNames
          )}
        >
          {subHeading}
        </p>
      )}
    </div>
  )
}
