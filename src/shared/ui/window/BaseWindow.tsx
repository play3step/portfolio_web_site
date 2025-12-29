"use client";

import { motion, useDragControls } from "framer-motion";
import { ReactNode } from "react";
import { WindowTitleBar } from "./BaseWindowTitleBar";

interface BaseWindowProps {
  id: string;
  title: string;
  onClose: () => void;
  width?: number;
  height?: number;
  children: ReactNode;
  onClick: () => void;
}

export const BaseWindow = ({
  title,
  onClose,
  width = 600,
  height = 400,
  children,
  onClick,
}: BaseWindowProps) => {
  const controls = useDragControls();

  return (
    <motion.div
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      onDragStart={onClick}
      onClick={onClick}
      initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
      animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed left-1/2 top-1/2"
      style={{ width: `${width}px`, height: `${height}px`, zIndex: 50 }}
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
        <div
          onPointerDown={(e) => controls.start(e)}
          className="cursor-grab active:cursor-grabbing"
        >
          <WindowTitleBar title={title} onClose={onClose} />
        </div>

        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </motion.div>
  );
};
