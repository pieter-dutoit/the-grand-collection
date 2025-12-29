type SectionHeadingProps = {
  title: string
  parentLabel: string
}

export default function SectionHeading({
  title,
  parentLabel
}: SectionHeadingProps) {
  return (
    <div className='flex flex-col gap-1'>
      <span className='text-sm font-extrabold text-olive-500'>
        {parentLabel}
      </span>
      <h2 className='text-3xl font-semibold text-olive-900 md:text-4xl'>
        {title}
      </h2>
    </div>
  )
}
