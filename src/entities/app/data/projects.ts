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
      "SSE",
      "Framer Motion",
    ],
    description: `평면적인 PPT의 한계를 넘어선 "3D 인터랙티브 프레젠테이션 저작 도구"입니다.
AI를 통해 텍스트만으로 3D 오브젝트를 자동 생성하고, 
2D 슬라이드와 3D 공간을 자유롭게 넘나드는 몰입감 있는 시각 경험을 제공합니다.
`,
    features: [
      "2D(Konva)와 3D(Three.js) 레이어의 통합 편집 및 인터랙티브 UI 구현",
      "Meshy AI 연동을 통한 텍스트/이미지 기반 3D 모델 자동 생성",
      "SSE(Server-Sent Events)를 활용하여 AI 모델 생성 상태를 실시간으로 수신하고 UX 차단 방지",
      "WebSocket 기반의 실시간 반영 및 팀 단위 프로젝트 공유 시스템",
    ],
    troubleshooting: [
      {
        title: "Immutable History 관리 및 메모리 누수 해결",
        content:
          "JSON.stringify를 이용한 상태 비교 방식에서 발생하는 정확도 저하와 무제한 히스토리 축적으로 인한 메모리 누수 문제를 해결했습니다. lodash의 isEqual을 도입하여 깊은 비교의 정확도를 높이고, 히스토리를 최대 50개로 제한하는 로직을 구현하여 메모리 사용량을 최적화하고 사용자 경험을 개선했습니다.",
      },
      {
        title: "장시간 소요되는 AI API 응답 처리 최적화",
        content:
          "최대 5분이 소요되는 Meshy AI API 호출 시 발생하는 UX 저하 문제를 SSE(Server-Sent Events) 스트리밍 방식을 도입해 해결했습니다. 모델 생성 중에도 다른 작업을 수행할 수 있도록 비동기 처리를 강화하고, 로컬 스토리지를 활용해 진행 상태 복원 기능을 추가했습니다.",
      },
    ],
    links: [
      { type: "github", url: "https://github.com/play3step/more-view-web" },
      { type: "youtube", url: "https://youtu.be/vImnLD8X1BE" },
    ],
  },
  {
    id: "planding",
    title: "PlanDing",
    image: AppIcons.planding,
    tags: [
      "React",
      "TypeScript",
      "Redux",
      "WebSocket",
      "STOMP",
      "Tailwind CSS",
      "Day.js",
    ],
    description: `개인과 팀의 일정을 하나의 흐름으로 연결하는 "실시간 협업 일정 플랫폼"입니다.
복잡한 설정 없이 직관적인 타임테이블과 전용 채팅을 통해
팀원 간의 일정 조율과 커뮤니케이션 비용을 획기적으로 낮췄습니다.
`,
    features: [
      "STOMP 프로토콜 기반의 WebSocket 구조로 다중 기능(채팅, 일정, 할 일) 동기화",
      "주간/일간 타임테이블 시각화 및 팀원 초대/권한 관리 시스템",
      "실시간 채팅 기능으로 협업 중 발생하는 변경 사항 즉각 공유",
    ],
    troubleshooting: [
      {
        title: "WebSocket 메시지 분기 구조의 확장성 개선",
        content:
          "기능이 늘어남에 따라 복잡해지는 단일 WebSocket 메시지 관리 문제를 해결하기 위해 STOMP 기반의 구독(Subscribe) 채널 구조로 전환했습니다. 이를 통해 기능별로 독립된 채널 설계를 가능하게 하여 코드 가독성을 높이고 다중 데이터 동기화의 안정성을 확보했습니다.",
      },
      {
        title: "번들 크기 최적화를 통한 초기 로딩 성능 개선",
        content:
          "전체 번들의 55%를 차지하던 Moment.js를 Day.js로 교체하여 라이브러리 크기를 99% 절감(288KB → 2KB)했습니다. Tree-shaking이 불가능하고 Mutable한 API의 부작용을 해결하여 성능과 안정성을 동시에 확보했습니다.",
      },
    ],
    links: [
      {
        type: "github",
        url: "https://github.com/2024-Hanium-PlanDing/PlanDing",
      },
      { type: "youtube", url: "https://youtu.be/vImnLD8X1BE" },
    ],
  },
  {
    id: "maplelink",
    title: "MapleLink",
    image: AppIcons.maplelink,
    tags: [
      "React",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "Nexon API",
    ],
    description: `Nexon Open API 기반의 "메이플스토리 길드 데이터 통합 관리 서비스"입니다.
수기로 관리하던 길드원 정보를 실시간으로 트래킹하고,
본캐/부캐 자동 판별 알고리즘을 통해 길드 운영의 효율성을 극대화했습니다.
`,
    features: [
      "최대 4개 길드의 동시 비교 및 길드원 변동(가입/탈퇴) 실시간 트래킹",
      "전투력, 장비, 어빌리티 등 40여 항목의 캐릭터 상세 데이터 시각화",
      "Nexon API를 활용한 메인 캐릭터(본캐) 자동 판별 시스템 구축",
    ],
    troubleshooting: [
      {
        title: "Nexon API Rate Limit 회피 및 로딩 속도 최적화",
        content:
          "캐싱 없이 매번 API를 호출하던 방식에서 TanStack Query를 도입해 불필요한 호출을 70% 감소시켰습니다. 데이터 성격에 따라 staleTime(5~10분)을 다르게 설정하고 refetchOnWindowFocus 옵션을 조정하여 API 제한 에러(429)를 방지하고 즉각적인 데이터 확인이 가능하도록 개선했습니다.",
      },
      {
        title: "부분 캐시 갱신(setQueryData)을 통한 UX 혁신",
        content:
          "전체 데이터를 다시 불러올 때 발생하는 5~10초의 대기 시간을 해결하기 위해 부분 캐시 갱신 전략을 사용했습니다. 변경된 멤버 데이터만 onMutate에서 setQueryData로 업데이트하여 UI 반영 시간을 0초로 단축시키고 실시간 업데이트와 같은 사용자 경험을 제공했습니다.",
      },
    ],
    links: [
      { type: "github", url: "https://github.com/play3step/maple-link" },
      { type: "live", url: "https://maplelink.co.kr/" },
    ],
  },
  {
    id: "zoopzoop",
    title: "ZoopZoop",
    image: AppIcons.zoopzoop,
    tags: [
      "Next.js",
      "Liveblocks",
      "XYFlow",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
    ],
    description: `수집부터 브레인스토밍까지 연결되는 "협업형 지식 관리 플랫폼"입니다.
크롬 확장 프로그램으로 콘텐츠를 빠르게 캡처하고 AI로 요약하며,
시각화된 대시보드에서 팀원들과 실시간으로 아이디어를 확장할 수 있습니다.
`,
    features: [
      "AI 기반 콘텐츠 자동 요약, 태그 추출 및 맞춤형 뉴스 추천 피드",
      "XYFlow와 Liveblocks를 활용한 실시간 협업 화이트보드 및 노드 관계 시각화",
      "Hydration Boundary를 이용한 SSR/CSR 캐시 동기화로 초기 렌더링 최적화",
    ],
    troubleshooting: [
      {
        title: "실시간 협업 중 발생한 UI 블로킹 및 성능 저하 해결",
        content:
          "공유 Storage에 드래그 중인 위치를 실시간으로 업데이트할 때 발생하는 프레임 저하를 데이터를 3가지 계층(Presence, Storage, Local)으로 분리하여 해결했습니다. 드래그 중인 위치는 임시 데이터(Presence)로 처리하여 불필요한 Storage 업데이트를 줄이고 60fps의 부드러운 UI를 구현했습니다.",
      },
      {
        title: "Next.js와 TanStack Query 간의 캐시 충돌 및 화면 깜빡임 해결",
        content:
          "SSR과 CSR 간의 데이터 불일치로 발생하는 화면 깜빡임을 해결하기 위해 Hydration Boundary를 도입했습니다. 서버에서 미리 Prefetch한 데이터를 클라이언트로 안정적으로 전달하고, Query Key 중앙 관리 시스템을 구축하여 캐시 무효화 시 발생하던 불일치 문제를 해결했습니다.",
      },
    ],
    links: [
      {
        type: "github",
        url: "https://github.com/play3step/FE-ZoopZoop-Refactor",
      },
      { type: "youtube", url: "https://youtu.be/8ofrx60MaL4" },
    ],
  },
  {
    id: "deemo",
    title: "Deemo",
    image: AppIcons.deemo,
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Zustand"],
    description: `웹 환경을 하나의 운영체제처럼 경험하게 하는 "Mac OS 컨셉의 포트폴리오 사이트"입니다.
정형화된 틀에서 벗어나, 복잡한 UI 오케스트레이션 역량을 
Dock, Launchpad, Window System 등의 인터랙티브 요소로 녹여냈습니다.
`,
    features: [
      "Mac OS의 UI/UX를 웹으로 완벽하게 이식 (Dock, Launchpad, Window System)",
      "Framer Motion을 활용한 부드러운 창 전환 및 애니메이션",
      "전역 상태 관리를 통한 앱 간 데이터 연동",
    ],
    links: [
      {
        type: "github",
        url: "https://github.com/play3step/portfolio_web_site",
      },
      { type: "live", url: "https://deemo.dev" },
    ],
  },
];
