"use client";

import { ReactNode } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  KnockSlackProvider,
  KnockGuideProvider,
} from "@knocklabs/react";
import { KnockGuideLocationSensor } from "@knocklabs/react/next";

import "@knocklabs/react/dist/index.css";

interface NotificationProviderProps {
  children: ReactNode;
  userToken?: string;
  userId: string;
  workspaceId: string;
}

export function KnockNotificationProviders({
  children,
  userId,
  userToken,
  workspaceId,
}: NotificationProviderProps) {
  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY || ""}
      userId={userId}
      userToken={userToken}
      logLevel={"debug"}
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
          <KnockGuideProvider
            channelId={process.env.NEXT_PUBLIC_KNOCK_GUIDE_CHANNEL_ID || ""}
            readyToTarget={true}
            listenForUpdates={true}
            trackLocationFromWindow={false}
          >
            {children}
            <KnockGuideLocationSensor.AppRouter />
          </KnockGuideProvider>
        </KnockSlackProvider>
      </KnockFeedProvider>
    </KnockProvider>
  );
}
