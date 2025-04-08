"use client";

import { useEffect } from "react";
import { useGuide } from "@knocklabs/react";

export function AnnouncementCard() {
  const { step } = useGuide({ type: "announcement-card" });

  useEffect(() => {
    if (step) step.markAsSeen();
  }, [step]);

  if (!step) return null;

  return (
    <div
      onClick={() => step.markAsInteracted()}
      className="bg-white border border-gray-200 rounded-lg shadow max-w-[400px] m-5 relative"
    >
      <img
        src={step.content.image.url}
        alt={step.content.image.alt}
        className="w-full rounded-t-lg block"
      />
      <button className="absolute top-2 right-2 p-2 bg-transparent border-none cursor-pointer rounded hover:bg-black/5 flex items-center justify-center">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="p-4">
        <h2 className="m-0 text-[1.1rem] font-semibold text-gray-900">
          {step.content.title}
        </h2>
        <p className="mt-2 mb-0 text-sm leading-6 text-gray-500">
          {step.content.body}
        </p>
      </div>
    </div>
  );
}
