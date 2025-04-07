import { SUPPORTED_NETWORKS } from '../networks';

export type NetworkType = 'evm' | 'solana' | 'xrp';

export interface NetworkConfig {
  type: NetworkType;
  chainId: number;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

// EVM Network Configurations
export const EVM_NETWORKS: Record<number, NetworkConfig> = {
  1: {
    type: 'evm',
    chainId: 1,
    name: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://eth-mainnet.public.blastapi.io'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  137: {
    type: 'evm',
    chainId: 137,
    name: 'Polygon',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  56: {
    type: 'evm',
    chainId: 56,
    name: 'BNB Chain',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  42161: {
    type: 'evm',
    chainId: 42161,
    name: 'Arbitrum One',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  10: {
    type: 'evm',
    chainId: 10,
    name: 'Optimism',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  8453: {
    type: 'evm',
    chainId: 8453,
    name: 'Base',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.base.org'],
    blockExplorerUrls: ['https://basescan.org'],
  },
};

// Solana Ecosystem Networks
export const SOLANA_NETWORKS: NetworkConfig[] = [
  {
    type: 'solana',
    chainId: -1,
    name: 'Solana',
    nativeCurrency: { name: 'SOL', symbol: 'SOL', decimals: 9 },
    rpcUrls: ['https://api.mainnet-beta.solana.com'],
    blockExplorerUrls: ['https://explorer.solana.com'],
  },
  {
    type: 'solana',
    chainId: -2,
    name: 'Jupiter',
    nativeCurrency: { name: 'SOL', symbol: 'SOL', decimals: 9 },
    rpcUrls: ['https://api.mainnet-beta.solana.com'],
    blockExplorerUrls: ['https://explorer.solana.com'],
  },
  {
    type: 'solana',
    chainId: -3,
    name: 'Raydium',
    nativeCurrency: { name: 'SOL', symbol: 'SOL', decimals: 9 },
    rpcUrls: ['https://api.mainnet-beta.solana.com'],
    blockExplorerUrls: ['https://explorer.solana.com'],
  },
];

// XRP Network
export const XRP_NETWORKS: NetworkConfig[] = [
  {
    type: 'xrp',
    chainId: -4,
    name: 'XRP Ledger',
    nativeCurrency: { name: 'XRP', symbol: 'XRP', decimals: 6 },
    rpcUrls: ['wss://xrplcluster.com'],
    blockExplorerUrls: ['https://livenet.xrpl.org'],
  },
];

// Combined list of all networks
export const ALL_NETWORKS: NetworkConfig[] = [
  ...Object.values(EVM_NETWORKS),
  ...SOLANA_NETWORKS,
  ...XRP_NETWORKS,
];