"use client";

import { Banner, Card, Modal } from "@knocklabs/react";
import { AlertModal } from "./AlertModal/alert-modal";

export default function InAppWrapper() {
  return (
    <>
      <Card></Card>
      <Banner></Banner>
      <Modal></Modal>
      <AlertModal></AlertModal>
    </>
  );
}
