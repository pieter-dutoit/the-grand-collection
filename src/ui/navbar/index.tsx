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

import { CountryOutline, MinimalLogo } from "@/ui/logo";
import { ThemeToggle } from "@/ui/theme-toggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Our Locations", href: "/locations" },
    { name: "Contact Us", href: "/contact" }
  ];

  return (
    <NextNavbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        {/* Mobile menu toggle */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className='sm:hidden'
        />
        {/* Branding */}
        <NavbarBrand>
          <MinimalLogo />
          <p className='text-2xl font-light text-inherit'>
            <span className='block sm:hidden'>GC</span>
            <span className='hidden sm:block'>The Grand Collection</span>
          </p>
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
      </NavbarContent>

      {/* Right-hand Content */}
      <NavbarContent justify='end'>
        <NavbarItem>
          <Button
            as={Link}
            color='primary'
            href='#'
            variant='solid'
            className='font-semibold uppercase'
          >
            Book Now
          </Button>
        </NavbarItem>

        <NavbarItem>
          <CountryOutline />
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuItems.map(({ name, href }) => (
          <NavbarMenuItem key={href}>
            <NextLink href={href} legacyBehavior passHref>
              <Link className='w-full'>{name}</Link>
            </NextLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextNavbar>
  );
}
