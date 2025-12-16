"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { WindowTitleBar } from "./BaseWindowTitleBar";

interface BaseWindowProps {
  id: string;
  title: string;
  onClose: () => void;
  width?: number;
  height?: number;
  children: ReactNode;
}

export const BaseWindow = ({
  title,
  onClose,
  width = 600,
  height = 400,
  children,
}: BaseWindowProps) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 100 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0, y: 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed inset-0 m-auto"
      style={{ width: `${width}px`, height: `${height}px` }}
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
        <WindowTitleBar title={title} onClose={onClose} />

        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </motion.div>
  );
};
