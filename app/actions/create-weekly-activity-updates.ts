"use server";

import { auth } from "@/auth";
import { DaysOfWeek, Knock, RepeatFrequency } from "@knocklabs/node";

export async function createWeeklyActivityUpdates(): Promise<void> {
  const knock = new Knock(process.env.KNOCK_SECRET_API_KEY);
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    await knock.workflows.createSchedules("weekly-tour-updates", {
      recipients: [session?.user?.id],
      repeats: [
        {
          frequency: RepeatFrequency.Weekly,
          days: [DaysOfWeek.Fri],
          hours: 17,
          minutes: 30,
        },
      ],
    });
  } catch (error) {
    console.error("Failed to schedule weekly update:", error);
    throw error;
  }
}
