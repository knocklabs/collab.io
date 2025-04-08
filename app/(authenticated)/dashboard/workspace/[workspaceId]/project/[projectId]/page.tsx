import { prisma } from "@/lib/prisma";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProjectDetails } from "@/app/(authenticated)/dashboard/components/project-details";

interface PageProps {
  params: Promise<{
    projectId: string;
    workspaceId: string;
  }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { workspaceId, projectId: currentProjectId } = await params;

  const currentProject = await prisma.project.findUnique({
    where: {
      id: currentProjectId,
      workspaceId: workspaceId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      workspaceId: true,
    },
  });

  const assets = await prisma.asset.findMany({
    where: {
      projectId: currentProjectId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      url: true,
      comments: {
        select: {
          id: true,
        },
      },
    },
  });

  const formattedAssets = assets.map((asset) => ({
    id: asset.id,
    name: asset.name,
    description: asset.description,
    imageUrl: asset.url,
    commentCount: asset.comments.length,
  }));

  return (
    <div className="w-full overflow-hidden">
      <Breadcrumb className="mt-4 ml-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/workspace/${workspaceId}`}>
              Workspace
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Project</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {currentProject && (
        <ProjectDetails
          assets={formattedAssets}
          workspaceId={workspaceId}
          currentProject={currentProject}
        />
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";
