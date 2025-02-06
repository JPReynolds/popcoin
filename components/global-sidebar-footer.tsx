import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { getTheme } from "@/lib/theme";
import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";

export async function GlobalSidebarFooter() {
  const theme = await getTheme();
  const session = await auth();
  return (
    <div className="flex flex-row gap-2">
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
  );
}
