"use client";

import dynamic from "next/dynamic";
import { BottomDock } from "@/src/widgets";
import { ManagedWindow } from "@/src/features/window-manager";

const ChatbotWindow = dynamic(
  () => import("@/src/widgets").then((mod) => mod.ChatbotWindow),
  { ssr: false }
);
const ProjectWindow = dynamic(
  () => import("@/src/widgets").then((mod) => mod.ProjectWindow),
  { ssr: false }
);
const SettingsWindow = dynamic(
  () => import("@/src/widgets").then((mod) => mod.SettingsWindow),
  { ssr: false }
);

const windowComponentMap = {
  settings: SettingsWindow,
  chatbot: ChatbotWindow,
  moreview: ProjectWindow,
  planding: ProjectWindow,
  maplelink: ProjectWindow,
  zoopzoop: ProjectWindow,
  deemo: ProjectWindow,
};
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ManagedWindow componentMap={windowComponentMap} />

      <div className="w-full max-w-md absolute bottom-10 left-1/2 -translate-x-1/2">
        <BottomDock />
      </div>
    </div>
  );
}
