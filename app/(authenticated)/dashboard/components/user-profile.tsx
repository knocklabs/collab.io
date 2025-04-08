"use client";

import { UserNav } from "./user-nav";
import {
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { useRef, useState } from "react";
import "@knocklabs/react/dist/index.css";

type UserProfileProps = {
  currentUser?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export function UserProfile({ currentUser }: UserProfileProps) {
  const notifButtonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <>
        <NotificationIconButton
          ref={notifButtonRef}
          onClick={() => setIsVisible(!isVisible)}
        />
        <NotificationFeedPopover
          buttonRef={notifButtonRef}
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
        />
      </>
      <UserNav currentUser={currentUser} />
    </>
  );
}
