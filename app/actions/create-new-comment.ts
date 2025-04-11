"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { knock } from "@/lib/knock";

export async function createNewComment({
  text,
  workspaceId,
  projectId,
  assetId,
  assetName,
}: {
  text: string;
  workspaceId: string;
  projectId: string;
  assetId: string;
  assetName: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const comment = await prisma.comment.create({
    data: {
      text,
      authorId: session.user.id,
      workspaceId,
      projectId,
      assetId,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  const workspaceSeats = await prisma.workspace_seat.findMany({
    where: { workspaceId },
    select: { userId: true },
  });

  const userRecipients = workspaceSeats
    .map((seat) => seat.userId)
    .filter((userId) => userId !== session!.user!.id);
  const objectRecipients = [{ id: projectId, collection: "projects" }];

  await knock.workflows.trigger("create-new-comment", {
    actor: session.user.id,
    recipients: [...userRecipients, ...objectRecipients],
    data: {
      ...comment,
      assetId,
      projectId,
      assetName,
      workspaceId,
    },
    tenant: workspaceId,
  });

  revalidatePath(`/dashboard/${workspaceId}/projects/${projectId}`);
  return comment;
}
