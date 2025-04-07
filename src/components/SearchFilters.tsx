import React from 'react';
import { NetworkFilter } from './filters/NetworkFilter';
import { SortFilter } from './filters/SortFilter';
import { DecimalPlacesFilter } from './filters/DecimalPlacesFilter';
import type { FilterState, FilterActions } from '../types/filters';

interface SearchFiltersProps extends FilterState, FilterActions {}

export function SearchFilters({
  network,
  sortOption,
  decimalPlaces,
  onNetworkChange,
  onSortChange,
  onDecimalPlacesChange
}: SearchFiltersProps) {
  return (
    <div className="flex gap-2 mt-4 mb-6">
      <NetworkFilter 
        value={network} 
        onChange={onNetworkChange} 
      />
      <SortFilter 
        value={sortOption} 
        onChange={onSortChange} 
      />
      <DecimalPlacesFilter 
        value={decimalPlaces} 
        onChange={onDecimalPlacesChange} 
      />
    </div>
  );
}