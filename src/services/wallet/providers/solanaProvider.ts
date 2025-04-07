import type { WalletProvider } from '../types';

declare global {
  interface Window {
    phantom?: {
      solana?: {
        connect: () => Promise<{ publicKey: { toString: () => string } }>;
        disconnect: () => Promise<void>;
      };
    };
    solana?: {
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      isPhantom?: boolean;
    };
  }
}

let provider: any = null;

export const solanaProvider: WalletProvider = {
  isAvailable: () => {
    return typeof window !== 'undefined' && 
           !!(window.phantom?.solana || (window.solana?.isPhantom));
  },

  initialize: () => {
    if (typeof window !== 'undefined') {
      provider = window.phantom?.solana || window.solana;
      return !!provider;
    }
    return false;
  },

  connect: async () => {
    if (!provider) {
      provider = window.phantom?.solana || window.solana;
    }

    if (!provider) {
      throw new Error('Phantom wallet not installed');
    }

    try {
      const response = await provider.connect();
      return response.publicKey.toString();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Failed to connect to Phantom wallet');
    }
  },

  disconnect: async () => {
    if (provider) {
      await provider.disconnect();
      provider = null;
      return true;
    }
    return false;
  },
};