"use client";

import { useEffect } from "react";
import { useGuide } from "@knocklabs/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function SidebarCard() {
  const { step } = useGuide({ type: "sidebar-card" });
  const router = useRouter();

  useEffect(() => {
    if (step) step.markAsSeen();
  }, [step]);

  if (!step) return null;

  return (
    <div
      onClick={() => step.markAsInteracted()}
      className="bg-white border border-gray-200 rounded-lg shadow max-w-[400px] m-5 relative"
    >
      <Image
        src={step.content.image.url}
        alt={step.content.image.alt}
        width={400}
        height={533}
        className="w-full h-48 object-cover rounded-t-lg block aspect-[3/4]"
      />
      <div className="p-4">
        <h2 className="m-0 text-md font-medium text-gray-900">
          {step.content.title}
        </h2>
        <p className="mt-2 mb-0 text-sm leading-5 text-gray-700">
          {step.content.body}
        </p>
        <button
          onClick={() => router.push(step.content.cta_button.action)}
          className="block w-full bg-black text-white font-medium text-sm px-4 py-2 rounded-md mt-4 border-none cursor-pointer"
        >
          {step.content.cta_button.text}
        </button>
      </div>
    </div>
  );
}
