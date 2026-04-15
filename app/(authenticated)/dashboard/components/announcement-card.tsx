"use client";

import { useEffect } from "react";
import { useGuide } from "@knocklabs/react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export function AnnouncementCard() {
  const { step } = useGuide({ type: "announcement-card" });
  const router = useRouter();

  useEffect(() => {
    if (step) step.markAsSeen();
  }, [step]);

  if (!step) return null;

  return (
    <div
      className="bg-white border border-[#dfe2e5] rounded-lg m-4 mb-4 cursor-pointer font-[Inter,sans-serif] flex flex-col max-w-[350px] relative"
      onClick={() => step.markAsInteracted()}
    >
      <button
        className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          step.markAsArchived();
        }}
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="bg-[#efece7] h-[160px] w-full relative overflow-hidden rounded-t-lg">
        <img
          src={step.content.image?.url}
          alt={step.content.image?.alt}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="py-3 px-4">
        <h3 className="text-base font-medium leading-6 text-[#1c2024] mb-2">
          {step.content.title}
        </h3>
        <div className="text-xs font-normal leading-4 text-[#60646a] tracking-[0.0275px]">
          <p className="m-0">{step.content.body}</p>
        </div>
      </div>

      <div className="flex gap-3 items-center justify-end px-3 pb-3">
        <button
          className="flex-1 h-8 px-2 rounded text-[13px] font-medium leading-5 cursor-pointer border-none flex items-center justify-center bg-[#1d2023] text-[#fcfcfd] hover:bg-[#2c3034]"
          onClick={(e) => {
            e.stopPropagation();
            if (step.content.primary_button?.action) {
              router.push(step.content.primary_button.action);
            }
          }}
        >
          {step.content.primary_button?.text}
        </button>
        <button
          className="flex-1 h-8 px-2 rounded text-[13px] font-medium leading-5 cursor-pointer flex items-center justify-center bg-white text-[#1d2023] border border-[#d7dadf] hover:bg-[#f9fafb]"
          onClick={(e) => {
            e.stopPropagation();
            if (step.content.secondary_button?.action) {
              router.push(step.content.secondary_button.action);
            }
          }}
        >
          {step.content.secondary_button?.text}
        </button>
      </div>
    </div>
  );
}
