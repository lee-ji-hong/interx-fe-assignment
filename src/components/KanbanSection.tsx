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
    <section ref={setNodeRef} className="w-72 min-w-[18rem] bg-gray-50 rounded-md p-3 shadow-sm">
      <header className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        {typeof count === "number" && <span className="text-xs text-gray-500">{count}</span>}
      </header>
      <div className="space-y-2">{children}</div>
    </section>
  );
};

export default KanbanSection;
