import { useState, useCallback } from 'react';
import type { SearchResult, Network, SortOption } from '../types';
import type { DecimalPlaces } from '../types/filters';

export function useSearchFilters() {
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('price_desc');
  const [decimalPlaces, setDecimalPlaces] = useState<DecimalPlaces>(4);

  const filterAndSortResults = useCallback((results: SearchResult[]): SearchResult[] => {
    let filtered = results;

    // Apply network filter
    if (selectedNetwork) {
      filtered = results.filter(result => result.token.chainId === selectedNetwork.chainId);
    }

    // Apply sorting
    return [...filtered].sort((a, b) => {
      if (sortOption === 'price_asc') {
        return a.price - b.price;
      }
      return b.price - a.price;
    });
  }, [selectedNetwork, sortOption]);

  return {
    selectedNetwork,
    setSelectedNetwork,
    sortOption,
    setSortOption,
    decimalPlaces,
    setDecimalPlaces,
    filterAndSortResults,
  };
}