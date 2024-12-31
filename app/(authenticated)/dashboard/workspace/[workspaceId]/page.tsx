/* eslint-disable @next/next/no-img-element */
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: {
    workspaceId: string;
  };
}

export default async function WorkspacePage({ params }: PageProps) {
  const awaitedParams = await params;
  console.log(awaitedParams);
  const users = await prisma.workspace_seat.findMany({
    where: {
      workspaceId: awaitedParams.workspaceId,
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
      <div className="flex-1 flex w-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
          {users.map((seat) => (
            <div
              key={seat.user.id}
              className="p-4 border rounded-md shadow-sm h-24 flex items-center"
            >
              <div className="flex items-center gap-4 w-full">
                <img
                  src={seat.user.image || "/assets/default-avatar.png"}
                  alt={`${seat.user.name}'s avatar`}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{seat.user.name}</h3>
                  <p className="text-sm text-gray-600">{seat.user.email}</p>
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
