export const SUPPORTED_NETWORKS = [
  // EVM Networks
  { chainId: 1, name: 'Ethereum', id: 'ethereum', type: 'evm' },
  { chainId: 137, name: 'Polygon', id: 'polygon', type: 'evm' },
  { chainId: 56, name: 'BNB Chain', id: 'bnb', type: 'evm' },
  { chainId: 42161, name: 'Arbitrum', id: 'arbitrum', type: 'evm' },
  { chainId: 10, name: 'Optimism', id: 'optimism', type: 'evm' },
  { chainId: 8453, name: 'Base', id: 'base', type: 'evm' },
  
  // Solana Ecosystem
  { chainId: -1, name: 'Solana', id: 'solana', type: 'solana' },
  { chainId: -2, name: 'Jupiter', id: 'jupiter', type: 'solana' },
  { chainId: -3, name: 'Raydium', id: 'raydium', type: 'solana' },
  
  // XRP Network
  { chainId: -4, name: 'XRP Ledger', id: 'xrp', type: 'xrp' },
] as const;

export type SupportedNetwork = typeof SUPPORTED_NETWORKS[number];
export type NetworkType = SupportedNetwork['type'];