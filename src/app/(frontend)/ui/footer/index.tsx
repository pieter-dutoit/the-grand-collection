import { ThemeToggle } from '@/ui/theme-toggle';

export function Footer() {
  return (
    <footer className='bg-transparent fixed bottom-0 flex w-full justify-center'>
      <ThemeToggle />
    </footer>
  );
}
