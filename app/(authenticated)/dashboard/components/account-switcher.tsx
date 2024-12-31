"use client";

import * as React from "react";
import { ChevronDown, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AccountSettings } from "./account-settings";

interface AccountSwitcherProps {
  className?: string;
  workspaceSeats: {
    id: string;
    workspace: {
      id: string;
      name: string;
      url: string;
    };
  }[];
  currentWorkspace?: {
    id: string;
    name: string;
    url: string;
  };
}

export function AccountSwitcher({
  className,
  workspaceSeats,
  currentWorkspace,
}: AccountSwitcherProps) {
  const [showSettings, setShowSettings] = React.useState(false);

  // Default to first workspace if no current workspace
  const selectedWorkspace = currentWorkspace || workspaceSeats[0]?.workspace;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn("w-full justify-start gap-2 px-2", className)}
          >
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={selectedWorkspace?.url}
                alt={selectedWorkspace?.name}
              />
              <AvatarFallback>
                {selectedWorkspace?.name.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <span className="flex-1 text-left">{selectedWorkspace?.name}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuLabel>Switch workspace</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {workspaceSeats.map((seat) => (
            <DropdownMenuItem key={seat.workspace.id} asChild>
              <a href={`/dashboard/workspace/${seat.workspace.id}`}>
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={seat.workspace.url}
                    alt={seat.workspace.name}
                  />
                  <AvatarFallback>
                    {seat.workspace.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">
                    {seat.workspace.name}
                  </p>
                </div>
              </a>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setShowSettings(true)}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Workspace settings</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AccountSettings
        open={showSettings}
        onOpenChange={setShowSettings}
        workspaceId={selectedWorkspace?.id || ""}
      />
    </>
  );
}
