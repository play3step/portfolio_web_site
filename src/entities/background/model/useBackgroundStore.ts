import { BackgroundImages } from "@/src/shared";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BackgroundState {
  currentBackground: string;
  setBackground: (background: string) => void;
}

export const backgrounds = [
  { id: "bg1", path: BackgroundImages.background1, name: "Background 1" },
  { id: "bg2", path: BackgroundImages.background2, name: "Background 2" },
  { id: "bg3", path: BackgroundImages.background3, name: "Background 3" },
  { id: "bg4", path: BackgroundImages.background4, name: "Background 4" },
];

export const useBackgroundStore = create<BackgroundState>()(
  persist(
    (set) => ({
      currentBackground: "/background1.jpg",
      setBackground: (background) => set({ currentBackground: background }),
    }),
    {
      name: "background-storage",
    }
  )
);
