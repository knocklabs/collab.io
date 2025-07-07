"use client";

import { useEffect } from "react";
import { Modal, useGuide } from "@knocklabs/react";
import { createPortal } from "react-dom";

export function ModalWrapper() {
  const { step } = useGuide({ type: "modal" });

  useEffect(() => {
    console.log("ModalWrapper mounted");
    console.log("Guide step:", step);
  }, [step]);

  if (step) {
    console.log("Modal step found:", step);
    console.log("Step content:", step.content);
  }

  // Use a portal to render the modal at the document level
  if (typeof document !== "undefined") {
    return createPortal(<Modal />, document.body);
  }

  return null;
}
