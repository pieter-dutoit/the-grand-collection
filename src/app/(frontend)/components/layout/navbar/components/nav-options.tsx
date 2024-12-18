import 'server-only'

import { NavigationMenuItem } from '@/components/ui/navigation-menu'

import SubMenu from './sub-menu'
import NavLink from './nav-link'

import { NavOption, getNavOptions } from '../data'

export default async function NavOptions({
  className
}: {
  className?: string
}): Promise<JSX.Element> {
  const navOptions = await getNavOptions()

  return (
    <>
      {navOptions.map((option: NavOption) => {
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
      })}
    </>
  )
}
