/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return <div className="p-6">Please sign in to view your workspaces</div>;
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
    <div className="p-6 h-full">
      <h1 className="text-2xl font-bold mb-4">Your Workspaces</h1>
      <div className="space-y-4">
        {workspaceSeats.map((seat) => (
          <a
            href={`/dashboard/workspace/${seat.workspace.id}`}
            key={seat.id}
            className="block p-4 border rounded-lg hover:border-gray-400 transition-colors"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-lg h-48 relative mb-3">
                <img
                  src={seat.workspace.url}
                  alt={`${seat.workspace.name} thumbnail`}
                  className="w-full h-full object-contain rounded"
                />
              </div>
              <div>
                <h2 className="font-semibold">{seat.workspace.name}</h2>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
