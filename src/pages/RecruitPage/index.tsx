import { useEffect, useState, useMemo } from "react";
import { DndContext, closestCenter, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanSection, Card, SortableItem } from "@/components";
import { getFromLocalStorage, saveToLocalStorage, applyDragResult } from "@/util";
import { User, RECRUIT_STAGES, RecruitStatus } from "@/types";

const USERS_KEY = "users";

const RecruitPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = getFromLocalStorage<User[]>(USERS_KEY);
    if (Array.isArray(storedUsers)) {
      setUsers(storedUsers);
    }
  }, []);

  const usersByStatus = useMemo(() => {
    const map = new Map<RecruitStatus, User[]>();

    users.forEach((u) => {
      if (!map.has(u.status)) map.set(u.status, []);
      map.get(u.status)!.push(u);
    });

    map.forEach((list) => list.sort((a, b) => a.order - b.order));

    return map;
  }, [users]);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;

    setUsers((prev) => {
      const next = applyDragResult({
        users: prev,
        activeId: active.id.toString(),
        overId: over.id.toString(),
      });

      saveToLocalStorage(USERS_KEY, next);
      return next;
    });
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    setUsers((prev) =>
      applyDragResult({
        users: prev,
        activeId: active.id.toString(),
        overId: over.id.toString(),
      }),
    );
  };

  return (
    <div className="min-h-screen flex flex-col px-6">
      <h1 className="text-2xl font-bold mb-4 pt-6">Frontend 채용</h1>
      <DndContext collisionDetection={closestCenter} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-stretch">
          {RECRUIT_STAGES.map((stage) => {
            const stageUsers = usersByStatus.get(stage) ?? [];

            return (
              <KanbanSection key={stage} title={stage} id={stage} count={stageUsers.length}>
                <SortableContext items={stageUsers.map((u) => u.userId)} strategy={verticalListSortingStrategy}>
                  {stageUsers.map((user) => (
                    <SortableItem key={user.id} id={user.userId}>
                      <Card title={user.name} subtitle={`경력 ${user.experience}년 · ${user.part}`} />
                    </SortableItem>
                  ))}
                </SortableContext>
              </KanbanSection>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
};

export default RecruitPage;
