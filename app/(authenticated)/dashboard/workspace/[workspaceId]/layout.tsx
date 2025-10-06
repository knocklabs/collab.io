import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
} from "@/components/ui/sidebar";

import { AccountSwitcherWrapper } from "@/app/(authenticated)/dashboard/components/account-switcher-wrapper";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { KnockNotificationProviders } from "../../providers/knock-notification-providers";
import { auth } from "@/auth";
import { signUserToken } from "@/lib/knock";
import { UserProfile } from "../../components/user-profile";
import { AnnouncementCard } from "../../components/announcement-card";
import { Modal, Card } from "@knocklabs/react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string; projectId: string }>;
}) {
  const session = await auth();

  const awaitedParams = await params;

  const workspaceId = awaitedParams.workspaceId;
  const currentWorkspace =
    (await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
      select: {
        id: true,
        name: true,
        url: true,
      },
    })) || undefined;

  // Fetch projects directly using Prisma
  const projects = await prisma.project.findMany({
    where: {
      workspaceId: workspaceId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  const userToken = await signUserToken(
    session?.user?.id || "",
    workspaceId,
    projects.map((project) => project.id)
  );

  return (
    <KnockNotificationProviders
      userId={session?.user?.id || ""}
      userToken={userToken || ""}
      workspaceId={workspaceId}
    >
      <SidebarProvider
        style={
          {
            "--sidebar-width": "22rem", // 352px (between w-80 and w-96)
          } as React.CSSProperties
        }
      >
        {/* Left Sidebar */}
        <Sidebar collapsible="offcanvas">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/dashboard"
                    className="text-xl font-semibold text-primary"
                  >
                    Collab.io
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <AccountSwitcherWrapper currentWorkspace={currentWorkspace} />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>My projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {projects.length === 0 ? (
                    <SidebarMenuItem>No projects found</SidebarMenuItem>
                  ) : (
                    projects.map((project) => (
                      <SidebarMenuItem key={project.id}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={`/dashboard/workspace/${workspaceId}/project/${project.id}`}
                          >
                            {project.name}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <Card />
              <AnnouncementCard />
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="h-14 border-b px-4 flex items-center justify-between w-full flex-shrink-0">
            <div className="flex items-center space-x-4"></div>
            <div className="flex items-center space-x-4">
              {/* <ProjectBanner /> */}
              <UserProfile currentUser={session?.user} />
            </div>
          </header>

          {/* Main Content Container */}
          {children}
        </SidebarInset>
      </SidebarProvider>
      {/* Modal component renders guide modals when users are eligible */}
      <Modal />
    </KnockNotificationProviders>
  );
}

export const dynamic = "force-dynamic";
