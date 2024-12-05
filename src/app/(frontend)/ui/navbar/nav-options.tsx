import 'server-only'

import Link from 'next/link'

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

import NestedNav from './nested-nav'
import { NavOption, navOptions } from './data'

export default function NavOptions({
  className
}: {
  className?: string
}): JSX.Element[] {
  return navOptions.map(({ label, href, nested }: NavOption) => (
    <NavigationMenuItem key={label.text} className={className}>
      {nested ? (
        <NestedNav label={label} options={nested} />
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
