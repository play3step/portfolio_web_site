import { create } from "zustand";

interface WindowState {
  openWindows: Set<string>;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  isOpen: (id: string) => boolean;
}

export const useWindowState = create<WindowState>((set, get) => ({
  openWindows: new Set(),

  openWindow: (id) =>
    set((state) => ({
      openWindows: new Set(state.openWindows).add(id),
    })),

  closeWindow: (id) =>
    set((state) => {
      const newSet = new Set(state.openWindows);
      newSet.delete(id);
      return { openWindows: newSet };
    }),

  isOpen: (id) => get().openWindows.has(id),
}));
