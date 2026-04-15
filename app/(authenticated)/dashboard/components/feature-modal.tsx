"use client";

import { useEffect, useCallback, useState } from "react";
import { useGuide } from "@knocklabs/react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export function FeatureModal() {
  const { step } = useGuide({ type: "feature-modal" });
  const router = useRouter();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (step) {
      setDismissed(false);
      step.markAsSeen();
    }
  }, [step]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    if (step) step.markAsArchived();
  }, [step]);

  useEffect(() => {
    if (!step || dismissed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [step, dismissed, handleDismiss]);

  if (!step || dismissed) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleDismiss}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="relative bg-white border border-[#dfe2e5] rounded-lg font-[Inter,sans-serif] flex flex-col w-[480px] max-w-[90vw] max-h-[90vh] overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          onClick={handleDismiss}
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {step.content.image?.url && (
          <div className="bg-[#efece7] h-[200px] w-full relative overflow-hidden rounded-t-lg flex-shrink-0">
            <img
              src={step.content.image.url}
              alt={step.content.image?.alt}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        <div className="py-4 px-5">
          <h3 className="text-lg font-medium leading-7 text-[#1c2024] mb-2">
            {step.content.title}
          </h3>
          <div
            className="text-sm font-normal leading-5 text-[#60646a] tracking-[0.0275px] [&_p]:m-0 [&_ul]:mt-2 [&_ul]:mb-0 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:mt-2 [&_ol]:mb-0 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: step.content.body }}
          />
        </div>

        <div className="flex gap-3 items-center justify-end px-5 pb-4">
          <button
            className="flex-1 h-9 px-3 rounded text-[13px] font-medium leading-5 cursor-pointer border-none flex items-center justify-center bg-[#1d2023] text-[#fcfcfd] hover:bg-[#2c3034] transition-colors"
            onClick={() => {
              step.markAsInteracted();
              if (step.content.primary_button?.action) {
                router.push(step.content.primary_button.action);
              }
            }}
          >
            {step.content.primary_button?.text}
          </button>
          <button
            className="flex-1 h-9 px-3 rounded text-[13px] font-medium leading-5 cursor-pointer flex items-center justify-center bg-white text-[#1d2023] border border-[#d7dadf] hover:bg-[#f9fafb] transition-colors"
            onClick={() => {
              step.markAsInteracted();
              if (step.content.secondary_button?.action) {
                router.push(step.content.secondary_button.action);
              }
            }}
          >
            {step.content.secondary_button?.text}
          </button>
        </div>
      </div>
    </div>
  );
}
