import { saveToLocalStorage, getFromLocalStorage } from "@/util/localStorage";
import { MOCK_APPLICANTS } from "@/util/mockApplicants";
import type { User } from "@/types/user";

const USERS_KEY = "users";

export const initUsers = () => {
  const existing = getFromLocalStorage<User[]>(USERS_KEY);

  if (existing && existing.length > 0) return;

  saveToLocalStorage<User[]>(USERS_KEY, MOCK_APPLICANTS);
};
