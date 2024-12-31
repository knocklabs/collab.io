/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface AssetCardProps {
  id: string;
  name: string;
  imageUrl: string;
  commentCount: number;
  onSelect: (id: string) => void;
}

export function AssetCard({
  id,
  name,
  imageUrl,
  commentCount,
  onSelect,
}: AssetCardProps) {
  return (
    <Card
      className="w-full mb-4 cursor-pointer hover:ring-2 hover:ring-primary"
      onClick={() => onSelect(id)}
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full pb-[56.25%] mb-4">
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover rounded-md"
          />
        </div>
      </CardContent>
      <div className="px-6 pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          {commentCount}
        </Button>
      </div>
    </Card>
  );
}
