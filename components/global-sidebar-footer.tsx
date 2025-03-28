import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "./ui/button";
import { CircleUserRound } from "lucide-react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "./ui/menubar";
import { ThemeSwitcher } from "./theme-switcher";
import { getTheme } from "@/lib/theme";
import { LogOut } from "./log-out";

export async function GlobalSidebarFooter() {
  const session = await auth();
  const user = session?.user;
  const theme = await getTheme();
  return (
    <div className="flex flex-row gap-2">
      {session ? (
        <Menubar className="w-full bg-transparent border-none shadow-none">
          <MenubarMenu>
            <MenubarTrigger className="flex flex-row w-full bg-transparent hover:bg-accent cursor-pointer">
              <CircleUserRound className="w-6 h-6" />
              <div className="flex flex-col items-start pl-2">
                <h5 className="text-sm font-medium">{user?.name}</h5>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </MenubarTrigger>
            <MenubarContent align="end">
              <MenubarItem disabled>
                <CircleUserRound className="w-6 h-6" />
                <div className="flex flex-col items-start pl-2">
                  <h5 className="text-sm font-medium">{user?.name}</h5>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem asChild>
                <ThemeSwitcher initialTheme={theme} />
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="">
                <LogOut />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ) : (
        <>
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </>
      )}
    </div>
  );
}
