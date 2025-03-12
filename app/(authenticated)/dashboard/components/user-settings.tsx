"use client";

import { createWeeklyActivityUpdates } from "@/app/actions/create-weekly-activity-updates";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormStatus } from "react-dom";

interface UserSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserSettings({ open, onOpenChange }: UserSettingsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>User Settings</DialogTitle>
          <DialogDescription>
            Manage your account settings and set your preferences across
            workspaces.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">User notification settings</h3>
            <p className="text-sm text-muted-foreground">
              Update your global notification settings.
            </p>
          </div>

          <div className="border rounded-lg">
            <div className="grid grid-cols-[1fr,100px,100px,100px] gap-4 p-4 border-b">
              <div>Notification type</div>
              <div className="text-center">In-app</div>
              <div className="text-center">Email</div>
              <div className="text-center">Slack</div>
            </div>

            <div className="divide-y">
              <div className="grid grid-cols-[1fr,100px,100px,100px] gap-4 p-4">
                <div>
                  <div className="font-medium">Comments & mentions</div>
                  <div className="text-sm text-muted-foreground">
                    New comments and replies to threads.
                  </div>
                </div>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300"
                    defaultChecked
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300"
                    defaultChecked
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300"
                    defaultChecked
                  />
                </div>
              </div>

              <div className="grid grid-cols-[1fr,100px,100px,100px] gap-4 p-4">
                <div>
                  <div className="font-medium">Project updates</div>
                  <div className="text-sm text-muted-foreground">
                    New activity on projects you&apos;re subscribed to.
                  </div>
                </div>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300"
                    defaultChecked
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300"
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300"
                    defaultChecked
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Weekly Updates</div>
                <div className="text-sm text-muted-foreground">
                  Receive a weekly digest of your workspace activities and
                  updates.
                </div>
              </div>
              <form
                action={async () => {
                  await createWeeklyActivityUpdates();
                }}
              >
                <SubmitButton />
              </form>
            </div>
          </div>
        </div>
        <Button type="submit">Save changes</Button>
      </DialogContent>
    </Dialog>
  );
}
// Create a submit button component to access form status
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="secondary" disabled={pending}>
      {pending ? "Scheduling..." : "Get Weekly Updates"}
    </Button>
  );
}
