import React, { useEffect, useState } from 'react';
import { useSearchStore } from '../stores/searchStore';
import { useFilterStore } from '../stores/filterStore';
import { TokenCard } from './TokenCard';
import { SearchFilters } from './SearchFilters';
import { useTokenSearch } from '../hooks/useTokenSearch';
import { useDebounce } from '../hooks/useDebounce';
import type { SearchResult } from '../types';

export function SearchResults() {
  const { searchQuery } = useSearchStore();
  const { network, sortOption, decimalPlaces, setNetwork, setSortOption, setDecimalPlaces } = useFilterStore();
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { searchTokenList, loading, error } = useTokenSearch();
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    let mounted = true;

    async function performSearch() {
      if (debouncedQuery.trim()) {
        const searchResults = await searchTokenList(debouncedQuery);
        if (mounted) {
          // Filter and sort results
          let filteredResults = [...searchResults];
          
          // Apply network filter
          if (network) {
            filteredResults = filteredResults.filter(
              result => result.token.chainId === network.chainId
            );
          }

          // Apply sorting
          filteredResults.sort((a, b) => {
            if (sortOption === 'price_asc') {
              return a.price - b.price;
            }
            return b.price - a.price;
          });

          setResults(filteredResults);
        }
      } else {
        if (mounted) {
          setResults([]);
        }
      }
    }

    performSearch();

    return () => {
      mounted = false;
    };
  }, [debouncedQuery, searchTokenList, network, sortOption]);
  
  if (!searchQuery) return null;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-4">
        {results.length > 0 && (
          <SearchFilters
            network={network}
            sortOption={sortOption}
            decimalPlaces={decimalPlaces}
            onNetworkChange={setNetwork}
            onSortChange={setSortOption}
            onDecimalPlacesChange={setDecimalPlaces}
          />
        )}
        
        {loading ? (
          <p className="text-center text-gray-500">Loading results...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : results.length === 0 ? (
          <p className="text-center text-gray-500">No results found</p>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <TokenCard
                key={`${result.token.address}-${result.token.chainId}`}
                result={result}
                decimalPlaces={decimalPlaces}
                onBuy={() => {}}
                onSell={() => {}}
                onSwap={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}