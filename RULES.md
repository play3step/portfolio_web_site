# 🤖 Antigravity AI Editor Rules (FSD + MCP)

이 지침은 프로젝트의 아키텍처와 언어 설정을 규정하며, AI는 모든 작업 시 이를 최우선으로 준수해야 합니다.

---

## 🌐 Language Policy (Mandatory)

- **언어 설정**: AI는 모든 답변, 설명, 코드에 대한 설명 및 **계획(Plan) 파일** 작성을 반드시 **한국어**로 수행해야 합니다.
- **전문 용어**: 기술적인 용어(예: Hydration, Memoization 등)는 원문과 한글을 혼용할 수 있으나, 전체적인 문맥과 설명은 한국어를 사용합니다.

---

## 🏗 Architecture: Feature-Sliced Design (FSD)

AI는 코드를 생성하거나 파일 위치를 제안할 때 반드시 FSD 계층 구조를 따라야 합니다.

### 1. Folder Layers

- **app/**: 애플리케이션 로직의 진입점. (Providers, Global Styles, Root Layout 등)
- **pages/**: 애플리케이션의 각 페이지 구성. (데이터 페이칭 및 위젯 조립)
- **widgets/**: features와 entities를 조합하여 구성한 독립적인 UI 블록.
- **features/**: 사용자 인터랙션 및 비즈니스 가치를 제공하는 기능 단위. (예: `auth-by-email`, `add-to-cart`)
- **entities/**: 비즈니스 엔티티 (예: `User`, `Product`, `Article`). 데이터 스키마 및 기본 UI.
- **shared/**: 특정 비즈니스 로직에 종속되지 않는 재사용 가능한 코드. (UI Kit, Utils, Hooks, Assets 등)

### 2. Strict Rules

- **Cross-imports 금지**: 동일 계층 내의 슬라이스끼리 직접 참조할 수 없습니다. 상위 계층은 하위 계층을 참조할 수 있지만, 하위 계층은 상위 계층을 참조할 수 없습니다. (Public API인 `index.ts`를 통해서만 노출)

---

## 🛠 Core MCP Tools Usage

### 1. Context7 (Next.js & shadcn/ui)

- **Next.js (App Router)** 및 **shadcn/ui** 관련 작업을 할 때는 반드시 `context7` MCP 서버를 통해 최신 공식 문서를 먼저 조회하십시오.
- 추측하지 말고 현재 사용 중인 라이브러리의 정확한 API 규격과 컴포넌트 구조를 확인한 후 코드를 작성합니다.

### 2. Sequential Thinking (Problem Solving)

- 모든 구현 및 문제 해결 프로세스에서 `sequential_thinking` 도구를 활성화하십시오.
- 코드를 작성하기 전, 반드시 다음 단계를 거칩니다:
  1. **분석**: 요구사항과 현재 FSD 구조 내의 영향을 분석.
  2. **계획(Plan)**: 단계별 구현 목록을 **한국어**로 작성.
  3. **검토**: 에지 케이스 및 타입 안정성 확인.

---

## 📝 Workflow

1.  사용자의 요청을 받으면 **Context7**으로 기술 문서를 확인합니다.
2.  **Sequential Thinking**을 사용하여 구현 계획을 세웁니다.
3.  계획된 단계(Plan)와 그에 대한 설명을 **한국어**로 사용자에게 먼저 제시합니다.
4.  승인 후, **FSD 계층 구조**에 맞춰 코드를 생성합니다.

> **AI 지침**: "답변 시 사용자가 읽기 편하도록 논리적인 순서로 설명하고, 코드 블록 외의 모든 텍스트는 한국어를 사용하십시오."
