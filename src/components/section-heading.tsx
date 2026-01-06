import { twMerge } from 'tailwind-merge'

type SectionHeadingProps = {
  title: string
  parentLabel?: string
  description?: string
  className?: string
}

export default function SectionHeading({
  title,
  parentLabel,
  description,
  className
}: SectionHeadingProps) {
  return (
    <div className={twMerge('flex flex-col gap-1', className)}>
      {parentLabel && (
        <span className='text-sm font-extrabold text-olive-500'>
          {parentLabel}
        </span>
      )}
      <h2 className='text-2xl font-semibold text-olive-900 sm:text-3xl md:text-4xl'>
        {title}
      </h2>
      {description && (
        <p className='max-w-prose text-balance text-sm opacity-80'>
          {description}
        </p>
      )}
    </div>
  )
}
