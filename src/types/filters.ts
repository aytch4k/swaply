export type DecimalPlaces = 2 | 4 | 6 | 8 | 10;

export interface FilterState {
  network: Network | null;
  sortOption: SortOption;
  decimalPlaces: DecimalPlaces;
}

export interface FilterActions {
  onNetworkChange: (network: Network | null) => void;
  onSortChange: (option: SortOption) => void;
  onDecimalPlacesChange: (places: DecimalPlaces) => void;
}