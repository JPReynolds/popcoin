"use server";

import { prisma } from "@/prisma/prisma";
import { z } from "zod";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

const SignUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export type SignUpActionState = {
  name?: string;
  password?: string;
  email?: string;
  errors?: {
    name?: string[];
    password?: string[];
    email?: string[];
  };
  message?: string;
};

export async function signUp(
  _prevState: SignUpActionState,
  formData: FormData
): Promise<SignUpActionState> {
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to create account.",
    };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await prisma.user.findFirst({
    select: {
      id: true,
    },
    where: { email },
  });

  if (existingUser) {
    return {
      errors: {
        email: ["An account with this email already exists"],
      },
      message: "Failed to create account.",
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("User created!!");
  } catch (e) {
    console.error("Failed to create user", e);
    return {
      errors: {},
      message: "Something went wrong. Please try again.",
    };
  }
  redirect("/");
}
