'use client';

import NextLink from 'next/link';
import React, { Fragment } from 'react';
import { ChevronDown } from 'lucide-react';

import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react';

import { CountryOutline, MinimalTextLogo } from '@/ui/logo';

const linkStyle =
  'bg-transparent font-normal min-w-0 p-0 m-0 text-medium text-default-700 data-[hover=true]:bg-transparent';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Contact Us', href: '/contact' },
  {
    name: 'Our Locations',
    dropdownItems: [
      { name: 'All Guesthouses', href: '/guesthouses' },
      { name: 'The Paarl Grand', href: '/guesthouses/paarl-grand' },
      { name: 'The Kathu Grand', href: '/guesthouses/kathu-grand' }
    ]
  }
];

function CustomLink({
  name,
  href,
  onClick
}: {
  name: string;
  href: string;
  onClick?: () => void;
}): JSX.Element {
  return (
    <Button
      as={NextLink}
      href={href}
      onClick={onClick}
      className={linkStyle}
      disableRipple
    >
      {name}
    </Button>
  );
}

export function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <NextNavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className='bg-white dark:bg-background-50'
    >
      <NavbarContent>
        {/* Mobile menu toggle */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        {/* Branding */}
        <NavbarBrand>
          <NextLink href='/'>
            <MinimalTextLogo />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu */}
      <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
        {menuItems.map(({ name, href, dropdownItems }) =>
          dropdownItems ? (
            <Dropdown key={name}>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className={linkStyle}
                    endContent={<ChevronDown />}
                    variant='light'
                  >
                    {name}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu aria-label={name}>
                {dropdownItems.map(({ name, href }) => (
                  <DropdownItem as={NextLink} key={name} href={href}>
                    {name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem key={name}>
              <CustomLink name={name} href={href} />
            </NavbarItem>
          )
        )}
        <Button
          as={NextLink}
          color='default'
          href='#'
          variant='solid'
          className='font-semibold uppercase'
        >
          Book Now
        </Button>
      </NavbarContent>

      {/* Right-hand Content */}
      <NavbarContent justify='end'>
        <NavbarItem>
          <Button
            as={NextLink}
            color='default'
            href='#'
            variant='solid'
            className='font-semibold uppercase sm:hidden'
          >
            Book Now
          </Button>
        </NavbarItem>

        <NavbarItem className='hidden sm:block'>
          <CountryOutline />
        </NavbarItem>

        {/* Mobile Menu */}
        <NavbarMenu>
          {menuItems.map(({ name, href, dropdownItems }) =>
            href ? (
              <NavbarMenuItem key={name}>
                <CustomLink name={name} href={href} onClick={handleLinkClick} />
              </NavbarMenuItem>
            ) : (
              dropdownItems && (
                <Fragment key={name}>
                  <NavbarMenuItem className='font-bold text-primary-500'>
                    <span>{name}</span>
                  </NavbarMenuItem>
                  <NavbarMenuItem className='ml-3'>
                    <ul>
                      {dropdownItems.map(({ name, href }) => (
                        <NavbarMenuItem key={name}>
                          <CustomLink
                            name={name}
                            href={href}
                            onClick={handleLinkClick}
                          />
                        </NavbarMenuItem>
                      ))}
                    </ul>
                  </NavbarMenuItem>
                </Fragment>
              )
            )
          )}
        </NavbarMenu>
      </NavbarContent>
    </NextNavbar>
  );
}
