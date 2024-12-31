"use client";

import { useState, useOptimistic, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createNewComment } from "@/app/actions/create-new-comment";

interface Comment {
  id: string;
  author: {
    name: string | null;
    image: string | null;
  };
  text: string;
}

interface CommentsSidebarProps {
  comments?: Comment[];
  workspaceId: string;
  projectId: string;
  assetId: string;
  assetName: string;
}

export function CommentsSidebar({
  comments = [],
  workspaceId,
  projectId,
  assetId,
  assetName,
}: CommentsSidebarProps) {
  const [newComment, setNewComment] = useState("");
  const [optimisticComments, addOptimisticComment] = useOptimistic<
    Comment[],
    Comment
  >(comments, (state, newComment) => [...state, newComment]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      startTransition(() => {
        addOptimisticComment({
          id: Math.random().toString(),
          text: newComment,
          author: {
            name: "You",
            image: null,
          },
        });
      });

      const commentText = newComment;
      setNewComment("");

      try {
        console.log("Creating comment with:", {
          text: commentText,
          workspaceId,
          projectId,
          assetId,
          assetName,
        });

        await createNewComment({
          text: commentText,
          workspaceId,
          projectId,
          assetId,
          assetName,
        });
      } catch (error) {
        console.error("Failed to create comment:", error);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 pb-0">
        <h2 className="font-medium mb-4">Comments</h2>
      </div>
      <ScrollArea className="flex-1 p-4 pt-0">
        {optimisticComments.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>No comments yet</p>
          </div>
        ) : (
          optimisticComments.map((comment) => (
            <div key={comment.id} className="mb-4 mr-2 last:mb-0">
              <div className="flex items-start space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={comment.author.image || undefined}
                    alt={comment.author.name || undefined}
                  />
                  <AvatarFallback>
                    {comment.author.name?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{comment.author.name}</p>
                  <p className="text-sm text-gray-600">{comment.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </ScrollArea>
      <div className="border-t p-4 bg-white">
        <div className="flex flex-col space-y-2">
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
          />
          <Button onClick={handleAddComment}>Send</Button>
        </div>
      </div>
    </div>
  );
}
