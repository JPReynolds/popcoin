"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

export function LogOut() {
  return (
    <Button
      variant="ghost"
      type="submit"
      className="w-full p-2 justify-start"
      onClick={() => signOut()}
    >
      <LogOutIcon className="w-4 h-4" />
      Log Out
    </Button>
  );
}
