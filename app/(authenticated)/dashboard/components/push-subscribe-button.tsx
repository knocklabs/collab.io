"use client";
import { getToken } from "firebase/messaging";
import { useKnockClient } from "@knocklabs/react";
import { useContext, useState } from "react";
import { FirebaseContext } from "../providers/firebase-provider";

import { DeviceTypes, isPWA, useDevice } from "../../../utils/use-device";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const PushSubscribeButton: React.FC = () => {
  const firebaseContext = useContext(FirebaseContext);
  const device = useDevice();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const knock = useKnockClient();

  const handleTokenSubmit = async () => {
    try {
      if (device === DeviceTypes.IOS && !isPWA())
        throw new Error(
          'In IPhone you must install the app first, by clicking on Share button in browser and selecting "Add to Home Screen"'
        );

      if (
        !firebaseContext?.messaging ||
        !firebaseContext?.serviceWorkerRegistration
      ) {
        throw new Error("Firebase not initialized. Please wait and try again.");
      }

      setIsLoading(true);

      // Request notification permission
      if (Notification.permission !== "granted") {
        const result = await Notification.requestPermission();
        if (result !== "granted")
          throw new Error("Notifications are not allowed.");
      }

      // Get Firebase token using the registration from context
      const firebaseToken = await getToken(firebaseContext.messaging, {
        vapidKey:
          "BDBOG_hkI8rPZNBbeto6Mt8UBS4w4PljTuvHSo9nfT-4JyPBnZYaJ_zSspBRq84cSOpHfmzKLZb1exkOgviE3A4",
        serviceWorkerRegistration: firebaseContext.serviceWorkerRegistration,
      });

      // Set up Knock channel data
      const channelData = await knock.user.setChannelData({
        channelId: "9db0f584-9ab7-45e8-8bd3-4135ba4d6883",
        channelData: { tokens: [firebaseToken] },
      });
      console.log("Knock channel data set:", channelData);

      toast({
        title: "Success!",
        description: "Subscription successful!",
      });

      setIsLoading(false);
    } catch (err: any) {
      console.error("Subscription error:", err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleTokenSubmit}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        Subscribe to Notifications
      </Button>
    </div>
  );
};
