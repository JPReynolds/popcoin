import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { getTheme } from "@/lib/theme";
import { Popcorn } from "lucide-react";
import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";

export async function GlobalHeader() {
  const theme = await getTheme();
  const session = await auth();
  return (
    <header className="p-2 flex flex-row items-center justify-between border-solid border-b-2">
      <div className="w-10" />
      <Link href="/" className="uppercase flex flex-row">
        <Popcorn />
        Popcoin
      </Link>
      <div>
        {session ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant="outline" type="submit">
              Log Out
            </Button>
          </form>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </>
        )}
        <ThemeSwitcher initialTheme={theme} />
      </div>
    </header>
  );
}
