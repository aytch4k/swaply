export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  chainId: number;
}

export interface Network {
  id: string;
  name: string;
  chainId: number;
}

export type SortOption = 'price_asc' | 'price_desc';

export interface WalletInfo {
  address: string;
  chainId: number;
  isConnected: boolean;
}

export interface SearchResult {
  token: Token;
  price: number;
  priceChange24h: number;
  volume24h: number;
}