"use client";

import { UserNav } from "./user-nav";

type UserProfileProps = {
  currentUser?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export function UserProfile({ currentUser }: UserProfileProps) {
  return (
    <>
      <UserNav currentUser={currentUser} />
    </>
  );
}
