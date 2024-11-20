"use client";

import React from "react";
import NextLink from "next/link";

import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button
} from "@nextui-org/react";

import { CountryOutline, MinimalTextLogo } from "@/ui/logo";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Our Locations", href: "/locations" },
    { name: "Contact Us", href: "/contact" }
  ];

  return (
    <NextNavbar
      onMenuOpenChange={setIsMenuOpen}
      className='bg-white dark:bg-default-100'
    >
      <NavbarContent>
        {/* Mobile menu toggle */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
        {menuItems.map(({ name, href }) => (
          <NavbarItem key={href}>
            <NextLink href={href} legacyBehavior passHref>
              <Link color='foreground'>{name}</Link>
            </NextLink>
          </NavbarItem>
        ))}
        <Button
          as={Link}
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
        {/* <NavbarItem>
          <Button
            as={Link}
            color='default'
            href='#'
            variant='solid'
            className='font-semibold uppercase'
          >
            Book Now
          </Button>
        </NavbarItem> */}

        <NavbarItem className='hidden sm:block'>
          <CountryOutline />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuItems.map(({ name, href }) => (
          <NavbarMenuItem key={href}>
            <NextLink href={href} legacyBehavior passHref>
              <Link className='w-full text-default-800'>{name}</Link>
            </NextLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextNavbar>
  );
}
