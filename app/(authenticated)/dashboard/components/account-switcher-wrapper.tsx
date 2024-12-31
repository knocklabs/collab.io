import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AccountSwitcher } from "./account-switcher";
import React from "react";

export async function AccountSwitcherWrapper({
  currentWorkspace,
}: {
  currentWorkspace?: {
    id: string;
    name: string;
    url: string;
  };
}) {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const workspaceSeats = await prisma.workspace_seat.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    include: {
      workspace: true,
    },
  });

  return (
    <AccountSwitcher
      workspaceSeats={workspaceSeats}
      currentWorkspace={currentWorkspace}
    />
  );
}
