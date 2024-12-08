import 'server-only'

import { NavigationMenuItem } from '@/components/ui/navigation-menu'

import SubMenu from './sub-menu'
import { NavOption, navOptions } from '../data'
import NavLink from './nav-link'

export default function NavOptions({
  className
}: {
  className?: string
}): JSX.Element[] {
  return navOptions.map((option: NavOption) => {
    const { label, nested } = option

    return (
      <NavigationMenuItem key={label.text} className={className}>
        {nested ? (
          <SubMenu label={label} options={nested} />
        ) : (
          <NavLink {...option} />
        )}
      </NavigationMenuItem>
    )
  })
}
