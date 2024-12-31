"use client";

import { ReactNode } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  KnockSlackProvider,
  KnockInAppMessagesChannelProvider,
} from "@knocklabs/react";

interface NotificationProviderProps {
  children: ReactNode;
  userToken?: string;
  userId: string;
  workspaceId: string;
}

export function NotificationProvider({
  children,
  userId,
  userToken,
  workspaceId,
}: NotificationProviderProps) {
  console.log(userId);
  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY || ""}
      userId={userId}
      userToken={userToken}
    >
      <KnockFeedProvider
        feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID || ""}
        defaultFeedOptions={{ tenant: workspaceId }}
      >
        <KnockSlackProvider
          knockSlackChannelId={
            process.env.NEXT_PUBLIC_KNOCK_SLACK_CHANNEL_ID || ""
          }
          tenant={workspaceId}
        >
          <KnockInAppMessagesChannelProvider
            channelId={process.env.NEXT_PUBLIC_KNOCK_IN_APP_CHANNEL_ID || ""}
          >
            {children}
          </KnockInAppMessagesChannelProvider>
        </KnockSlackProvider>
      </KnockFeedProvider>
    </KnockProvider>
  );
}
