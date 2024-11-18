import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";

export function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href='/' legacyBehavior passHref>
            <NavigationMenuLink>The Grand Collection</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>

      <DarkModeToggle />
    </NavigationMenu>
  );
}
