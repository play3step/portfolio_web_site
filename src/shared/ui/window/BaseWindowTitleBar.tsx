"use client";

import { useState } from "react";

interface WindowTitleBarProps {
  title: string;
  onClose: () => void;
}

export const WindowTitleBar = ({ title, onClose }: WindowTitleBarProps) => {
  const [isHoveringControls, setIsHoveringControls] = useState(false);

  return (
    <div
      className="
        h-12 px-4
        flex items-center justify-between
        bg-linear-to-b to-transparent
        from-white/5 border-b border-white/5
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
            relative
          "
        >
          {isHoveringControls && (
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/60">
              ✕
            </span>
          )}
        </button>

        <button
          className={`
            w-3 h-3 rounded-full
            bg-[#FEBC2E] transition-colors  
            relative
          `}
        >
          {isHoveringControls && (
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/60">
              −
            </span>
          )}
        </button>

        <button
          className={`
            w-3 h-3 rounded-full
            bg-[#28C840] transition-colors
            relative
          `}
        >
          {isHoveringControls && (
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/60">
              ⤢
            </span>
          )}
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-gray-300">
        {title}
      </div>

      <div className="w-[60px]"></div>
    </div>
  );
};
