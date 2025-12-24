import { KanbanSection, Card } from "@/components";

const sections = ["지원", "스크린콜", "코딩테스트", "1차 인터뷰", "2차 인터뷰", "최종 협의", "입사 확정"];

const RecruitPage = () => {
  return (
    <div className="min-h-screen flex flex-col px-6">
      <h1 className="text-2xl font-bold mb-4 pt-6">채용 칸반</h1>
      <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-stretch">
        {sections.map((s) => (
          <KanbanSection key={s} title={s} count={10}>
            <Card title={`${s} 후보자 A`} subtitle="경력 3년 · 코어" />
            <Card title={`${s} 후보자 B`} subtitle="신입 · AI" />
          </KanbanSection>
        ))}
      </div>
    </div>
  );
};

export default RecruitPage;
