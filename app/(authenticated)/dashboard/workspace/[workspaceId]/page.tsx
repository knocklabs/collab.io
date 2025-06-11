/* eslint-disable @next/next/no-img-element */
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function WorkspacePage({ params }: PageProps) {
  const { workspaceId } = await params;
  const users = await prisma.workspace_seat.findMany({
    where: {
      workspaceId,
    },
    select: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  return (
    <>
      <h2 className="text-2xl font-bold m-4">Workspace Users</h2>
      <div className="px-4 w-full overflow-auto max-h-96">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-2 auto-rows-max">
          {users.map((seat) => (
            <div
              key={seat.user.id}
              className="px-4 py-4 max-h-16 flex items-center border rounded-md shadow-sm"
            >
              <div className="flex items-center gap-2 w-full">
                <img
                  src={seat.user.image || "/assets/default-avatar.png"}
                  alt={`${seat.user.name}'s avatar`}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 leading-tight">
                  <h3 className="font-medium text-sm leading-tight m-0">
                    {seat.user.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-tight m-0">
                    {seat.user.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export const dynamic = "force-dynamic";
