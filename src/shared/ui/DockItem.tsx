"use client";

import Image from "next/image";
import { useState } from "react";

type DockItemLabelType =
  | "moreview"
  | "planding"
  | "maplelink"
  | "zoopzoop"
  | "settings"
  | "siri";

interface DockItemProps {
  item: {
    label: DockItemLabelType;
  };
}

const DockItem = ({ item }: DockItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative h-16 w-16">
      {isHovered && (
        <div
          className="
          absolute -top-14 left-1/2 -translate-x-1/2 
          bg-black/90 text-white text-xs font-medium
          px-3 py-1.5 rounded-lg whitespace-nowrap
          backdrop-blur-md
          shadow-lg
        "
        >
          {item.label}
        </div>
      )}

      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="
          w-16 h-16 
          rounded-xl overflow-hidden
          transition-all duration-200 ease-out
          cursor-pointer
          backdrop-blur-sm
          shadow-[0_4px_12px_rgba(0,0,0,0.15)]
          hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]
          hover:scale-110 
          hover:-translate-y-2
          border border-white/20
        "
      >
        <Image
          src={`/icon/${item.label}.svg`}
          alt={item.label}
          width={64}
          height={64}
          className="object-cover"
        />
      </button>
    </div>
  );
};

export default DockItem;
