import { useVirtualizer } from "@tanstack/react-virtual";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem, Card } from "@/components";
import type { User } from "@/types";

type Props = {
  users: User[];
  onDelete: (user: User) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
};

const CARD_HEIGHT = 72;

const KanbanCardList = ({ users, onDelete, scrollRef }: Props) => {
  const rowVirtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => CARD_HEIGHT,
    overscan: 2,
  });

  return (
    <div
      className="relative w-full"
      style={{
        height: rowVirtualizer.getTotalSize(),
      }}>
      <SortableContext items={users.map((u) => u.userId)} strategy={verticalListSortingStrategy}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const user = users[virtualRow.index];

          return (
            <div
              key={user.userId}
              className="absolute left-0 top-0 w-full"
              style={{
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
              }}>
              <SortableItem id={user.userId}>
                <Card title={user.name} subtitle={user.userId} onDelete={() => onDelete(user)} />
              </SortableItem>
            </div>
          );
        })}
      </SortableContext>
    </div>
  );
};

export default KanbanCardList;
