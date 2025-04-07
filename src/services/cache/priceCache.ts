import { API } from '../../config/constants';
import type { TokenPrice } from '../types';

interface CacheEntry {
  price: TokenPrice;
  timestamp: number;
}

class PriceCache {
  private cache = new Map<string, CacheEntry>();

  get(address: string): TokenPrice | null {
    const entry = this.cache.get(address.toLowerCase());
    if (!entry) return null;
    
    const now = Date.now();
    if (now - entry.timestamp > API.CACHE.DURATION) {
      this.cache.delete(address.toLowerCase());
      return null;
    }
    
    return entry.price;
  }

  set(address: string, price: TokenPrice): void {
    this.cache.set(address.toLowerCase(), {
      price,
      timestamp: Date.now()
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const priceCache = new PriceCache();