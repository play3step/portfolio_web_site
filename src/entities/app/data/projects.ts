import { Project } from "../model/type";
import { AppIcons } from "@/src/shared";

export const projects: Project[] = [
  {
    id: "moreview",
    title: "MoreView",
    image: AppIcons.moreview,
    tags: [
      "React",
      "Three.js",
      "Konva",
      "Recoil",
      "Meshy AI",
      "Styled-Components",
    ],
    introduce:
      "2D/3D 요소를 조합한 프레젠테이션 툴로, 몰입감 있는 3D 시각화와 AI를 통해 모델 생성 기능을 제공합니다.",
  },

  {
    id: "planding",
    title: "Planding",
    image: AppIcons.planding,
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "dayjs",
      "MUI",
      "Stomp.js",
    ],
    introduce:
      "개인과 팀의 일정을 통합 관리하고 실시간 채팅으로 소통하는 협업 플랫폼입니다.",
  },

  {
    id: "maplelink",
    title: "Maplelink",
    image: AppIcons.maplelink,
    tags: [
      "React",
      "TypeScript",
      "TanStack Query",
      "Nexon Open API",
      "Tailwind CSS",
      "Zustand",
    ],
    introduce:
      "Nexon Open API를 활용해 길드원 정보를 실시간 조회하고 본캐/부캐를 구분해 주는 관리 서비스입니다.",
  },
  {
    id: "zoopzoop",
    title: "ZoopZoop",
    image: AppIcons.zoopzoop,
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Zustand",
      "Liveblocks",
      "XYFlow",
      "Shadcn/UI",
    ],
    introduce:
      "웹 콘텐츠 수집부터 AI 요약, 팀 단위 브레인스토밍까지 연결되는 협업형 지식 관리 플랫폼입니다.",
  },
  {
    id: "deemo",
    title: "Deemo",
    image: AppIcons.deemo,
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Zustand"],
    introduce:
      "단순 나열식 포트폴리오를 벗어나, 인터랙티브한 사용자 경험을 제공하는 Mac OS 컨셉의 개인 사이트입니다.",
  },
];
