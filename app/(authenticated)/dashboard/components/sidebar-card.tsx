/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import { useGuide } from "@knocklabs/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function SidebarCard() {
  const { step } = useGuide({ type: "sidebar-card" });
  const router = useRouter();

  useEffect(() => {
    if (step) step.markAsSeen();
  }, [step]);

  if (!step) return null;

  return (
    <Card
      className="max-w-[400px] m-5 relative cursor-pointer"
      onClick={() => step.markAsInteracted()}
    >
      <img
        src={step.content.image.url}
        alt={step.content.image.alt}
        className="w-full h-48 object-cover rounded-t-xl block aspect-[3/4]"
      />
      <CardContent>
        <CardTitle className="text-md font-semibold mt-4">
          {step.content.title}
        </CardTitle>
        <CardDescription className="mt-2 mb-0 text-sm leading-5 text-gray-700">
          {step.content.body}
        </CardDescription>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            router.push(step.content.cta_button.action);
          }}
          className="w-full mt-4"
        >
          {step.content.cta_button.text}
        </Button>
      </CardContent>
    </Card>
  );
}
