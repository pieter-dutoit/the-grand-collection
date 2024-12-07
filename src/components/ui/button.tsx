import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colours focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300',
  {
    variants: {
      variant: {
        default:
          'bg-zinc-500 text-zinc-50 shadow hover:bg-zinc-600/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90',
        destructive:
          'bg-red-500 text-red-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90',
        outline:
          'border text-zinc-600 border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
        secondary:
          'bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80',
        ghost:
          'hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
        link: 'text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50'
      },
      colour: {
        default: '',
        olive: '',
        gold: '',
        sage: ''
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-9'
      }
    },
    compoundVariants: [
      // Sage Variants
      {
        variant: 'default',
        colour: 'sage',
        className:
          'bg-sage-500 text-sage-50 shadow hover:bg-sage-600/90 dark:bg-sage-50 dark:text-sage-900 dark:hover:bg-sage-50/90'
      },
      {
        variant: 'outline',
        colour: 'sage',
        className:
          'border text-sage-600 border-sage-200 bg-white shadow-sm hover:bg-sage-100 hover:text-sage-800 dark:border-sage-800 dark:bg-sage-950 dark:hover:bg-sage-800 dark:hover:text-sage-50'
      },
      {
        variant: 'secondary',
        colour: 'sage',
        className:
          'bg-sage-100 text-sage-900 shadow-sm hover:bg-sage-100/80 dark:bg-sage-800 dark:text-sage-50 dark:hover:bg-sage-800/80'
      },
      {
        variant: 'ghost',
        colour: 'sage',
        className:
          'text-sage-700 hover:bg-sage-100 hover:text-sage-900 dark:hover:bg-sage-800 dark:hover:text-sage-50'
      },
      {
        variant: 'link',
        colour: 'sage',
        className:
          'text-sage-500 underline-offset-4 hover:underline dark:text-sage-50'
      },
      // Olive Variants
      {
        variant: 'default',
        colour: 'olive',
        className:
          'bg-olive-400 text-olive-50 shadow hover:bg-olive-400/90 dark:bg-olive-50 dark:text-olive-900 dark:hover:bg-olive-50/90'
      },
      {
        variant: 'outline',
        colour: 'olive',
        className:
          'border text-olive-600 border-olive-200 bg-white shadow-sm hover:bg-olive-100 hover:text-olive-800 dark:border-olive-800 dark:bg-olive-950 dark:hover:bg-olive-800 dark:hover:text-olive-50'
      },
      {
        variant: 'secondary',
        colour: 'olive',
        className:
          'bg-olive-100 text-olive-900 shadow-sm hover:bg-olive-100/80 dark:bg-olive-800 dark:text-olive-50 dark:hover:bg-olive-800/80'
      },
      {
        variant: 'ghost',
        colour: 'olive',
        className:
          'text-olive-700 hover:bg-olive-100 hover:text-olive-900 dark:hover:bg-olive-800 dark:hover:text-olive-50'
      },
      {
        variant: 'link',
        colour: 'olive',
        className:
          'text-olive-500 underline-offset-4 hover:underline dark:text-olive-50'
      },
      // Gold Variants
      {
        variant: 'default',
        colour: 'gold',
        className:
          'bg-gold-500 text-gold-50 shadow hover:bg-gold-600/90 dark:bg-gold-50 dark:text-gold-900 dark:hover:bg-gold-50/90'
      },
      {
        variant: 'outline',
        colour: 'gold',
        className:
          'border text-gold-600 border-gold-200 bg-white shadow-sm hover:bg-gold-100 hover:text-gold-800 dark:border-gold-800 dark:bg-gold-950 dark:hover:bg-gold-800 dark:hover:text-gold-50'
      },
      {
        variant: 'secondary',
        colour: 'gold',
        className:
          'bg-gold-100 text-gold-900 shadow-sm hover:bg-gold-100/80 dark:bg-gold-800 dark:text-gold-50 dark:hover:bg-gold-800/80'
      },
      {
        variant: 'ghost',
        colour: 'gold',
        className:
          'text-gold-700 hover:bg-gold-100 hover:text-gold-900 dark:hover:bg-gold-800 dark:hover:text-gold-50'
      },
      {
        variant: 'link',
        colour: 'gold',
        className:
          'text-gold-500 underline-offset-4 hover:underline dark:text-gold-50'
      }
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      colour: 'olive'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, colour = 'olive', asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, colour, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
