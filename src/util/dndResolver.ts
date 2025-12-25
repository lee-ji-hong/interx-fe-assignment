import type { User, RecruitStatus } from "@/types/user";
import { moveToEmptyColumn, moveWithinColumn, moveAcrossColumns } from "@/util";

type ResolveParams = {
  users: User[];
  activeId: string;
  overId: string;
};

export const applyDragResult = ({ users, activeId, overId }: ResolveParams): User[] => {
  const activeUser = users.find((u) => u.userId === activeId);
  if (!activeUser) return users;

  const overUser = users.find((u) => u.userId === overId);

  // 컬럼 빈 공간
  if (!overUser) {
    return moveToEmptyColumn(users, activeUser, overId as RecruitStatus);
  }

  // 같은 컬럼
  if (activeUser.status === overUser.status) {
    return moveWithinColumn(users, activeId, overId);
  }

  // 다른 컬럼
  return moveAcrossColumns(users, activeUser, overUser);
};
