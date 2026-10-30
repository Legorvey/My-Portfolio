import { Code, Share2, Zap } from "lucide-react";
import { WorkflowBuilderCard } from "@/components/ui/workflow-builder-card";

export default function WorkflowBuilderCardDemo() {
  const cardData = {
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    status: "Active" as const,
    lastUpdated: "5 days ago",
    title: "Personal Email Assistant",
    description:
      "Your AI helper for reading, organizing, and responding to emails.",
    tags: ["Personal", "Marketing"],
    users: [
      {
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        fallback: "U1",
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        fallback: "U2",
      },
      {
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        fallback: "U3",
      },
      {
        src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        fallback: "+3",
      },
    ],
    actions: [
      { Icon: Zap, bgColor: "bg-blue-500" },
      { Icon: Code, bgColor: "bg-gray-700" },
      { Icon: Share2, bgColor: "bg-red-500" },
    ],
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <WorkflowBuilderCard {...cardData} className="max-w-sm" />
    </div>
  );
}
