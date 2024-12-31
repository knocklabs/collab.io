import { PrismaClient } from "@prisma/client";
import { Knock } from "@knocklabs/node";

const prisma = new PrismaClient();
const knock = new Knock(process.env.KNOCK_SECRET_API_KEY);

async function main() {
  console.log("🧹 Starting database cleanup...");

  // First clean up Knock resources
  console.log("\nCleaning up Knock resources...");

  // Helper function for delay
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Get all projects to clean up objects
  const projects = await prisma.project.findMany();
  console.log("Deleting Knock objects from database projects...");
  for (const project of projects) {
    try {
      await knock.objects.delete("projects", project.id);
      await delay(500);
    } catch (e) {
      console.log(
        `Failed to delete Knock object for project ${project.id}:`,
        e
      );
    }
  }

  // Additional cleanup: fetch and delete any remaining project objects from Knock
  console.log("Checking for remaining Knock project objects...");
  try {
    const knockProjects = await knock.objects.list("projects");
    console.log(
      `Found ${knockProjects.entries.length} remaining project objects in Knock`
    );

    for (const project of knockProjects.entries) {
      try {
        await knock.objects.delete("projects", project.id);
        await delay(500);
        console.log(`Deleted orphaned Knock project: ${project.id}`);
      } catch (e) {
        console.log(
          `Failed to delete orphaned Knock project ${project.id}:`,
          e
        );
      }
    }
  } catch (e) {
    console.log("Failed to fetch/cleanup remaining Knock projects:", e);
  }

  // Get all workspaces to clean up tenants
  const workspaces = await prisma.workspace.findMany();
  console.log("Deleting Knock tenants...");
  for (const workspace of workspaces) {
    try {
      await knock.tenants.delete(workspace.id);
      await delay(500); // Add 500ms delay between calls
    } catch (e) {
      console.log(
        `Failed to delete Knock tenant for workspace ${workspace.id}:`,
        e
      );
    }
  }

  // Get all users to clean up
  const users = await prisma.user.findMany();
  console.log("Deleting Knock users...");
  for (const user of users) {
    try {
      await knock.users.delete(user.id);
      await delay(500); // Add 500ms delay between calls
    } catch (e) {
      console.log(`Failed to delete Knock user ${user.id}:`, e);
    }
  }

  // Delete database records in reverse order of dependencies
  console.log("\nDeleting comments...");
  await prisma.comment.deleteMany();

  console.log("Deleting assets...");
  await prisma.asset.deleteMany();

  console.log("Deleting projects...");
  await prisma.project.deleteMany();

  console.log("Deleting workspace seats...");
  await prisma.workspace_seat.deleteMany();

  console.log("Deleting workspaces...");
  await prisma.workspace.deleteMany();

  console.log("Deleting sessions...");
  await prisma.session.deleteMany();

  console.log("Deleting accounts...");
  await prisma.account.deleteMany();

  console.log("Deleting verification tokens...");
  await prisma.verificationToken.deleteMany();

  console.log("Deleting users...");
  await prisma.user.deleteMany();

  console.log("\n✨ Database cleanup completed successfully!");
}

main()
  .catch((e) => {
    console.error("\n❌ Database cleanup failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Disconnected from database");
  });
