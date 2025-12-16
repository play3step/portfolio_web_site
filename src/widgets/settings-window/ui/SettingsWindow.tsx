"use client";

import { backgrounds, useBackgroundStore } from "@/src/entities";
import Image from "next/image";

export const SettingsWindow = () => {
  const currentBackground = useBackgroundStore(
    (state) => state.currentBackground
  );
  const setBackground = useBackgroundStore((state) => state.setBackground);

  return (
    <div className="h-full p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">배경화면 설정</h1>

      <div className="grid grid-cols-2 gap-4">
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => setBackground(bg.path)}
            className={`relative aspect-video rounded-lg overflow-hidden border-4 transition-all hover:scale-105 ${
              currentBackground === bg.path
                ? "border-blue-500 shadow-lg"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image
              src={bg.path}
              alt={bg.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {currentBackground === bg.path && (
              <div className="absolute inset-0 bg-blue-500/50 bg-opacity-20 flex items-center justify-center">
                <span className="text-white px-3 py-1 rounded-full text-sm font-semibold">
                  적용됨
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
