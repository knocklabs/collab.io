"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SlackChannelCombobox } from "@knocklabs/react";
import { EllipsisVertical } from "lucide-react";

import "./styles.css";

interface ProjectSettingsProps {
  projectId: string;
}

export function ProjectSettings({ projectId }: ProjectSettingsProps) {
  const [open, setOpen] = useState(false);
  console.log(projectId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <EllipsisVertical></EllipsisVertical>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Project Settings</DialogTitle>
          <DialogDescription>
            Manage your project settings and set your preferences for this
            project.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mb-24">
          <div>
            <h3 className="text-lg font-medium">Slack Integration</h3>
            <p className="text-sm text-muted-foreground">
              Connect your Slack workspace to receive notifications directly in
              your Slack channels.
            </p>
          </div>

          <SlackChannelCombobox
            slackChannelsRecipientObject={{
              objectId: projectId,
              collection: "projects",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
