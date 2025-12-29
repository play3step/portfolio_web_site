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
  const topWindow = useWindowState((state) => state.topWindow);
  const bringToFront = useWindowState((state) => state.bringToFront);
  const closeWindow = useWindowState((state) => state.closeWindow);

  const windowsArray = Array.from(openWindows);

  return (
    <AnimatePresence>
      {windowsArray.map((windowId, index) => {
        const app = getAppById(windowId);
        const Component = componentMap[windowId];

        if (!app) return null;

        const isTop = windowId === topWindow;
        const zIndex = isTop ? 1000 : 50 + index;

        return (
          <div key={windowId} style={{ zIndex }}>
            <BaseWindow
              id={windowId}
              title={app.label}
              onClose={() => closeWindow(windowId)}
              width={app.windowProps?.width}
              height={app.windowProps?.height}
              onClick={() => bringToFront(windowId)}
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
