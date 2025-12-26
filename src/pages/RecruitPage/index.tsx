import { useEffect, useState, useMemo } from "react";
import { DndContext, closestCenter, DragEndEvent, DragOverEvent, DragStartEvent, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanSection, Card, SortableItem, ConfirmModal } from "@/components";
import { getFromLocalStorage, saveToLocalStorage, applyDragResult } from "@/util";
import { User, RECRUIT_STAGES, RecruitStatus } from "@/types";

const USERS_KEY = "users";
type UsersByStatus = Record<RecruitStatus, User[]>;

const RecruitPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeCard, setActiveCard] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>();

  useEffect(() => {
    const storedUsers = getFromLocalStorage<User[]>(USERS_KEY);
    if (Array.isArray(storedUsers)) {
      setUsers(storedUsers);
    }
  }, []);

  const usersByStatus = useMemo<UsersByStatus>(() => {
    const result = Object.fromEntries(RECRUIT_STAGES.map((stage) => [stage, [] as User[]])) as UsersByStatus;

    users.forEach((user) => {
      result[user.status].push(user);
    });

    Object.values(result).forEach((list) => list.sort((a, b) => a.order - b.order));

    return result;
  }, [users]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    const user = users.find((u) => u.userId === active.id);
    setActiveCard(user ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveCard(null);
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

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    setUsers((prev) => {
      const next = prev.filter((u) => u.userId !== deleteTarget.userId);
      saveToLocalStorage(USERS_KEY, next);
      return next;
    });

    setDeleteTarget(null);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col px-6">
        <h1 className="text-2xl font-bold mb-4 pt-6">Frontend 채용</h1>
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}>
          <div className="flex gap-4 pb-4 flex-1 items-stretch overflow-x-auto">
            {RECRUIT_STAGES.map((stage) => {
              const stageUsers = usersByStatus[stage];

              return (
                <KanbanSection key={stage} title={stage} id={stage} count={stageUsers.length}>
                  <SortableContext items={stageUsers.map((u) => u.userId)} strategy={verticalListSortingStrategy}>
                    {stageUsers.map((user) => (
                      <SortableItem key={user.id} id={user.userId}>
                        <Card title={user.name} subtitle={user.userId} onDelete={() => setDeleteTarget(user)} />
                      </SortableItem>
                    ))}
                  </SortableContext>
                </KanbanSection>
              );
            })}
          </div>
          <DragOverlay>
            {activeCard ? (
              <div className="w-72 opacity-90 shadow-lg">
                <Card title={activeCard.name} subtitle={activeCard.userId} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        message="해당 지원자를 보드에서 제거하시겠습니까?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
};

export default RecruitPage;
