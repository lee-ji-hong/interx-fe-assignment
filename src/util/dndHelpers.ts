import { arrayMove } from "@dnd-kit/sortable";
import type { User, RecruitStatus } from "@/types/user";

export const normalizeUsersByStatus = (users: User[]): User[] => {
  const map = new Map<RecruitStatus, User[]>();

  users.forEach((u) => {
    if (!map.has(u.status)) map.set(u.status, []);
    map.get(u.status)!.push(u);
  });

  return Array.from(map.values()).flatMap((group) => group.map((u, i) => ({ ...u, order: i })));
};

// 컬럼이 빈 공간일 경우
export const moveToEmptyColumn = (users: User[], activeUser: User, destination: RecruitStatus): User[] => {
  if (activeUser.status === destination) return users;

  const moved = { ...activeUser, status: destination };

  const next = users.filter((u) => u.userId !== activeUser.userId).concat(moved);

  return normalizeUsersByStatus(next);
};

// 같은 컬럼내에서 이동할 경우
export const moveWithinColumn = (users: User[], activeId: string, overId: string): User[] => {
  const status = users.find((u) => u.userId === activeId)?.status;
  if (!status) return users;

  const same = users.filter((u) => u.status === status);
  const others = users.filter((u) => u.status !== status);

  const from = same.findIndex((u) => u.userId === activeId);
  const to = same.findIndex((u) => u.userId === overId);

  if (from === to) return users;

  return normalizeUsersByStatus([...others, ...arrayMove(same, from, to)]);
};

// 다른 컬럼에서 이동할 경우
export const moveAcrossColumns = (users: User[], activeUser: User, overUser: User): User[] => {
  const source = users.filter((u) => u.status === activeUser.status && u.userId !== activeUser.userId);
  const destination = users.filter((u) => u.status === overUser.status);

  const overIndex = destination.findIndex((u) => u.userId === overUser.userId);

  const moved = { ...activeUser, status: overUser.status };

  const newDestination = [...destination.slice(0, overIndex), moved, ...destination.slice(overIndex)];

  const others = users.filter((u) => u.status !== activeUser.status && u.status !== overUser.status);

  return normalizeUsersByStatus([...others, ...source, ...newDestination]);
};
