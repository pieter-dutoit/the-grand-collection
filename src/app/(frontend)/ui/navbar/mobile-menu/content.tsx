import 'server-only'

import { NavOption, navOptions } from '../data'
import NavLink from '../nav-link'

export default function MobileMenuContent() {
  return (
    <nav aria-label='Mobile navigation menu'>
      <ul className='flex flex-col'>
        {navOptions.map(({ label, href, nested }: NavOption) => (
          <li key={label}>
            {nested ? (
              <>
                <p className='my-2 ml-4 w-full text-left text-lg font-bold text-gold-500'>
                  {label}
                </p>
                <ul className='ml-4 flex flex-col'>
                  {nested.map(({ label, href }: NavOption) => (
                    <li key={label}>
                      <NavLink href={href} label={label} />
                    </li>
                  ))}
                </ul>
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
