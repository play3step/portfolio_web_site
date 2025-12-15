"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useWindowState } from "@/src/features/window-manager";
import { getAppById } from "@/src/entities/app";

import { windowVariants } from "../lib/animations";
import { WindowTitleBar } from "./WindowTitleBar";

export default function AppWindow() {
  const openWindows = useWindowState((state) => state.openWindows);
  const closeWindow = useWindowState((state) => state.closeWindow);

  return (
    <AnimatePresence>
      {Array.from(openWindows).map((windowId, index) => {
        const app = getAppById(windowId);
        if (!app) return null;

        return (
          <motion.div
            key={windowId}
            variants={windowVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 m-auto w-[600px] h-[400px]"
            style={{ zIndex: 50 + index }}
          >
            <div
              className="
              w-full h-full
              bg-gray-900/95
              backdrop-blur-2xl rounded-xl
              shadow-[0_20px_60px_rgba(0,0,0,0.3)]
              border border-white/10
              overflow-hidden flex flex-col
            "
            >
              <WindowTitleBar
                title={app.label}
                onClose={() => closeWindow(windowId)}
              />

              <div className="flex-1 overflow-auto p-6">
                <div className="flex items-center justify-center h-full text-gray-500">
                  {app.label} Content
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}
