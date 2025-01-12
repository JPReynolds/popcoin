"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Star, Telescope, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const movieSections = [
  {
    title: "Discover",
    url: "/discover",
    icon: <Telescope />,
  },
  {
    title: "Trending",
    url: "/trending",
    icon: <TrendingUp />,
  },
  {
    title: "Popular",
    url: "/popular",
    icon: <Star />,
  },
];

export function GlobalSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      {/* <SidebarHeader /> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Movies</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {movieSections.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`${
                        pathname === item.url
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }`}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      {/* <SidebarFooter /> */}
    </Sidebar>
  );
}
