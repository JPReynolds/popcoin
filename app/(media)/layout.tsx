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
      <main className="w-full h-screen flex flex-col overflow-x-hidden">
        <SidebarTrigger className="z-10" />
        {children}
      </main>
    </Providers>
  );
}
