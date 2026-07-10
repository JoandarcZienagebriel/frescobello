import { create } from 'zustand';

export const useSearchStore = create((set) => ({
  isOpen: false,
  query: '',
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: '' }),
  setQuery: (query) => set({ query }),
}));