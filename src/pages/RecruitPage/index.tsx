import { useEffect, useState } from "react";
import { KanbanSection, Card } from "@/components";
import { getFromLocalStorage } from "@/util/localStorage";
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
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col px-6">
      <h1 className="text-2xl font-bold mb-4 pt-6">Frontend 채용</h1>
      <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-stretch">
        {sections.map((section) => {
          const sectionUsers = users.filter((user) => user.status === section);

          return (
            <KanbanSection key={section} title={section} count={sectionUsers.length}>
              {sectionUsers.map((user) => (
                <Card key={user.id} title={user.name} subtitle={`경력 ${user.experience}년 · ${user.part}`} />
              ))}
            </KanbanSection>
          );
        })}
      </div>
    </div>
  );
};

export default RecruitPage;
