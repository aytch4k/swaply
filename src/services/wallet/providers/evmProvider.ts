import { withTimeout, WALLET_CONNECT_TIMEOUT } from '../utils';
import { EVM_NETWORKS } from '../../../config/networks/chains';
import type { WalletProvider } from '../types';
import type { EthereumProvider } from '../../../types/ethereum';

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

let provider: EthereumProvider | null = null;

export const evmProvider: WalletProvider = {
  isAvailable: () => {
    return typeof window !== 'undefined' && !!window.ethereum;
  },

  initialize: () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      provider = window.ethereum;
      return true;
    }
    return false;
  },

  connect: async (chainId: number) => {
    if (!provider) {
      provider = window.ethereum;
    }

    if (!provider) {
      throw new Error('MetaMask not installed');
    }

    try {
      // Request accounts with timeout
      const accounts = await withTimeout(
        provider.request({ method: 'eth_requestAccounts' }),
        WALLET_CONNECT_TIMEOUT,
        'MetaMask connection timed out. Please try again.'
      );

      if (!accounts || !Array.isArray(accounts) || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const network = EVM_NETWORKS[chainId];
      if (!network) {
        throw new Error('Invalid network configuration');
      }

      // Switch chain with timeout
      try {
        await withTimeout(
          provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }],
          }),
          WALLET_CONNECT_TIMEOUT,
          'Network switch timed out. Please try again.'
        );
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          await withTimeout(
            provider.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: `0x${chainId.toString(16)}`,
                chainName: network.name,
                nativeCurrency: network.nativeCurrency,
                rpcUrls: network.rpcUrls,
                blockExplorerUrls: network.blockExplorerUrls
              }],
            }),
            WALLET_CONNECT_TIMEOUT,
            'Adding network timed out. Please try again.'
          );
        } else {
          throw switchError;
        }
      }

      return accounts[0] as string;
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error('User rejected the request');
      }
      if (error.name === 'WalletTimeoutError') {
        throw error;
      }
      throw new Error(error.message || 'Failed to connect wallet');
    }
  },

  disconnect: async () => {
    provider = null;
    return true;
  },
};