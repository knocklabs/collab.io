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
      className="w-full max-w-[300px] aspect-[3/2] mb-2 cursor-pointer hover:ring-2 hover:ring-primary flex flex-col justify-between"
      onClick={() => onSelect(id)}
    >
      <CardHeader className="pb-2 px-3">
        <CardTitle className="text-base line-clamp-2 min-h-[2.5rem]">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 px-3">
        <div className="relative w-full aspect-[3/2] mb-2">
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover rounded-md"
          />
        </div>
      </CardContent>
      <div className="px-3 pb-3 flex items-center">
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
