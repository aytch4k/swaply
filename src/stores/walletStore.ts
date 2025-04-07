import { create } from 'zustand';
import type { Wallet } from '../types/wallet';
import { connectToWallet, disconnectFromWallet } from '../services/wallet';
import { SUPPORTED_NETWORKS } from '../config/networks';
import { WalletTimeoutError } from '../services/wallet/utils';

interface WalletState {
  wallets: Wallet[];
  connecting: boolean;
  error: string | null;
  connectWallet: (chainId: number) => Promise<void>;
  disconnectWallet: (address: string) => Promise<void>;
  clearError: () => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  wallets: [],
  connecting: false,
  error: null,
  connectWallet: async (chainId: number) => {
    try {
      set({ connecting: true, error: null });
      
      const network = SUPPORTED_NETWORKS.find(n => n.chainId === chainId);
      if (!network) {
        throw new Error('Unsupported network');
      }

      const wallet = await connectToWallet(chainId);
      
      // Check if we already have a wallet connected on this network
      const existingWalletOnNetwork = get().wallets.find(w => w.chainId === chainId);
      
      if (existingWalletOnNetwork) {
        set({ 
          error: `Already have a wallet connected on ${network.name}. Please disconnect it first.`,
          connecting: false 
        });
        return;
      }
      
      set(state => ({ 
        wallets: [...state.wallets, wallet],
        connecting: false 
      }));
    } catch (error) {
      let errorMessage = 'Failed to connect wallet';
      
      if (error instanceof WalletTimeoutError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      set({ 
        error: errorMessage,
        connecting: false 
      });
    }
  },
  disconnectWallet: async (address: string) => {
    try {
      await disconnectFromWallet(address);
      set(state => ({
        wallets: state.wallets.filter(w => w.address !== address)
      }));
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      // Still remove from state even if disconnect fails
      set(state => ({
        wallets: state.wallets.filter(w => w.address !== address)
      }));
    }
  },
  clearError: () => set({ error: null })
}));