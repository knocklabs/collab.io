"use client";

import { useEffect } from "react";
import { useGuide } from "@knocklabs/react";
import { useRouter } from "next/navigation";
import { ArrowUpCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function ProjectBanner() {
  const { step } = useGuide({ type: "project-banner" });
  const router = useRouter();

  useEffect(() => {
    if (step) step.markAsSeen();
  }, [step]);

  if (!step) return null;

  return (
    <Alert
      className="bg-white border border-gray-200 rounded-lg w-full max-w-5xl mx-auto flex items-center relative cursor-pointer h-10 min-h-10"
      onClick={() => {
        step.markAsInteracted();
        if (step.content.url) {
          router.push(step.content.url);
        }
      }}
    >
      <div className="flex-1 flex flex-row items-center gap-2 h-full">
        <ArrowUpCircle className="w-4 h-4 text-blue-500 mr-0" />
        <AlertTitle className="m-0 text-sm font-semibold text-gray-900">
          {step.content.title}
        </AlertTitle>
        <AlertDescription className="mt-0 mb-0 text-sm text-gray-900">
          {step.content.body}
        </AlertDescription>
      </div>
    </Alert>
  );
}
