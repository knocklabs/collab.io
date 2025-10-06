"use client";

import { useEffect, useState } from "react";
import { useGuide } from "@knocklabs/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

export function AnnouncementCard() {
  const { step } = useGuide({ type: "announcement-card" });
  const router = useRouter();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (step) step.markAsSeen();
  }, [step]);

  // If no step available, return null
  if (!step) return null;

  // If dismissed, return null
  if (isDismissed) return null;

  // Use Knock guide content
  const content = step.content;

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    step.markAsArchived();
  };

  return (
    <Card
      className="bg-white border border-[#dfe2e5] mx-4 mb-4 cursor-pointer rounded-lg relative"
      onClick={() => step.markAsInteracted()}
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
              // eslint-disable-next-line @next/next/no-img-element
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
                <p className="mb-0">{content.body}</p>
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
