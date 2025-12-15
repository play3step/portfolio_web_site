"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface AppWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export default function AppWindow({
  isOpen,
  onClose,
  title = "Untitled",
  children,
}: AppWindowProps) {
  const [isHoveringControls, setIsHoveringControls] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
              y: 100,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0,
              opacity: 0,
              y: 100,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="fixed inset-0 m-auto w-[600px] h-[400px] z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="
              w-full h-full
              bg-white/95 dark:bg-gray-900/95
              backdrop-blur-2xl
              rounded-xl
              shadow-[0_20px_60px_rgba(0,0,0,0.3)]
              border border-black/10 dark:border-white/10
              overflow-hidden
              flex flex-col
            "
            >
              <div
                className="
                  h-12 px-4
                  flex items-center justify-between
                  bg-linear-to-b from-black/5 to-transparent
                  dark:from-white/5
                  border-b border-black/5 dark:border-white/5
                "
                onMouseEnter={() => setIsHoveringControls(true)}
                onMouseLeave={() => setIsHoveringControls(false)}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="
                      w-3 h-3 rounded-full
                      bg-[#FF5F57] hover:bg-[#FF4940]
                      transition-colors
                      group relative
                    "
                  >
                    {isHoveringControls && (
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/60">
                        ✕
                      </span>
                    )}
                  </button>

                  <button
                    className="
                      w-3 h-3 rounded-full
                      bg-[#FEBC2E] hover:bg-[#FDB300]
                      transition-colors
                      group relative
                    "
                  >
                    {isHoveringControls && (
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/60">
                        −
                      </span>
                    )}
                  </button>

                  <button
                    className="
                      w-3 h-3 rounded-full
                      bg-[#28C840] hover:bg-[#1FA932]
                      transition-colors
                      group relative
                    "
                  >
                    {isHoveringControls && (
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/60">
                        ⤢
                      </span>
                    )}
                  </button>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {title}
                </div>

                <div className="w-[60px]"></div>
              </div>

              <div className="flex-1 overflow-auto p-6">
                {children || (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Window Content
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
