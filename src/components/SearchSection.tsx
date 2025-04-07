import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { SearchFilters } from './SearchFilters';
import { TokenCard } from './TokenCard';
import { useTokenSearch } from '../hooks/useTokenSearch';
import { useTokenActions } from '../hooks/useTokenActions';
import { useSearchFilters } from '../hooks/useSearchFilters';
import type { SearchResult } from '../types';

export function SearchSection() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const { searchTokenList, loading, error } = useTokenSearch();
  const { handleBuy, handleSell, handleSwap } = useTokenActions();
  const {
    selectedNetwork,
    setSelectedNetwork,
    sortOption,
    setSortOption,
    decimalPlaces,
    setDecimalPlaces,
    filterAndSortResults,
  } = useSearchFilters();

  const handleSearch = async (query: string) => {
    setSearching(true);
    try {
      const results = await searchTokenList(query);
      setSearchResults(filterAndSortResults(results));
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] dark:bg-gray-900 relative">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">Minimal DEX</h1>
      <div className="w-full max-w-2xl">
        <SearchBar onSearch={handleSearch} />
        {searchResults.length > 0 && (
          <SearchFilters
            network={selectedNetwork}
            sortOption={sortOption}
            decimalPlaces={decimalPlaces}
            onNetworkChange={setSelectedNetwork}
            onSortChange={setSortOption}
            onDecimalPlacesChange={setDecimalPlaces}
          />
        )}
      </div>
      
      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}
      
      <div className="w-full max-w-2xl mt-8 space-y-4">
        {(loading || searching) ? (
          <p className="text-center text-gray-500">Loading tokens...</p>
        ) : (
          filterAndSortResults(searchResults).map((result) => (
            <TokenCard
              key={`${result.token.address}-${result.token.chainId}`}
              result={result}
              decimalPlaces={decimalPlaces}
              onBuy={() => handleBuy(result)}
              onSell={() => handleSell(result)}
              onSwap={() => handleSwap(result)}
            />
          ))
        )}
      </div>
    </div>
  );
}