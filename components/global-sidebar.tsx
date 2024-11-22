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
} from "@/components/ui/sidebar"
import Link from "next/link"

const movieSections = [
    {
        title: "All",
        url: "/movies",
    },
    {
        title: "Trending",
        url: "/trending",
    },
    {
        title: "Popular",
        url: "/popular",
    },
    {
        title: "Upcoming",
        url: "/upcoming",
    }
]
   
export function GlobalSidebar() {
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
                            <Link href={item.url}>{item.title}</Link>
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
    )
}