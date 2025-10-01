"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useKnockClient } from "@knocklabs/react";

export const PushUnsubscribeButton: React.FC = () => {
  const { toast } = useToast();
  const knock = useKnockClient();

  const handleUnsubscribe = async () => {
    try {
      const channelData = await knock.user.setChannelData({
        channelId: "9db0f584-9ab7-45e8-8bd3-4135ba4d6883",
        channelData: { tokens: [] },
      });
      console.log(channelData);
      toast({
        title: "Success!",
        description: "Operation successful!",
      });
    } catch (err: any) {
      console.error(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  return <Button onClick={handleUnsubscribe}>Unsubscribe</Button>;
};
