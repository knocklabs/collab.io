// app/login/page.tsx
import LoginForm from "./LoginForm";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function getSession() {
  const session = await auth();
  console.log(session);
  if (session?.user) {
    redirect("/dashboard");
  }
}

export default async function LoginPage() {
  await getSession();
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
