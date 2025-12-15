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
    <div className="relative h-12 w-12">
      {isHovered && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap backdrop-blur-sm">
          {item.label}
        </div>
      )}

      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-12 h-12 rounded-xl overflow-hidden transition-all duration-200 ease-out cursor-pointer shadow-lg hover:shadow-xl "
      >
        <Image
          src={`/icon/${item.label}.svg`}
          alt={item.label}
          width={48}
          height={48}
        />
      </button>
    </div>
  );
};

export default DockItem;
