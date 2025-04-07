import { API } from '../config/constants';
import type { Token } from '../types';
import type { TokenPrice } from './types';
import { fetchTokenPricesFromAPI, fetchFallbackPrice } from './api/coingecko';
import { withRetry, delay } from './utils/retry';
import { priceCache } from './cache/priceCache';

function chunkArray<T>(array: T[], size: number): T[][] {
  return array.reduce((acc, item, i) => {
    const chunkIndex = Math.floor(i / size);
    acc[chunkIndex] = [...(acc[chunkIndex] || []), item];
    return acc;
  }, [] as T[][]);
}

export async function getTokenPrices(
  tokens: Token[], 
  signal?: AbortSignal
): Promise<Map<string, TokenPrice>> {
  const priceMap = new Map<string, TokenPrice>();
  
  // Get cached prices first
  tokens.forEach(token => {
    const cached = priceCache.get(token.address);
    if (cached) {
      priceMap.set(token.address.toLowerCase(), cached);
    }
  });

  // Filter tokens that need fresh prices
  const tokensToFetch = tokens.filter(token => 
    !priceMap.has(token.address.toLowerCase())
  );

  if (tokensToFetch.length === 0) {
    return priceMap;
  }

  // Process tokens in smaller chunks to respect rate limits
  const chunks = chunkArray(tokensToFetch, API.LIMITS.CHUNK_SIZE);

  for (const chunk of chunks) {
    if (signal?.aborted) {
      break;
    }

    try {
      const addresses = chunk.map(token => token.address);
      const prices = await withRetry(() => fetchTokenPricesFromAPI(addresses));

      // Process successful responses
      Object.entries(prices).forEach(([address, priceData]) => {
        if (priceData.current_price > 0) {
          priceCache.set(address, priceData);
          priceMap.set(address, priceData);
        }
      });

      // Handle tokens without prices using fallback
      for (const token of chunk) {
        if (signal?.aborted) break;

        const address = token.address.toLowerCase();
        if (!priceMap.has(address)) {
          try {
            const fallbackPrice = await withRetry(() => fetchFallbackPrice(token));
            if (fallbackPrice) {
              priceCache.set(address, fallbackPrice);
              priceMap.set(address, fallbackPrice);
            }
          } catch (error) {
            console.warn(`Failed to fetch fallback price for ${token.symbol}:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch prices for chunk:', error);
    }

    // Add delay between chunks to respect rate limits
    if (chunks.length > 1 && !signal?.aborted) {
      await delay(API.RETRY.CHUNK_DELAY);
    }
  }

  return priceMap;
}