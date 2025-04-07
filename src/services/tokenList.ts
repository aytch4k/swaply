import type { Token } from '../types';

const UNISWAP_TOKEN_LIST_URL = 'https://tokens.uniswap.org';
const FALLBACK_URL = 'https://raw.githubusercontent.com/Uniswap/default-token-list/main/build/uniswap-default.tokenlist.json';

export async function fetchTokenList(): Promise<Token[]> {
  try {
    // Try primary URL first
    const response = await fetch(UNISWAP_TOKEN_LIST_URL);
    if (!response.ok) {
      throw new Error('Primary URL failed');
    }
    const data = await response.json();
    return data.tokens.map((token: any) => ({
      address: token.address,
      symbol: token.symbol,
      name: token.name,
      decimals: token.decimals,
      logoURI: token.logoURI,
      chainId: token.chainId,
    }));
  } catch (error) {
    // Try fallback URL
    try {
      const response = await fetch(FALLBACK_URL);
      const data = await response.json();
      return data.tokens.map((token: any) => ({
        address: token.address,
        symbol: token.symbol,
        name: token.name,
        decimals: token.decimals,
        logoURI: token.logoURI,
        chainId: token.chainId,
      }));
    } catch (fallbackError) {
      console.error('Failed to fetch token list from both sources:', fallbackError);
      return [];
    }
  }
}