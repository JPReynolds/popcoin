import type { Metadata } from "next";
import localFont from "next/font/local";
import { GlobalHeader } from "@/components/global-header";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { getTheme } from "@/lib/theme";

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
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen flex flex-col`}
        >
          <GlobalHeader />
          <NavBar />
          <main className="px-[15%] flex-1 flex flex-col">
            {children}
          </main>
        </body>
      </html>
    );
}
