import 'server-only'

import Link from 'next/link'

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

import NestedOptions from './nested-options'
import { NavOption, navOptions } from '../data'

export default function NavOptions({
  className
}: {
  className?: string
}): JSX.Element[] {
  return navOptions.map(({ label, href, nested }: NavOption) => (
    <NavigationMenuItem key={label.text} className={className}>
      {nested ? (
        <NestedOptions label={label} options={nested} />
      ) : (
        <Link href={href ?? '#'} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {label.text}
          </NavigationMenuLink>
        </Link>
      )}
    </NavigationMenuItem>
  ))
}
