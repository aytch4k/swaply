import { useState, useCallback } from 'react';
import { SUPPORTED_NETWORKS } from '../config/networks';
import { getWalletProvider } from '../services/wallet/providers';
import { isWalletAvailable, getRequiredWalletForNetwork } from '../services/wallet/detection';

export function useWalletNetwork() {
  const [selectedNetwork, setSelectedNetwork] = useState<number | null>(null);

  const switchNetwork = useCallback(async (chainId: number) => {
    try {
      const network = SUPPORTED_NETWORKS.find(n => n.chainId === chainId);
      
      if (!network) {
        throw new Error('Unsupported network');
      }

      // Check if appropriate wallet is installed
      if (!isWalletAvailable(network.type)) {
        const walletName = getRequiredWalletForNetwork(network.type);
        throw new Error(`Please install ${walletName} to connect to ${network.name}`);
      }

      const provider = getWalletProvider(network.type);
      
      // Initialize the provider first
      if (!provider.initialize()) {
        throw new Error(`Failed to initialize wallet provider for ${network.name}`);
      }

      const address = await provider.connect(chainId);
      return { address, network };
    } catch (error) {
      if (error instanceof Error) {
        // Rethrow user rejections and wallet-specific errors
        if (error.message.includes('rejected') || 
            error.message.includes('install')) {
          throw error;
        }
      }
      throw new Error('Failed to switch network. Please try again.');
    }
  }, []);

  return {
    selectedNetwork,
    setSelectedNetwork,
    switchNetwork
  };
}