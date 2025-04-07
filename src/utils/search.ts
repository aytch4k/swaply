import type { Token } from '../types';

export function searchTokens(tokens: Token[], query: string): Token[] {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return [];
  
  // Create a Map to ensure unique tokens by address
  const uniqueTokens = new Map<string, Token>();
  
  tokens.forEach(token => {
    if (
      (token.symbol.toLowerCase().includes(searchTerm) ||
       token.name.toLowerCase().includes(searchTerm) ||
       token.address.toLowerCase() === searchTerm) &&
      !uniqueTokens.has(token.address.toLowerCase())
    ) {
      uniqueTokens.set(token.address.toLowerCase(), token);
    }
  });
  
  // Convert Map back to array and limit to 10 results
  return Array.from(uniqueTokens.values()).slice(0, 10);
}