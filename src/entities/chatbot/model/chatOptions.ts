import { QuickOption } from "./type";

export const PROJECT_OPTIONS: QuickOption[] = [
  { id: "p1", label: "포트폴리오 웹사이트", category: "project-portfolio" },
  { id: "p2", label: "MoreView", category: "project-moreview" },
  { id: "p3", label: "Planding", category: "project-planding" },
  { id: "p4", label: "Maplelink", category: "project-maplelink" },
  { id: "p5", label: "ZoopZoop", category: "project-zoopzoop" },
  { id: "back", label: "⬅️ 돌아가기", category: "back" },
];

export const QUICK_OPTIONS: QuickOption[] = [
  { id: "1", label: "자기소개가 궁금해요", category: "about" },
  {
    id: "2",
    label: "진행한 프로젝트",
    category: "projects",
    hasFollowUp: true,
  },
  { id: "3", label: "사용 가능한 기술", category: "skills" },
  { id: "4", label: "연락처 알려주세요", category: "contact" },
  { id: "5", label: "협업 스타일 & 가치관", category: "values" },
];

export const OPTION_GROUPS: Record<string, QuickOption[]> = {
  main: QUICK_OPTIONS,
  projects: PROJECT_OPTIONS,
};
