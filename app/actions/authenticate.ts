// app/actions/authenticate.ts
"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"; // Make sure you have this import

type State = {
  error: string | null;
  attempted: boolean;
};

export async function authenticate(formData: FormData): Promise<State> {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (result?.error) {
      return {
        error: "Invalid credentials",
        attempted: true,
      };
    }

    // Get the user's email that just signed in
    const email = formData.get("email") as string;

    // Find the user and their most recent workspace seat
    const userWithWorkspace = await prisma.user.findUnique({
      where: { email },
      select: {
        Workspace_seat: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          select: {
            workspaceId: true,
          },
        },
      },
    });

    const workspaceId = userWithWorkspace?.Workspace_seat[0]?.workspaceId;

    if (!workspaceId) {
      // If no workspace is found, redirect to the default dashboard
      redirect("/dashboard");
    }

    // Redirect to the specific workspace dashboard
    redirect(`/dashboard/workspace/${workspaceId}`);
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Invalid credentials",
        attempted: true,
      };
    }
    throw error;
  }
}
