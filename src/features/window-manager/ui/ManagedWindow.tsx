"use client";

import { AnimatePresence } from "framer-motion";
import { ComponentType } from "react";
import { getAppById } from "@/src/entities/app";
import { BaseWindow } from "@/src/shared";
import { useWindowState } from "../model/useWindowState";

interface WindowComponentMap {
  [key: string]: ComponentType<{ appId: string }>;
}

interface ManagedWindowProps {
  componentMap: WindowComponentMap;
}

export const ManagedWindow = ({ componentMap }: ManagedWindowProps) => {
  const openWindows = useWindowState((state) => state.openWindows);
  const closeWindow = useWindowState((state) => state.closeWindow);

  return (
    <AnimatePresence>
      {Array.from(openWindows).map((windowId, index) => {
        const app = getAppById(windowId);
        const Component = componentMap[windowId];

        if (!app) return null;

        return (
          <div key={windowId} style={{ zIndex: 50 + index }}>
            <BaseWindow
              id={windowId}
              title={app.label}
              onClose={() => closeWindow(windowId)}
              width={app.windowProps?.width}
              height={app.windowProps?.height}
            >
              {Component ? (
                <Component appId={windowId} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  {app.label} - 준비중
                </div>
              )}
            </BaseWindow>
          </div>
        );
      })}
    </AnimatePresence>
  );
};
