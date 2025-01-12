"use server";

import { z } from "zod";

const SignUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
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
  username?: string;
  password?: string;
  email?: string;
  errors?: {
    username?: string[];
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
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to create account.",
    };
  }

  // @TODO
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    message: "Account created successfully!",
  };
}
