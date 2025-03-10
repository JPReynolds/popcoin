import { Suspense } from "react";
import { GlobalSidebar } from "@/components/global-sidebar";
import Providers from "../providers";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { GlobalSidebarFooter } from "@/components/global-sidebar-footer";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { getTheme } from "@/lib/theme";

export const metadata = {
  title: "Popcoin",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getTheme();
  return (
    <Providers>
      <GlobalSidebar>
        <Suspense fallback={<div>Loading...</div>}>
          <GlobalSidebarFooter />
        </Suspense>
      </GlobalSidebar>
      <main className="w-full h-screen flex flex-col">
        <div className="flex flex-row justify-between">
          <SidebarTrigger />
          <ThemeSwitcher initialTheme={theme} />
        </div>
        <div className="flex-1 flex flex-col px-4 sm:px-[10%] md:px-[15%] lg:px-[20%] xl:px-[25%]">
          {children}
        </div>
      </main>
    </Providers>
  );
}
