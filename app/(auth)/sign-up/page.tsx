"use client";
import React, { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { signUp } from "../actions";

export default function SignUp() {
  const [state, formAction] = useActionState(signUp, {});

  console.log(state);
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-h3">Create an account</CardTitle>
          <CardDescription className="text-body-sm text-muted-foreground">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-body-sm">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                className="w-full"
                required
              />
              {state.errors?.username && (
                <ul className="text-sm text-red-500">
                  {state.errors.username.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              )}
            </div>

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
              <ul className="text-sm text-red-500">
                {state.errors?.email?.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
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
                required
              />
              <ul className="text-sm text-red-500">
                {state.errors?.password?.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>

            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-body-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
