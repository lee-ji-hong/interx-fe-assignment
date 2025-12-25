import React from "react";
import { useDroppable } from "@dnd-kit/core";
import type { RecruitStatus } from "@/types/user";

type Props = {
  id: string;
  title: RecruitStatus;
  count?: number;
  children?: React.ReactNode;
};

const KanbanSection = ({ id, title, count, children }: Props) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <section
      ref={setNodeRef}
      className="w-72 min-w-[18rem] bg-gray-50 rounded-md p-3 shadow-sm flex flex-col max-h-[calc(100vh-7rem)]">
      <header className="flex items-center justify-between mb-3 shrink-0">
        <h3 className="text-sm font-semibold">{title}</h3>
        {typeof count === "number" && <span className="text-xs text-gray-500">{count}</span>}
      </header>
      <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1">{children}</div>
    </section>
  );
};

export default KanbanSection;
