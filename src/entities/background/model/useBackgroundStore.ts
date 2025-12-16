import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BackgroundState {
  currentBackground: string;
  setBackground: (background: string) => void;
}

export const backgrounds = [
  { id: "bg1", path: "/background1.jpg", name: "Background 1" },
  { id: "bg2", path: "/background2.png", name: "Background 2" },
  { id: "bg3", path: "/background3.png", name: "Background 3" },
  { id: "bg4", path: "/background4.png", name: "Background 4" },
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
