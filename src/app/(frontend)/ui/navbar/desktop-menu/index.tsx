import 'server-only'

import DesktopMenuDropdown from './dropdown'

import NavLink from '../nav-link'
import { NavOption, navOptions } from '../data'

export default function DesktopMenu(): JSX.Element {
  return (
    <nav aria-label='Desktop navigation menu' className='hidden md:block'>
      <ul className='flex items-center gap-1 lg:gap-2 xl:gap-3'>
        {navOptions.map(({ label, href, nested }: NavOption) => (
          <li key={label}>
            {nested ? (
              <>
                <DesktopMenuDropdown label={label} options={nested} />
              </>
            ) : (
              <NavLink href={href} label={label} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
