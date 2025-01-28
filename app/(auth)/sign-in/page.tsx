"use client";
import React, { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Github } from "lucide-react";
import { login } from "../actions";

export default function SignIn() {
  const [state, formAction] = useActionState(login, {});

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-h3">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-body-sm">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-body-sm">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                className="w-full"
                // required
              />
            </div>

            {state?.message && (
              <div className="text-red-500">{state.message}</div>
            )}

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="my-8 w-full bg-accent h-[1px]" />
          <form>
            <Button type="submit" className="w-full">
              <Github />
              <span>Sign in with GitHub</span>
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-body-sm text-muted-foreground">
            Dont have an account?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
