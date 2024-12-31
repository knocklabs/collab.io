// app/actions/create-new-user.ts
"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { z } from "zod";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

const UserSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export async function createUser(data: SignupData) {
  try {
    // 1. Validate form data
    const validatedFields = UserSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    const { name, email, password } = validatedFields.data;

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    // 3. Hash the password
    const hashedPassword = await hash(password, 10);

    // 4. Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 5. Sign in the user
    const signInResult = await signIn("credentials", {
      email,
      password, // Use unhashed password for sign in
      redirect: false,
    });

    if (signInResult?.error) {
      return { error: "Failed to sign in after creation" };
    }

    // 6. Redirect to dashboard
    redirect("/dashboard");

    // This won't be reached due to redirect, but kept for type safety
    return {
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Failed to create user" };
  }
}
