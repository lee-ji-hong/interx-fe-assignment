import { saveToLocalStorage, getFromLocalStorage, MOCK_APPLICANTS } from "@/util";
import type { User } from "@/types/user";

const USERS_KEY = "users";

export const initUsers = () => {
  const existing = getFromLocalStorage<User[]>(USERS_KEY);

  if (existing && existing.length > 0) return;

  saveToLocalStorage<User[]>(USERS_KEY, MOCK_APPLICANTS);
};
