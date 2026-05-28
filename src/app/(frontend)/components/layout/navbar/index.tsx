import 'server-only'

import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { AlignJustify, ChevronDown, ExternalLink, X } from 'lucide-react'

import { getButtonStyles } from '@/components/ui/button'
import { CountryOutline } from '@/components/ui/logos'

import NavMenuCard, { type NavMenuCardAction } from './nav-menu-card'
import NavbarShell from './navbar-shell'
import MobileNavSection from './mobile-nav-section'
import {
  DestinationNavItem,
  getPrimaryNavData,
  GuesthouseNavItem
} from './nav-data'

const darkGhostButtonStyles =
  'text-white hover:bg-white/10 hover:text-white focus-visible:ring-white/60'

const darkPrimaryButtonStyles =
  'bg-white/90 text-black hover:bg-white hover:text-black focus-visible:ring-white/60'

const darkIconButtonStyles = twMerge(
  getButtonStyles({
    variant: 'ghost',
    colour: 'olive',
    size: 'icon'
  }),
  darkGhostButtonStyles
)

const darkSmallPrimaryButtonStyles = twMerge(
  getButtonStyles({
    variant: 'default',
    colour: 'olive',
    size: 'sm'
  }),
  darkPrimaryButtonStyles
)

const desktopTriggerStyles = twMerge(
  getButtonStyles({ variant: 'ghost', colour: 'olive' }),
  darkGhostButtonStyles,
  'h-10 text-base font-semibold capitalize'
)

const textLinkStyles = twMerge(
  getButtonStyles({ variant: 'ghost', colour: 'olive' }),
  darkGhostButtonStyles,
  'h-10 text-base font-semibold capitalize'
)

const mobileMenuPanelStyles =
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 fixed inset-x-0 top-16 z-40 flex max-h-[calc(90dvh-4rem)] -translate-y-2 overflow-hidden rounded-b-xl border-b border-white/10 py-5 text-white opacity-0 shadow-[0_12px_36px_rgba(0,0,0,0.18)] ring-1 ring-white/10 transition-[opacity,transform] duration-200 ease-out before:pointer-events-none before:absolute before:inset-0 before:bg-black/70 before:backdrop-blur-xl before:backdrop-saturate-150 before:content-[''] data-[state=closed]:pointer-events-none data-[state=open]:translate-y-0 data-[state=open]:opacity-100 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 after:content-[''] motion-reduce:translate-y-0 motion-reduce:animate-none motion-reduce:transition-none xl:hidden"

const mobileMenuBackdropStyles =
  'data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-x-0 top-16 bottom-0 z-30 bg-black/35 opacity-0 backdrop-blur-sm transition-opacity duration-150 ease-out data-[state=closed]:pointer-events-none data-[state=open]:opacity-100 motion-reduce:animate-none motion-reduce:transition-none xl:hidden'

const mobileMenuRowStyles =
  'flex w-full items-center rounded-md py-3 text-left text-sm font-bold uppercase text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-white/60'

const dropdownChevronStyles =
  'size-4 transition-transform duration-200 motion-reduce:transition-none'

const desktopPanelStyles =
  "absolute inset-x-0 top-full z-20 hidden overflow-hidden border-b border-white/10 text-white opacity-0 shadow-[0_12px_36px_rgba(0,0,0,0.18)] before:pointer-events-none before:absolute before:inset-0 before:bg-black/70 before:backdrop-blur-xl before:backdrop-saturate-150 before:content-[''] xl:invisible xl:block xl:-translate-y-2 xl:pointer-events-none xl:transition-[opacity,transform,visibility] xl:duration-200 xl:ease-out xl:data-[state=open]:visible xl:data-[state=open]:translate-y-0 xl:data-[state=open]:pointer-events-auto xl:data-[state=open]:opacity-100 motion-reduce:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none"

const desktopPanelContentStyles =
  'relative z-10 container mx-auto grid items-start gap-5 py-5 lg:grid-cols-[14rem_1fr]'

const desktopCardGridStyles =
  'grid auto-rows-fr gap-3 xl:grid-cols-[repeat(auto-fit,minmax(24rem,1fr))]'

function DropdownTrigger({
  children,
  id,
  label
}: {
  children: React.ReactNode
  id: string
  label: string
}) {
  return (
    <button
      type='button'
      aria-controls={`primary-nav-${id}`}
      aria-expanded='false'
      aria-label={label}
      className={twMerge(desktopTriggerStyles, 'group')}
      data-nav-trigger={id}
    >
      {children}
      <ChevronDown
        className={twMerge(
          dropdownChevronStyles,
          'group-aria-expanded:rotate-180'
        )}
        aria-hidden='true'
      />
    </button>
  )
}

function DesktopPanelIntro({
  action,
  description,
  eyebrow,
  title
}: {
  action?: React.ReactNode
  description: string
  eyebrow: string
  title: string
}) {
  return (
    <div className='flex max-w-56 flex-col items-start'>
      <p className='text-gold-300 text-xs font-bold tracking-wide uppercase'>
        {eyebrow}
      </p>
      <h2 className='mt-1 text-2xl leading-tight font-semibold text-white'>
        {title}
      </h2>
      <p className='mt-2 line-clamp-2 text-sm leading-snug text-white/70'>
        {description}
      </p>
      {action && <div className='mt-3'>{action}</div>}
    </div>
  )
}

function getGuesthouseActions(
  guesthouse: GuesthouseNavItem,
  variant: 'desktop' | 'mobile'
): NavMenuCardAction[] {
  const actions: NavMenuCardAction[] = [
    { href: `${guesthouse.href}#rooms`, label: 'Rooms & Rates' },
    ...(variant === 'desktop'
      ? [{ href: `${guesthouse.href}#gallery`, label: 'Gallery' }]
      : []),
    { href: `${guesthouse.href}#contact`, label: 'Contact' }
  ]

  return actions.map(({ href, label }) => ({
    href,
    label,
    linkProps: {
      'data-analytics-event': 'article_anchor_click',
      'data-analytics-source-section': 'primary_nav',
      'data-analytics-cta-label': `${guesthouse.name} ${label}`,
      'data-analytics-guesthouse-slug': guesthouse.slug
    }
  }))
}

function GuesthouseCard({
  guesthouse,
  variant = 'desktop'
}: {
  guesthouse: GuesthouseNavItem
  variant?: 'desktop' | 'mobile'
}) {
  return (
    <NavMenuCard
      actions={getGuesthouseActions(guesthouse, variant)}
      body={`${guesthouse.city}, ${guesthouse.province}`}
      href={guesthouse.href}
      image={guesthouse.image}
      primaryLinkProps={{
        'data-analytics-event': 'property_detail_click',
        'data-analytics-source-section': 'primary_nav',
        'data-analytics-cta-label': guesthouse.name,
        'data-analytics-guesthouse-slug': guesthouse.slug,
        'data-analytics-destination-slug': guesthouse.destinationSlug
      }}
      title={guesthouse.name}
    />
  )
}

function DestinationCard({ destination }: { destination: DestinationNavItem }) {
  return (
    <NavMenuCard
      actions={[
        {
          href: `${destination.href}#travel-guides`,
          label: 'Travel guides',
          linkProps: {
            'data-analytics-event': 'article_anchor_click',
            'data-analytics-source-section': 'primary_nav',
            'data-analytics-cta-label': `${destination.name} travel guides`,
            'data-analytics-destination-slug': destination.slug
          }
        },
        {
          href: `${destination.href}#where-to-stay`,
          label: 'Where to stay',
          linkProps: {
            'data-analytics-event': 'article_guesthouse_click',
            'data-analytics-source-section': 'primary_nav',
            'data-analytics-cta-label': `${destination.name} where to stay`,
            'data-analytics-destination-slug': destination.slug
          }
        }
      ]}
      body={destination.description}
      href={destination.href}
      image={destination.image}
      primaryLinkProps={{
        'data-analytics-event': 'article_anchor_click',
        'data-analytics-source-section': 'primary_nav',
        'data-analytics-cta-label': destination.name,
        'data-analytics-destination-slug': destination.slug
      }}
      title={destination.name}
    />
  )
}

function getContactActions(guesthouse: GuesthouseNavItem): NavMenuCardAction[] {
  const actions: NavMenuCardAction[] = []

  if (guesthouse.contact?.phoneHref) {
    actions.push({
      href: guesthouse.contact.phoneHref,
      label: guesthouse.contact.phone || 'Call',
      linkProps: {
        'aria-label': `Call ${guesthouse.name}`,
        'data-analytics-event': 'contact_click',
        'data-analytics-source-section': 'primary_nav_contact_menu',
        'data-analytics-cta-label': `Call ${guesthouse.name}`,
        'data-analytics-target-url': guesthouse.contact.phoneHref,
        'data-analytics-guesthouse-slug': guesthouse.slug,
        'data-analytics-destination-slug': guesthouse.destinationSlug
      }
    })
  }

  if (guesthouse.contact?.emailHref) {
    actions.push({
      href: guesthouse.contact.emailHref,
      label: guesthouse.contact.email || 'Email',
      linkProps: {
        'aria-label': `Email ${guesthouse.name}`,
        'data-analytics-event': 'contact_click',
        'data-analytics-source-section': 'primary_nav_contact_menu',
        'data-analytics-cta-label': `Email ${guesthouse.name}`,
        'data-analytics-target-url': guesthouse.contact.emailHref,
        'data-analytics-guesthouse-slug': guesthouse.slug,
        'data-analytics-destination-slug': guesthouse.destinationSlug
      }
    })
  }

  return actions
}

function ContactCard({ guesthouse }: { guesthouse: GuesthouseNavItem }) {
  return (
    <NavMenuCard
      actions={getContactActions(guesthouse)}
      body={`${guesthouse.city}, ${guesthouse.province}`}
      href={`${guesthouse.href}#contact`}
      image={guesthouse.image}
      primaryLinkProps={{
        'data-analytics-event': 'article_anchor_click',
        'data-analytics-source-section': 'primary_nav',
        'data-analytics-cta-label': `Contact ${guesthouse.name}`,
        'data-analytics-guesthouse-slug': guesthouse.slug,
        'data-analytics-destination-slug': guesthouse.destinationSlug
      }}
      title={guesthouse.name}
    />
  )
}

function BookingLink({ guesthouse }: { guesthouse: GuesthouseNavItem }) {
  return (
    <a
      href={guesthouse.bookingUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='flex items-center justify-between gap-4 rounded-md border border-white/15 bg-white/10 px-4 py-3 text-left text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/15 focus-visible:ring-1 focus-visible:ring-white/60 focus-visible:outline-hidden'
      data-analytics-event='booking_click'
      data-analytics-source-section='primary_nav_booking_menu'
      data-analytics-cta-label={guesthouse.name}
      data-analytics-booking-platform={guesthouse.bookingPlatformName}
      data-analytics-target-url={guesthouse.bookingUrl}
      data-analytics-guesthouse-slug={guesthouse.slug}
      data-analytics-destination-slug={guesthouse.destinationSlug}
    >
      <span className='flex min-w-0 flex-col'>
        <span className='truncate text-sm font-semibold text-white'>
          {guesthouse.name}
        </span>
        <span className='text-xs text-white/65'>
          Opens {guesthouse.bookingPlatformName}
        </span>
      </span>
      <ExternalLink className='size-4 shrink-0 text-white/65' />
    </a>
  )
}

function DesktopPanels({
  destinations,
  guesthouses
}: {
  destinations: DestinationNavItem[]
  guesthouses: GuesthouseNavItem[]
}) {
  return (
    <>
      <div
        id='primary-nav-guesthouses'
        data-nav-panel='guesthouses'
        data-state='closed'
        aria-hidden='true'
        inert
        className={desktopPanelStyles}
      >
        <div className={desktopPanelContentStyles}>
          <DesktopPanelIntro
            eyebrow='Places to stay'
            title='Guesthouses'
            description='Compare rooms, galleries, and contact options.'
            action={
              <Link
                href='/guesthouses'
                className={darkSmallPrimaryButtonStyles}
                data-analytics-event='property_detail_click'
                data-analytics-source-section='primary_nav'
                data-analytics-cta-label='View all guesthouses'
              >
                View all guesthouses
              </Link>
            }
          />
          <ul className={desktopCardGridStyles}>
            {guesthouses.map((guesthouse) => (
              <GuesthouseCard key={guesthouse.slug} guesthouse={guesthouse} />
            ))}
          </ul>
        </div>
      </div>

      <div
        id='primary-nav-destinations'
        data-nav-panel='destinations'
        data-state='closed'
        aria-hidden='true'
        inert
        className={desktopPanelStyles}
      >
        <div className={desktopPanelContentStyles}>
          <DesktopPanelIntro
            eyebrow='Local guides'
            title='Destinations'
            description='Find local guides and nearby guesthouses.'
          />
          <ul className={desktopCardGridStyles}>
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.slug}
                destination={destination}
              />
            ))}
          </ul>
        </div>
      </div>

      <div
        id='primary-nav-contact'
        data-nav-panel='contact'
        data-state='closed'
        aria-hidden='true'
        inert
        className={desktopPanelStyles}
      >
        <div className={desktopPanelContentStyles}>
          <DesktopPanelIntro
            eyebrow='Get in touch'
            title='Contact'
            description="Reach out with any questions or booking needs. We're happy to help."
          />
          <ul className={desktopCardGridStyles}>
            {guesthouses.map((guesthouse) => (
              <ContactCard key={guesthouse.slug} guesthouse={guesthouse} />
            ))}
          </ul>
        </div>
      </div>

      <div
        id='primary-nav-booking'
        data-nav-panel='booking'
        data-state='closed'
        aria-hidden='true'
        inert
        className={desktopPanelStyles}
      >
        <div className='relative z-10 container mx-auto grid max-w-5xl gap-5 py-5 lg:grid-cols-[14rem_1fr]'>
          <div>
            <p className='text-gold-300 text-xs font-bold tracking-wide uppercase'>
              Direct booking paths
            </p>
            <h2 className='mt-1 text-2xl font-semibold text-white'>
              Book your stay
            </h2>
            <p className='mt-2 text-sm text-white/70'>
              Book your stay on NightsBridge.
            </p>
          </div>
          <div className='grid gap-3 sm:grid-cols-2'>
            {guesthouses.map((guesthouse) => (
              <BookingLink key={guesthouse.slug} guesthouse={guesthouse} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function MobileMenu({
  destinations,
  guesthouses
}: {
  destinations: DestinationNavItem[]
  guesthouses: GuesthouseNavItem[]
}) {
  return (
    <div
      id='primary-nav-mobile-menu'
      data-mobile-menu
      data-mobile-menu-panel
      data-state='closed'
      hidden
      aria-hidden='true'
      inert
      className={mobileMenuPanelStyles}
    >
      <div className='relative z-10 container mx-auto flex min-h-0 w-full flex-1 flex-col'>
        <div className='flex shrink-0 items-center justify-between'>
          <p className='text-sm font-bold tracking-wide text-white/80 uppercase'>
            Menu
          </p>
          <button
            type='button'
            className={twMerge(darkIconButtonStyles, 'shrink-0')}
            data-nav-close
          >
            <span className='sr-only'>Close nav menu</span>
            <X aria-hidden='true' />
          </button>
        </div>

        <div className='mt-5 min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain'>
          <div className='flex flex-col gap-5'>
            <section>
              <h2 className='text-gold-300 text-xs font-bold tracking-wide uppercase'>
                Book a stay
              </h2>
              <div className='mt-3 grid gap-2'>
                {guesthouses.map((guesthouse) => (
                  <BookingLink key={guesthouse.slug} guesthouse={guesthouse} />
                ))}
              </div>
            </section>

            <MobileNavSection title='Recommended guesthouses' defaultOpen>
              <ul className='mt-2 grid gap-3'>
                {guesthouses.map((guesthouse) => (
                  <GuesthouseCard
                    key={guesthouse.slug}
                    guesthouse={guesthouse}
                    variant='mobile'
                  />
                ))}
              </ul>
            </MobileNavSection>

            <MobileNavSection title='Destinations & Guides'>
              <ul className='mt-2 grid gap-3'>
                {destinations.map((destination) => (
                  <DestinationCard
                    key={destination.slug}
                    destination={destination}
                  />
                ))}
              </ul>
            </MobileNavSection>

            <div className='grid gap-2 border-t border-white/10 pt-4'>
              <Link
                href='/about'
                className={twMerge(mobileMenuRowStyles, 'justify-start')}
              >
                About
              </Link>
              <MobileNavSection title='Contact' className='border-t-0 pt-0'>
                <ul className='mt-2 grid gap-3'>
                  {guesthouses.map((guesthouse) => (
                    <ContactCard
                      key={guesthouse.slug}
                      guesthouse={guesthouse}
                    />
                  ))}
                </ul>
              </MobileNavSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function Navbar(): Promise<React.JSX.Element> {
  const { destinations, guesthouses, logo } = await getPrimaryNavData()

  return (
    <NavbarShell>
      <div className='relative z-10 container mx-auto flex h-full items-center'>
        <div className='flex shrink-0 items-center'>
          <button
            type='button'
            className={twMerge(darkIconButtonStyles, 'mr-1 shrink-0 xl:hidden')}
            aria-controls='primary-nav-mobile-menu'
            aria-expanded='false'
            data-mobile-menu-trigger
          >
            <span className='sr-only'>Open nav menu</span>
            <AlignJustify aria-hidden='true' />
          </button>

          <Link href='/' aria-label='Home' className='shrink-0'>
            <div className='relative h-14 w-32 sm:w-36'>
              <Image
                src={logo.url}
                alt={logo.alt}
                fill
                className='object-contain object-center'
                sizes='(max-width: 640px) 8rem, 9rem'
                loading='eager'
                fetchPriority='high'
                unoptimized={logo.isSvg}
              />
            </div>
          </Link>
        </div>

        <div className='min-w-0 flex-1 xl:flex xl:justify-center'>
          <nav
            aria-label='Primary navigation'
            className='hidden items-center gap-1 xl:flex'
          >
            <DropdownTrigger id='guesthouses' label='Open guesthouses menu'>
              Guesthouses
            </DropdownTrigger>
            <DropdownTrigger
              id='destinations'
              label='Open destinations and guides menu'
            >
              Destinations & Guides
            </DropdownTrigger>
            <Link href='/about' className={textLinkStyles}>
              About
            </Link>
            <DropdownTrigger id='contact' label='Open contact menu'>
              Contact
            </DropdownTrigger>
            <button
              type='button'
              className={twMerge(
                getButtonStyles({ variant: 'default', colour: 'olive' }),
                darkPrimaryButtonStyles,
                'group text-base font-semibold capitalize'
              )}
              aria-controls='primary-nav-booking'
              aria-expanded='false'
              data-analytics-event='booking_menu_open'
              data-analytics-source-section='primary_nav'
              data-analytics-cta-label='Book now'
              data-nav-trigger='booking'
            >
              Book now
              <ChevronDown
                className={twMerge(
                  dropdownChevronStyles,
                  'group-aria-expanded:rotate-180'
                )}
                aria-hidden='true'
              />
            </button>
          </nav>
        </div>

        <div className='flex shrink-0 items-center gap-2'>
          <button
            type='button'
            className={twMerge(
              darkSmallPrimaryButtonStyles,
              'font-bold uppercase xl:hidden'
            )}
            aria-controls='primary-nav-mobile-menu'
            aria-expanded='false'
            data-mobile-menu-trigger
          >
            Book
          </button>

          <Link className='hidden xl:block' href='/guesthouses'>
            <span className='sr-only'>View our guesthouses</span>
            <CountryOutline className='text-white/85 transition-colors hover:text-white' />
          </Link>
        </div>
      </div>

      <DesktopPanels destinations={destinations} guesthouses={guesthouses} />
      <div
        data-mobile-menu
        data-mobile-menu-backdrop
        data-state='closed'
        data-nav-close
        hidden
        aria-hidden='true'
        className={mobileMenuBackdropStyles}
      />
      <MobileMenu destinations={destinations} guesthouses={guesthouses} />
    </NavbarShell>
  )
}
