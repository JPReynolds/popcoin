import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { getTheme } from "@/lib/theme";
import { Popcorn } from "lucide-react";

export async function GlobalHeader() {
  const theme = await getTheme();
  return (
    <header className="p-2 flex flex-row items-center justify-between border-solid border-b-2">
      <div className="w-10" />
      <Link href="/" className="uppercase flex flex-row">
        <Popcorn />
        Popcoin
      </Link>
      <Link href="/sign-up">Sign Up</Link>
      <ThemeSwitcher initialTheme={theme} />
    </header>
  );
}
