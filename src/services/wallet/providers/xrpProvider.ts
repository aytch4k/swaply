import type { WalletProvider } from '../types';

declare global {
  interface Window {
    xrpl?: {
      connect: () => Promise<{ address: string }>;
      disconnect: () => Promise<void>;
    };
    xumm?: {
      authorize: () => Promise<{ address: string }>;
      logout: () => Promise<void>;
    };
  }
}

export const xrpProvider: WalletProvider = {
  isAvailable: () => {
    return typeof window !== 'undefined' && 
           !!(window.xrpl || window.xumm);
  },

  connect: async () => {
    // Try XUMM first, then fallback to generic XRPL wallet
    if (window.xumm) {
      try {
        const response = await window.xumm.authorize();
        return response.address;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error('Failed to connect to XUMM wallet');
      }
    }

    if (window.xrpl) {
      try {
        const response = await window.xrpl.connect();
        return response.address;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error('Failed to connect to XRPL wallet');
      }
    }

    throw new Error('Please install XUMM or another XRPL wallet');
  },

  disconnect: async () => {
    if (window.xumm) {
      await window.xumm.logout();
      return true;
    }
    if (window.xrpl) {
      await window.xrpl.disconnect();
      return true;
    }
    return false;
  },
};