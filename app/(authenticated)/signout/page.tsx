// app/signout/page.tsx
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignOutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h5 className="text-lg font-medium mb-4">
        Are you sure you want to sign out?
      </h5>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <div className="flex gap-4">
          <Button type="submit" variant="destructive">
            Sign out
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
