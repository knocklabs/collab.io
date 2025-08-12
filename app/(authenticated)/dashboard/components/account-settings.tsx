"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SlackAuthButton, SlackAuthContainer } from "@knocklabs/react";

interface AccountSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: string;
}

export function AccountSettings({ open, onOpenChange }: AccountSettingsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Account Settings</DialogTitle>
          <DialogDescription>
            Manage your account settings and set your preferences for this
            workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Notification settings</h3>
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
        </div>
        <div className="space-y-6 my-6">
          <div>
            <h3 className="text-lg font-medium">Slack Integration</h3>
            <p className="text-sm text-muted-foreground">
              Connect your Slack workspace to receive notifications directly in
              your Slack channels.
            </p>
          </div>

          <SlackAuthContainer
            actionButton={
              <SlackAuthButton
                slackClientId={process.env.NEXT_PUBLIC_SLACK_CLIENT_ID || ""}
                redirectUrl="http://localhost:3000"
                additionalScopes={["users:read", "users:read.email"]}
              ></SlackAuthButton>
            }
          />
        </div>
        <Button type="submit">Save changes</Button>
      </DialogContent>
    </Dialog>
  );
}
