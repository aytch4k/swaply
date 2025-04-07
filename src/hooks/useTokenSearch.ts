import { useState, useCallback, useRef } from 'react';
import type { Token, SearchResult } from '../types';
import { fetchTokenList } from '../services/tokenList';
import { getTokenPrices } from '../services/priceFeeds';
import { searchTokens } from '../utils/search';

export function useTokenSearch() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const searchTokenList = useCallback(async (query: string): Promise<SearchResult[]> => {
    if (!query.trim()) return [];

    try {
      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();
      setLoading(true);
      setError(null);

      // Load tokens if not loaded
      if (tokens.length === 0) {
        const tokenList = await fetchTokenList();
        setTokens(tokenList);
      }

      // Search tokens
      const results = searchTokens(tokens, query);
      
      // Get prices with abort signal
      const prices = await getTokenPrices(results, abortControllerRef.current.signal);
      
      return results.map(token => {
        const priceData = prices.get(token.address.toLowerCase());
        return {
          token,
          price: priceData?.current_price || 0,
          priceChange24h: priceData?.price_change_percentage_24h || 0,
          volume24h: priceData?.total_volume || 0
        };
      });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return [];
      }
      setError('Failed to search tokens');
      return [];
    } finally {
      setLoading(false);
    }
  }, [tokens]);

  return {
    searchTokenList,
    loading,
    error
  };
}