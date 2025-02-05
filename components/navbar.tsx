"use client";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
} from "./ui/navigation-menu";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const Link = ({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NavigationMenuLink
      asChild
      active={isActive}
      className={navigationMenuTriggerStyle()}
    >
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    </NavigationMenuLink>
  );
};

export function NavBar() {
  return (
    <div className="w-full flex justify-center">
      <NavigationMenu className="p-2">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/movies">Movies</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/categories">Categories</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
