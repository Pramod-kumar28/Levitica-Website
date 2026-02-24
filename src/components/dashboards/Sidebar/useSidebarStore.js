import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  isOpen: true, // default open (desktop)
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
}));


