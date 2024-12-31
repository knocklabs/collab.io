"use client";

import { useState } from "react";
import { AssetCard } from "./asset-card";
import { AddAssetModal } from "./add-asset-modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams, useRouter } from "next/navigation";
import { ProjectSettings } from "./ProjectSettings/project-settings";

interface Asset {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  commentCount: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
}

interface ProjectDetailsProps {
  assets: Asset[];
  workspaceId: string;
  currentProject: Project;
}

export function ProjectDetails({
  assets: initialAssets,
  currentProject,
}: ProjectDetailsProps) {
  const router = useRouter();
  const params = useParams();
  const [assets, setAssets] = useState<Asset[]>(initialAssets);

  const handleAssetSelect = (id: string) => {
    router.push(
      `/dashboard/workspace/${params.workspaceId}/project/${params.projectId}/asset/${id}`
    );
  };

  const handleAddAsset = (newAsset: Omit<Asset, "id" | "commentCount">) => {
    const asset: Asset = {
      ...newAsset,
      id: String(assets.length + 1),
      commentCount: 0,
    };
    setAssets([...assets, asset]);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4 p-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{currentProject.name}</h2>
          <ProjectSettings projectId={currentProject.id} />
        </div>
        <AddAssetModal onAddAsset={handleAddAsset} />
      </div>
      <div className="px-4">
        <p className="text-muted-foreground">{currentProject.description}</p>
      </div>
      <ScrollArea className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 gap-6 p-4 my-6">
          {assets.map((asset) => (
            <AssetCard
              key={asset.id}
              id={asset.id}
              name={asset.name}
              imageUrl={asset.imageUrl}
              commentCount={asset.commentCount}
              onSelect={handleAssetSelect}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
