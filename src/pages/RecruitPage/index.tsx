import { useEffect, useState } from "react";
import { DndContext, closestCenter, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanSection, Card, SortableItem } from "@/components";
import { getFromLocalStorage, saveToLocalStorage, applyDragResult } from "@/util";
import type { User, RecruitStatus } from "@/types/user";

const sections: RecruitStatus[] = [
  "지원",
  "스크린콜",
  "코딩테스트",
  "1차 인터뷰",
  "2차 인터뷰",
  "최종 협의",
  "입사 확정",
];
const USERS_KEY = "users";

const RecruitPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = getFromLocalStorage<User[]>(USERS_KEY);
    if (Array.isArray(storedUsers)) {
      setUsers(storedUsers);
    }
  }, []);

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
          {sections.map((section) => {
            const sectionUsers = users.filter((u) => u.status === section).sort((a, b) => a.order - b.order);

            return (
              <KanbanSection key={section} title={section} id={section} count={sectionUsers.length}>
                <SortableContext items={sectionUsers.map((u) => u.userId)} strategy={verticalListSortingStrategy}>
                  {sectionUsers.map((user) => (
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
