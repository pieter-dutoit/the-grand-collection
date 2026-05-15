import 'server-only'

import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import {
  AlignJustify,
  ChevronDown,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  X
} from 'lucide-react'

import { getButtonStyles } from '@/components/ui/button'
import { CountryOutline } from '@/components/ui/logos'

import NavbarShell from './navbar-shell'
import {
  DestinationNavItem,
  getPrimaryNavData,
  GuesthouseNavItem
} from './nav-data'

const desktopTriggerStyles = twMerge(
  getButtonStyles({ variant: 'ghost', colour: 'olive' }),
  'h-10 text-sm font-bold uppercase'
)

const textLinkStyles = twMerge(
  getButtonStyles({ variant: 'ghost', colour: 'olive' }),
  'h-10 text-sm font-bold uppercase'
)

const mobileSectionTitleStyles =
  'flex w-full cursor-pointer list-none items-center justify-between rounded-md px-2 py-3 text-left text-sm font-bold uppercase text-olive-800 transition-colors hover:bg-olive-50 [&::-webkit-details-marker]:hidden'

const dropdownChevronStyles =
  'size-4 transition-transform duration-200 motion-reduce:transition-none'

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

function ImageFrame({
  image,
  sizes,
  className
}: {
  className: string
  image: GuesthouseNavItem['image'] | DestinationNavItem['image']
  sizes: string
}) {
  return (
    <div
      className={twMerge(
        'border-gold-100 relative shrink-0 overflow-hidden rounded-md border bg-olive-100',
        className
      )}
    >
      {image.url && (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className='object-cover object-center'
          sizes={sizes}
          fetchPriority='low'
          unoptimized={image.isSvg}
        />
      )}
    </div>
  )
}

function GuesthouseCard({ guesthouse }: { guesthouse: GuesthouseNavItem }) {
  return (
    <li className='rounded-lg border border-olive-100 bg-white transition-colors hover:bg-olive-50/60'>
      <div className='flex gap-3 p-3'>
        <Link
          href={guesthouse.href}
          className='flex min-w-0 flex-1 gap-3'
          data-analytics-event='property_detail_click'
          data-analytics-source-section='primary_nav'
          data-analytics-cta-label={guesthouse.name}
          data-analytics-guesthouse-slug={guesthouse.slug}
          data-analytics-destination-slug={guesthouse.destinationSlug}
        >
          <ImageFrame
            image={guesthouse.image}
            className='size-18'
            sizes='72px'
          />
          <span className='flex min-w-0 flex-col'>
            <span className='truncate text-base font-semibold text-olive-800'>
              {guesthouse.name}
            </span>
            <span className='mt-1 flex items-center text-xs font-semibold text-olive-500'>
              <MapPin className='mr-1 size-3.5 shrink-0' aria-hidden='true' />
              <span className='truncate'>
                {guesthouse.city}, {guesthouse.province}
              </span>
            </span>
            <span className='text-gold-600 mt-2 text-xs font-bold'>
              View property
            </span>
          </span>
        </Link>
      </div>
      <div className='grid grid-cols-3 border-t border-olive-100 text-center text-xs font-semibold text-olive-600'>
        {[
          { href: `${guesthouse.href}#rooms`, label: 'Rooms & Rates' },
          { href: `${guesthouse.href}#gallery`, label: 'Gallery' },
          { href: `${guesthouse.href}#contact`, label: 'Contact' }
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className='border-r border-olive-100 px-2 py-2 last:border-r-0 hover:bg-olive-50 hover:text-olive-900'
            data-analytics-event='article_anchor_click'
            data-analytics-source-section='primary_nav'
            data-analytics-cta-label={`${guesthouse.name} ${label}`}
            data-analytics-guesthouse-slug={guesthouse.slug}
          >
            {label}
          </Link>
        ))}
      </div>
    </li>
  )
}

function DestinationCard({ destination }: { destination: DestinationNavItem }) {
  return (
    <li className='rounded-lg border border-olive-100 bg-white p-3 transition-colors hover:bg-olive-50/60'>
      <Link
        href={destination.href}
        className='flex gap-3'
        data-analytics-event='article_anchor_click'
        data-analytics-source-section='primary_nav'
        data-analytics-cta-label={destination.name}
        data-analytics-destination-slug={destination.slug}
      >
        <ImageFrame
          image={destination.image}
          className='h-18 w-24'
          sizes='96px'
        />
        <span className='flex min-w-0 flex-col'>
          <span className='truncate text-base font-semibold text-olive-800'>
            {destination.name}
          </span>
          <span className='mt-1 line-clamp-2 text-xs text-olive-600'>
            {destination.description}
          </span>
        </span>
      </Link>
      <div className='mt-3 flex flex-wrap gap-2'>
        <Link
          href={`${destination.href}#travel-guides`}
          className={twMerge(
            getButtonStyles({
              variant: 'outline',
              colour: 'olive',
              size: 'sm'
            }),
            'text-xs'
          )}
          data-analytics-event='article_anchor_click'
          data-analytics-source-section='primary_nav'
          data-analytics-cta-label={`${destination.name} travel guides`}
          data-analytics-destination-slug={destination.slug}
        >
          Travel guides
        </Link>
        <Link
          href={`${destination.href}#where-to-stay`}
          className={twMerge(
            getButtonStyles({
              variant: 'outline',
              colour: 'olive',
              size: 'sm'
            }),
            'text-xs'
          )}
          data-analytics-event='article_guesthouse_click'
          data-analytics-source-section='primary_nav'
          data-analytics-cta-label={`${destination.name} where to stay`}
          data-analytics-destination-slug={destination.slug}
        >
          Where to stay
        </Link>
      </div>
    </li>
  )
}

function BookingLink({ guesthouse }: { guesthouse: GuesthouseNavItem }) {
  return (
    <a
      href={guesthouse.bookingUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='flex items-center justify-between gap-4 rounded-md border border-olive-200 bg-white px-4 py-3 text-left transition-colors hover:border-olive-500 hover:bg-olive-50'
      data-analytics-event='booking_click'
      data-analytics-source-section='primary_nav_booking_menu'
      data-analytics-cta-label={guesthouse.name}
      data-analytics-booking-platform={guesthouse.bookingPlatformName}
      data-analytics-target-url={guesthouse.bookingUrl}
      data-analytics-guesthouse-slug={guesthouse.slug}
      data-analytics-destination-slug={guesthouse.destinationSlug}
    >
      <span className='flex min-w-0 flex-col'>
        <span className='truncate text-sm font-semibold text-olive-800'>
          {guesthouse.name}
        </span>
        <span className='text-xs text-olive-500'>
          Opens {guesthouse.bookingPlatformName}
        </span>
      </span>
      <ExternalLink className='size-4 shrink-0 text-olive-500' />
    </a>
  )
}

function ContactLink({ guesthouse }: { guesthouse: GuesthouseNavItem }) {
  return (
    <li className='rounded-lg border border-olive-100 bg-white p-4'>
      <Link
        href={`${guesthouse.href}#contact`}
        className='font-semibold text-olive-800 hover:text-olive-950'
        data-analytics-event='article_anchor_click'
        data-analytics-source-section='primary_nav'
        data-analytics-cta-label={`Contact ${guesthouse.name}`}
        data-analytics-guesthouse-slug={guesthouse.slug}
      >
        Contact {guesthouse.name}
      </Link>
      <p className='mt-1 flex items-center text-xs font-semibold text-olive-500'>
        <MapPin className='mr-1 size-3.5' aria-hidden='true' />
        {guesthouse.city}, {guesthouse.province}
      </p>
      {(guesthouse.contact?.phoneHref || guesthouse.contact?.emailHref) && (
        <div className='mt-3 flex flex-col gap-2 text-sm text-olive-700'>
          {guesthouse.contact.phoneHref && (
            <a
              href={guesthouse.contact.phoneHref}
              className='inline-flex items-center gap-2 hover:text-olive-950'
              data-analytics-event='contact_click'
              data-analytics-source-section='primary_nav_contact_menu'
              data-analytics-cta-label={`Call ${guesthouse.name}`}
              data-analytics-target-url={guesthouse.contact.phoneHref}
              data-analytics-guesthouse-slug={guesthouse.slug}
            >
              <Phone className='size-4' aria-hidden='true' />
              {guesthouse.contact.phone}
            </a>
          )}
          {guesthouse.contact.emailHref && (
            <a
              href={guesthouse.contact.emailHref}
              className='inline-flex min-w-0 items-center gap-2 hover:text-olive-950'
              data-analytics-event='contact_click'
              data-analytics-source-section='primary_nav_contact_menu'
              data-analytics-cta-label={`Email ${guesthouse.name}`}
              data-analytics-target-url={guesthouse.contact.emailHref}
              data-analytics-guesthouse-slug={guesthouse.slug}
            >
              <Mail className='size-4 shrink-0' aria-hidden='true' />
              <span className='truncate'>{guesthouse.contact.email}</span>
            </a>
          )}
        </div>
      )}
    </li>
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
        hidden
        className='absolute inset-x-0 top-full hidden border-b border-olive-100 bg-white shadow-lg xl:block'
      >
        <div className='container mx-auto grid gap-5 py-5 lg:grid-cols-[14rem_1fr]'>
          <div className='flex flex-col items-start'>
            <p className='text-gold-600 text-xs font-bold tracking-wide uppercase'>
              Places to stay
            </p>
            <h2 className='mt-1 text-2xl font-semibold text-olive-900'>
              Guesthouses
            </h2>
            <p className='mt-2 text-sm text-olive-600'>
              Compare the collection, view rooms, and move straight to booking.
            </p>
            <Link
              href='/guesthouses'
              className={twMerge(
                getButtonStyles({
                  variant: 'default',
                  colour: 'olive',
                  size: 'sm'
                }),
                'mt-4'
              )}
              data-analytics-event='property_detail_click'
              data-analytics-source-section='primary_nav'
              data-analytics-cta-label='View all guesthouses'
            >
              View all guesthouses
            </Link>
          </div>
          <ul className='grid gap-3 lg:grid-cols-2 xl:grid-cols-3'>
            {guesthouses.map((guesthouse) => (
              <GuesthouseCard key={guesthouse.slug} guesthouse={guesthouse} />
            ))}
          </ul>
        </div>
      </div>

      <div
        id='primary-nav-destinations'
        data-nav-panel='destinations'
        hidden
        className='absolute inset-x-0 top-full hidden border-b border-olive-100 bg-white shadow-lg xl:block'
      >
        <div className='container mx-auto grid gap-5 py-5 lg:grid-cols-[14rem_1fr]'>
          <div>
            <p className='text-gold-600 text-xs font-bold tracking-wide uppercase'>
              Local guides
            </p>
            <h2 className='mt-1 text-2xl font-semibold text-olive-900'>
              Destinations
            </h2>
            <p className='mt-2 text-sm text-olive-600'>
              Find local travel guides and nearby guesthouses in each
              destination.
            </p>
          </div>
          <ul className='grid gap-3 lg:grid-cols-2 xl:grid-cols-3'>
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
        hidden
        className='absolute inset-x-0 top-full hidden border-b border-olive-100 bg-white shadow-lg xl:block'
      >
        <div className='container mx-auto grid gap-5 py-5 lg:grid-cols-[14rem_1fr]'>
          <div>
            <p className='text-gold-600 text-xs font-bold tracking-wide uppercase'>
              Get in touch
            </p>
            <h2 className='mt-1 text-2xl font-semibold text-olive-900'>
              Contact
            </h2>
            <p className='mt-2 text-sm text-olive-600'>
              Choose a property to view directions, phone numbers, and booking
              contact details.
            </p>
          </div>
          <ul className='grid gap-3 lg:grid-cols-2 xl:grid-cols-3'>
            {guesthouses.map((guesthouse) => (
              <ContactLink key={guesthouse.slug} guesthouse={guesthouse} />
            ))}
          </ul>
        </div>
      </div>

      <div
        id='primary-nav-booking'
        data-nav-panel='booking'
        hidden
        className='absolute inset-x-0 top-full hidden border-b border-olive-100 bg-white shadow-lg xl:block'
      >
        <div className='container mx-auto grid max-w-5xl gap-5 py-5 lg:grid-cols-[14rem_1fr]'>
          <div>
            <p className='text-gold-600 text-xs font-bold tracking-wide uppercase'>
              Direct booking paths
            </p>
            <h2 className='mt-1 text-2xl font-semibold text-olive-900'>
              Book your stay
            </h2>
            <p className='mt-2 text-sm text-olive-600'>
              Continue to the active booking platform for your selected
              guesthouse.
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
      hidden
      className='fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-olive-100 bg-white/95 px-4 py-5 shadow-xl backdrop-blur-lg xl:hidden'
    >
      <div className='mx-auto flex w-full max-w-screen-sm flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <p className='text-sm font-bold tracking-wide text-olive-800 uppercase'>
            Menu
          </p>
          <button
            type='button'
            className={twMerge(
              getButtonStyles({
                variant: 'ghost',
                colour: 'olive',
                size: 'icon'
              }),
              'shrink-0'
            )}
            data-nav-close
          >
            <span className='sr-only'>Close nav menu</span>
            <X aria-hidden='true' />
          </button>
        </div>

        <section>
          <h2 className='text-gold-600 text-xs font-bold tracking-wide uppercase'>
            Book a stay
          </h2>
          <div className='mt-3 grid gap-2'>
            {guesthouses.map((guesthouse) => (
              <BookingLink key={guesthouse.slug} guesthouse={guesthouse} />
            ))}
          </div>
        </section>

        <details open className='group border-t border-olive-100 pt-2'>
          <summary className={mobileSectionTitleStyles}>
            Recommended guesthouses
            <ChevronDown
              className={twMerge(
                dropdownChevronStyles,
                'group-open:rotate-180'
              )}
              aria-hidden='true'
            />
          </summary>
          <ul className='mt-2 grid gap-3'>
            {guesthouses.map((guesthouse) => (
              <GuesthouseCard key={guesthouse.slug} guesthouse={guesthouse} />
            ))}
          </ul>
        </details>

        <details className='group border-t border-olive-100 pt-2'>
          <summary className={mobileSectionTitleStyles}>
            Destinations & Guides
            <ChevronDown
              className={twMerge(
                dropdownChevronStyles,
                'group-open:rotate-180'
              )}
              aria-hidden='true'
            />
          </summary>
          <ul className='mt-2 grid gap-3'>
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.slug}
                destination={destination}
              />
            ))}
          </ul>
        </details>

        <div className='grid gap-2 border-t border-olive-100 pt-4'>
          <Link
            href='/about'
            className={twMerge(
              getButtonStyles({ variant: 'ghost', colour: 'olive' }),
              'justify-start text-sm font-bold uppercase'
            )}
          >
            About
          </Link>
          <details className='group'>
            <summary className={mobileSectionTitleStyles}>
              Contact
              <ChevronDown
                className={twMerge(
                  dropdownChevronStyles,
                  'group-open:rotate-180'
                )}
                aria-hidden='true'
              />
            </summary>
            <ul className='mt-2 grid gap-3'>
              {guesthouses.map((guesthouse) => (
                <ContactLink key={guesthouse.slug} guesthouse={guesthouse} />
              ))}
            </ul>
          </details>
        </div>
      </div>
    </div>
  )
}

export default async function Navbar(): Promise<React.JSX.Element> {
  const { destinations, guesthouses, logo } = await getPrimaryNavData()

  return (
    <NavbarShell>
      <div className='container mx-auto flex h-full items-center'>
        <div className='flex shrink-0 items-center'>
          <button
            type='button'
            className={twMerge(
              getButtonStyles({
                variant: 'ghost',
                colour: 'olive',
                size: 'icon'
              }),
              'mr-1 shrink-0 xl:hidden'
            )}
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
                'group text-sm font-bold uppercase'
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
              getButtonStyles({
                variant: 'default',
                colour: 'olive',
                size: 'sm'
              }),
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
            <CountryOutline />
          </Link>
        </div>
      </div>

      <DesktopPanels destinations={destinations} guesthouses={guesthouses} />
      <MobileMenu destinations={destinations} guesthouses={guesthouses} />
    </NavbarShell>
  )
}
