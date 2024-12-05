import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function NavLink({
  href = '#',
  label,
  className
}: {
  href?: string
  label: string
  className?: string
}): JSX.Element {
  return (
    <Link
      href={href ?? '#'}
      className={twMerge(
        buttonVariants({ variant: 'ghost' }),
        'text-md w-full justify-start text-olive',
        className
      )}
    >
      {label}
    </Link>
  )
}
