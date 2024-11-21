import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { getTheme } from "@/lib/theme";

export async function GlobalHeader() {
    const theme = await getTheme();
    return (
        <header className="p-2 flex flex-row items-center border-solid border-b-2">
            <h1 className="flex-1">
                <Link href="/">
                    Popcoin
                </Link>
            </h1>
            <ThemeSwitcher initialTheme={theme} />
        </header>
    );
}
