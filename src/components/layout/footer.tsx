import { ThemeToggle } from '@/app/(frontend)/components/theme-toggle'

export function Footer() {
  return (
    <footer className='fixed bottom-0 flex w-full justify-center bg-transparent'>
      <ThemeToggle />
    </footer>
  )
}
