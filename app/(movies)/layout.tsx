import { GlobalSidebar } from "@/components/global-sidebar";
import Providers from "../providers";
import { GlobalHeader } from "@/components/global-header";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const metadata = {
  title: "Popcoin - Movies",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <GlobalSidebar />
      <main className="w-full">
        <GlobalHeader />
        <SidebarTrigger />
        <div className="flex-1 flex flex-col px-[15%]">{children}</div>
      </main>
    </Providers>
  );
}
