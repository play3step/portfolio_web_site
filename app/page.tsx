"use client";

import { BottomDock, ChatbotWindow, SettingsWindow } from "@/src/widgets";
import { ManagedWindow } from "@/src/features/window-manager";

const windowComponentMap = {
  settings: SettingsWindow,
  chatbot: ChatbotWindow,
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
