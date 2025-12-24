import { useEffect, useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { KanbanSection, Card, SortableItem } from "@/components";
import { getFromLocalStorage, saveToLocalStorage } from "@/util/localStorage";
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const activeId = active.id;
    const overId = over.id;

    setUsers((prev) => {
      const activeUser = prev.find((u) => u.id === activeId);
      const overUser = prev.find((u) => u.id === overId);
      if (!activeUser || !overUser) return prev;

      if (activeUser.status === overUser.status) {
        const sameStatusUsers = prev.filter((u) => u.status === activeUser.status);

        const oldIndex = sameStatusUsers.findIndex((u) => u.id === activeId);
        const newIndex = sameStatusUsers.findIndex((u) => u.id === overId);

        const reordered = arrayMove(sameStatusUsers, oldIndex, newIndex).map((user, index) => ({
          ...user,
          order: index,
        }));

        const others = prev.filter((u) => u.status !== activeUser.status);

        const updated = [...others, ...reordered];
        saveToLocalStorage(USERS_KEY, updated);
        return updated;
      }

      const sourceUsers = prev
        .filter((u) => u.status === activeUser.status && u.id !== activeUser.id)
        .map((u, index) => ({
          ...u,
          order: index,
        }));

      const destinationUsers = prev.filter((u) => u.status === overUser.status);

      const movedUser: User = {
        ...activeUser,
        status: overUser.status,
        order: destinationUsers.length,
      };

      const updated = [
        ...prev.filter((u) => u.status !== activeUser.status && u.status !== overUser.status),
        ...sourceUsers,
        ...destinationUsers,
        movedUser,
      ];
      saveToLocalStorage(USERS_KEY, updated);
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col px-6">
      <h1 className="text-2xl font-bold mb-4 pt-6">Frontend 채용</h1>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-stretch">
          {sections.map((section) => {
            const sectionUsers = users.filter((u) => u.status === section).sort((a, b) => a.order - b.order);

            return (
              <KanbanSection key={section} title={section} count={sectionUsers.length}>
                <SortableContext items={sectionUsers.map((u) => u.id)} strategy={verticalListSortingStrategy}>
                  {sectionUsers.map((user) => (
                    <SortableItem key={user.id} id={user.id}>
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
