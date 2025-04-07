import { create } from 'zustand';
import type { Network, SortOption } from '../types';
import type { DecimalPlaces } from '../types/filters';

interface FilterState {
  network: Network | null;
  sortOption: SortOption;
  decimalPlaces: DecimalPlaces;
  setNetwork: (network: Network | null) => void;
  setSortOption: (option: SortOption) => void;
  setDecimalPlaces: (places: DecimalPlaces) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  network: null,
  sortOption: 'price_desc',
  decimalPlaces: 4,
  setNetwork: (network) => set({ network }),
  setSortOption: (sortOption) => set({ sortOption }),
  setDecimalPlaces: (decimalPlaces) => set({ decimalPlaces }),
}));