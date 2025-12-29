import { create } from "zustand";

interface WindowState {
  openWindows: Set<string>;
  topWindow: string | null;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  isOpen: (id: string) => boolean;
  bringToFront: (id: string) => void;
}

export const useWindowState = create<WindowState>((set, get) => ({
  openWindows: new Set(),
  topWindow: null,

  openWindow: (id) =>
    set((state) => ({
      openWindows: new Set(state.openWindows).add(id),
      topWindow: id,
    })),

  closeWindow: (id) =>
    set((state) => {
      const newSet = new Set(state.openWindows);
      newSet.delete(id);
      return {
        openWindows: newSet,
        topWindow: state.topWindow === id ? null : state.topWindow,
      };
    }),

  isOpen: (id) => get().openWindows.has(id),

  bringToFront: (id) =>
    set((state) => {
      if (state.openWindows.has(id)) {
        return { topWindow: id };
      }
      return state;
    }),
}));
