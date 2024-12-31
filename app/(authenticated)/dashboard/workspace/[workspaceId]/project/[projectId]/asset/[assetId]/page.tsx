/* eslint-disable @next/next/no-img-element */
import { CommentsSidebar } from "@/app/(authenticated)/dashboard/components/comments-sidebar";
import { prisma } from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Comment {
  id: string;
  text: string;
  author: {
    name: string | null;
    image: string | null;
  };
}

export default async function AssetPage({
  params,
}: {
  params: { assetId: string };
}) {
  const awaitedParams = await params;
  const assetId = awaitedParams.assetId;
  const asset = await prisma.asset.findUnique({
    where: {
      id: assetId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      url: true,
      projectId: true,
      workspaceId: true,
      comments: {
        select: {
          id: true,
          text: true,
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!asset) {
    throw new Error("Asset not found");
  }
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-2/3 p-4 overflow-auto">
        <div className="flex-1">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/dashboard/workspace/${asset.workspaceId}`}
                >
                  Workspace
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/dashboard/workspace/${asset.workspaceId}/project/${asset.projectId}`}
                >
                  Project
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Asset</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold mb-4">{asset.name}</h2>
          <img
            src={asset.url}
            alt={asset.name}
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
          <div className="mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={asset.author.image || undefined} />
                <AvatarFallback>{asset.author.name?.[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{asset.author.name}</span>
            </div>
            <p className="text-gray-600">{asset.description}</p>
          </div>
        </div>
      </div>
      <div className="w-1/3 border-l">
        <CommentsSidebar
          comments={asset.comments as Comment[]}
          workspaceId={asset.workspaceId}
          projectId={asset.projectId}
          assetId={asset.id}
          assetName={asset.name}
        />
      </div>
    </div>
  );
}
