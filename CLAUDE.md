# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev    # Start development server (http://localhost:3000)
npm run build  # Production build
npm start      # Start production server
npm run lint   # Lint code with ESLint
```

## Architecture Overview

This is a **Mac OS-style portfolio website** built with Next.js 16 using **FSD (Feature-Sliced Design)** architecture. The site features draggable desktop windows managed by Zustand.

### FSD Layer Structure

```
src/
├── entities/       # Business domain objects (apps, chatbot, projects)
├── features/       # Cross-cutting features (window-manager, download-portfolio)
├── widgets/        # Composed UI components (chatbot-window, project-window, settings-window)
├── screens/        # Full-page compositions
└── shared/         # Shared utilities (assets, lib, base UI)

app/                # Next.js App Router (layout, pages, API routes)
```

**Path alias**: `@/*` maps to project root (e.g., `@/src/entities/...`)

**FSD import rule**: Lower layers can import from higher layers only (shared → widgets → features → entities).

## Window Manager System

Central state management via Zustand (`src/features/window-manager/model/useWindowState.ts`):

```typescript
interface WindowState {
  openWindows: Set<string>      // Currently open windows
  topWindow: string | null      // Currently focused window (z-index)
  openWindow: (id) => void
  closeWindow: (id) => void
  bringToFront: (id) => void
}
```

- Default open window: `chatbot`
- Windows map to app IDs defined in `app/page.tsx`:
  - `chatbot` → ChatbotWindow
  - `settings` → SettingsWindow
  - `moreview`, `planding`, `maplelink`, `zoopzoop`, `deemo` → ProjectWindow

All window widgets use `BaseWindow` from `src/shared/ui/window/BaseWindow.tsx` with Framer Motion animations.

## Chatbot Feature

**Knowledge Base**: `src/entities/chatbot/model/knowledge-base.json` contains portfolio data

**API Route**: `app/api/chat/route.ts`
- Google Gemini AI (models: `gemini-2.5-flash`, `gemini-2.5-flash-lite` with fallback)
- Upstash Redis rate limiting: 4 requests/minute per IP
- Off-topic keyword filtering (weather, stocks, food, etc.)
- Stateless design (client manages conversation history)

**UI Components** (`src/widgets/chatbot-window/`):
- `InitialScreen.tsx` - Welcome screen with quick options
- `MessageList.tsx` - Chat history display
- `ChatInput.tsx` - Message input
- `QuickOptions.tsx` - Predefined questions

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19
- **State**: Zustand
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **AI**: Google Generative AI
- **Rate Limiting**: Upstash Redis
- **Language**: TypeScript (strict mode)

## Environment Variables

```
GOOGLE_GEMINI_API_KEY=     # Required for chatbot
KV_REST_API_URL=           # Upstash Redis URL
KV_REST_API_TOKEN=         # Upstash Redis token
```
