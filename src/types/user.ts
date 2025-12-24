export type RecruitStatus =
  | "지원"
  | "스크린콜"
  | "코딩테스트"
  | "1차 인터뷰"
  | "2차 인터뷰"
  | "최종 협의"
  | "입사 확정";

export interface User {
  id: number;
  name: string;
  experience: number;
  part: string;
  status: RecruitStatus;
}
