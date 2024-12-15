import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
}));

export default useAuthStore;
