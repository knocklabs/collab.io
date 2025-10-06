"use client";

import { useEffect, useState } from "react";
import { useGuide } from "@knocklabs/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

// Set this to false to preview without Knock guides
const USE_KNOCK_GUIDES = false;

export function AnnouncementCard() {
  const { step } = useGuide({ type: "announcement-card" });
  const router = useRouter();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (step) step.markAsSeen();
  }, [step]);

  // If using Knock guides and no step, return null
  if (USE_KNOCK_GUIDES && !step) return null;

  // If dismissed, return null
  if (isDismissed) return null;

  // Static preview content
  const previewContent = {
    title: "Introducing Collab.io 4.0",
    body: "A whole new way to collaborate with your team. Get early access today.",
    image: {
      url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=240&fit=crop&crop=center",
      alt: "Team collaboration",
    },
    primary_button: {
      text: "Try it now",
      action: "/dashboard",
    },
    secondary_button: {
      text: "Learn more",
      action: "/dashboard",
    },
  };

  // Use Knock guide content if enabled, otherwise use preview content
  const content = USE_KNOCK_GUIDES && step ? step.content : previewContent;

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  return (
    <Card
      className="bg-white border border-[#dfe2e5] mx-4 mb-4 cursor-pointer rounded-lg relative"
      onClick={() => USE_KNOCK_GUIDES && step?.markAsInteracted()}
    >
      <CardContent className="p-0">
        <div className="flex flex-col">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 z-10 p-1 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
            aria-label="Dismiss announcement"
          >
            <X size={16} />
          </button>

          {/* Image section */}
          <div className="bg-[#efece7] h-60 w-full relative overflow-hidden rounded-t-lg">
            {content.image?.url && (
              <img
                src={content.image.url}
                alt={content.image.alt || "Announcement"}
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>

          {/* Content section */}
          <div className="px-4 py-3">
            <div className="space-y-2">
              <h3 className="text-base font-medium text-[#1c2024] leading-6">
                {content.title}
              </h3>
              <div className="text-xs font-normal text-[#60646a] leading-4 tracking-[0.0275px]">
                <p className="mb-0">{content.body.split(".")[0]}.</p>
                <p>{content.body.split(".")[1]?.trim()}</p>
              </div>
            </div>
          </div>

          {/* Button group */}
          <div className="flex gap-3 items-center justify-end px-3 pb-3">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                router.push(content.primary_button.action);
              }}
              className="flex-1 bg-[#1d2023] hover:bg-[#2c3034] text-[#fcfcfd] h-8 px-2 rounded text-xs font-medium leading-5"
            >
              {content.primary_button.text}
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                router.push(content.secondary_button.action);
              }}
              variant="outline"
              className="flex-1 border border-[#d7dadf] bg-white hover:bg-gray-50 text-[#1d2023] h-8 px-2 rounded text-xs font-medium leading-5"
            >
              {content.secondary_button.text}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
