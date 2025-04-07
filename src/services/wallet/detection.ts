import type { NetworkType } from '../../config/networks';

interface WalletInfo {
  name: string;
  available: boolean;
  type: NetworkType;
}

export function detectWallets(): WalletInfo[] {
  if (typeof window === 'undefined') return [];

  const wallets: WalletInfo[] = [];

  // Check for MetaMask and other EVM wallets
  if (window.ethereum) {
    wallets.push({
      name: 'MetaMask',
      available: true,
      type: 'evm'
    });
  }

  // Check for Phantom wallet
  if (window.phantom?.solana || (window as any).solana?.isPhantom) {
    wallets.push({
      name: 'Phantom',
      available: true,
      type: 'solana'
    });
  }

  // Check for XUMM/Xaman wallet
  if (window.xumm || window.xrpl) {
    wallets.push({
      name: 'Xaman',
      available: true,
      type: 'xrp'
    });
  }

  return wallets;
}

export function isWalletAvailable(type: NetworkType): boolean {
  if (typeof window === 'undefined') return false;

  switch (type) {
    case 'evm':
      return !!window.ethereum;
    case 'solana':
      return !!(window.phantom?.solana || (window as any).solana?.isPhantom);
    case 'xrp':
      return !!(window.xumm || window.xrpl);
    default:
      return false;
  }
}

export function getRequiredWalletForNetwork(type: NetworkType): string {
  switch (type) {
    case 'solana':
      return 'Phantom';
    case 'xrp':
      return 'Xaman (XUMM)';
    default:
      return 'MetaMask';
  }
}