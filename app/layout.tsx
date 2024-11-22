import type { Metadata } from "next";
import localFont from "next/font/local";
import { GlobalHeader } from "@/components/global-header";
import { getTheme } from "@/lib/theme";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GlobalSidebar } from "@/components/global-sidebar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Popcoin",
  description: "Search and review movies.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const theme = await getTheme();
    return (
      <html lang="en" className={theme}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen`}
        >
          <SidebarProvider>
            <GlobalSidebar />
            <main className="w-full">
              <GlobalHeader />
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </body>
      </html>
    );
}
