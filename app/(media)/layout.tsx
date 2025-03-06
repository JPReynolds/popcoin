import { Suspense } from "react";
import { GlobalSidebar } from "@/components/global-sidebar";
import Providers from "../providers";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { GlobalSidebarFooter } from "@/components/global-sidebar-footer";

export const metadata = {
  title: "Popcoin",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <GlobalSidebar>
        <Suspense fallback={<div>Loading...</div>}>
          <GlobalSidebarFooter />
        </Suspense>
      </GlobalSidebar>
      <main className="w-full h-screen flex flex-col">
        <SidebarTrigger />
        <div className="flex-1 flex flex-col px-4 sm:px-[10%] md:px-[15%] lg:px-[20%] xl:px-[25%]">
          {children}
        </div>
      </main>
    </Providers>
  );
}
