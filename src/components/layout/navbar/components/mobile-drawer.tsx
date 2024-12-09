'use client'

import React, { useEffect, useState } from 'react'
import { AlignJustify, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

export default function MobileMenu({
  children
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    // Close menu when navigating to a new page
    if (isOpen) {
      setIsOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className='md:hidden'>
        <Button variant='ghost' size='icon' className='mr-1 sm:mr-2'>
          {isOpen ? (
            <X aria-label='Close nav menu' />
          ) : (
            <AlignJustify aria-label='Open nav menu' />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className='h-full bg-white/75 backdrop-blur-xl backdrop-saturate-150 md:hidden'>
        <SheetHeader className='sr-only'>
          <SheetTitle>Mobile Navigation Menu</SheetTitle>
        </SheetHeader>
        <SheetDescription className='sr-only'>
          Use the navigation menu to explore the site.
        </SheetDescription>

        {/* Nest child server component inside client component to keep the children server-rendered:
        https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#supported-pattern-passing-server-components-to-client-components-as-props */}
        {children}
      </SheetContent>
    </Sheet>
  )
}
