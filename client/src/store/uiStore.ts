import { create } from "zustand";

interface UIState {
  // Loading states
  isLoading: boolean;
  loadingMessage: string | null;
  
  // Modal/Dialog states
  isSearchModalOpen: boolean;
  isBookingModalOpen: boolean;
  
  // Mobile menu
  isMobileMenuOpen: boolean;
  
  // Actions
  setLoading: (loading: boolean, message?: string) => void;
  setSearchModalOpen: (open: boolean) => void;
  setBookingModalOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  loadingMessage: null,
  isSearchModalOpen: false,
  isBookingModalOpen: false,
  isMobileMenuOpen: false,

  setLoading: (loading, message) =>
    set({ isLoading: loading, loadingMessage: message || null }),

  setSearchModalOpen: (open) => set({ isSearchModalOpen: open }),

  setBookingModalOpen: (open) => set({ isBookingModalOpen: open }),

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}));

