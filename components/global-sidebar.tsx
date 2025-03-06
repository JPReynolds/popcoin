"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Telescope, TrendingUp, Popcorn, Glasses } from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

const navigationItems = {
  movies: [
    {
      title: "Discover",
      url: "/movies/discover",
      icon: <Telescope />,
    },
    {
      title: "Popular",
      url: "/movies/popular",
      icon: <Star />,
    },
    {
      title: "Trending",
      url: "/movies/trending",
      icon: <TrendingUp />,
    },
    {
      title: "Watchlist",
      url: "/movies/watchlist",
      icon: <Glasses />,
    },
  ],
  series: [
    {
      title: "Discover",
      url: "/series/discover",
      icon: <Telescope />,
    },
    {
      title: "Popular",
      url: "/series/popular",
      icon: <Star />,
    },
    {
      title: "Trending",
      url: "/series/trending",
      icon: <TrendingUp />,
    },
    {
      title: "Watchlist",
      url: "/series/watchlist",
      icon: <Glasses />,
    },
  ],
};

export function GlobalSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();
  const defaultTab = pathname.startsWith("/series") ? "series" : "movies";

  const getCurrentSection = () => {
    const parts = pathname.split("/");

    // If there's an ID in the path, return discover
    if (id) return "discover";

    return parts.length > 2 ? parts[2] : "discover";
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-center gap-2">
        <Popcorn />
        Popcoin
      </SidebarHeader>
      <SidebarContent>
        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="p-2">
            <TabsList className="w-full">
              <TabsTrigger value="movies" className="flex-1">
                <Link href={`/movies/${getCurrentSection()}`}>Movies</Link>
              </TabsTrigger>
              <TabsTrigger value="series" className="flex-1">
                <Link href={`/series/${getCurrentSection()}`}>Series</Link>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="movies" className="m-0">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.movies.map((item) => (
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
          </TabsContent>

          <TabsContent value="series">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.series.map((item) => (
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
          </TabsContent>
        </Tabs>
      </SidebarContent>
      <SidebarFooter>{children}</SidebarFooter>
    </Sidebar>
  );
}
