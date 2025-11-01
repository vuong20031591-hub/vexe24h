import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SearchQuery } from "@/types";

interface SearchState {
  // Current search query
  currentSearch: SearchQuery | null;
  
  // Recent searches (max 5)
  recentSearches: SearchQuery[];
  
  // Actions
  setCurrentSearch: (query: SearchQuery) => void;
  addToRecentSearches: (query: SearchQuery) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      currentSearch: null,
      recentSearches: [],

      setCurrentSearch: (query) => set({ currentSearch: query }),

      addToRecentSearches: (query) =>
        set((state) => {
          // Check if query already exists
          const exists = state.recentSearches.some(
            (s) => s.from === query.from && s.to === query.to
          );

          if (exists) return state;

          // Add to beginning, keep max 5
          const updated = [query, ...state.recentSearches].slice(0, 5);
          return { recentSearches: updated };
        }),

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: "datve360-search-storage",
    }
  )
);

