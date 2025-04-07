import { getWalletProvider } from './providers';
import { isWalletAvailable } from './detection';
import { SUPPORTED_NETWORKS } from '../../config/networks';
import type { Wallet } from '../../types/wallet';
import { withTimeout, WALLET_CONNECT_TIMEOUT } from './utils';

export async function connectToWallet(chainId: number): Promise<Wallet> {
  const network = SUPPORTED_NETWORKS.find(n => n.chainId === chainId);
  if (!network) {
    throw new Error('Unsupported network');
  }

  // Check if wallet is available first
  if (!isWalletAvailable(network.type)) {
    throw new Error(`No ${network.type.toUpperCase()} wallet detected`);
  }

  try {
    const provider = getWalletProvider(network.type);
    
    // Initialize provider
    if (!provider.initialize()) {
      throw new Error('Failed to initialize wallet');
    }

    // Connect with timeout
    const address = await withTimeout(
      provider.connect(chainId),
      WALLET_CONNECT_TIMEOUT,
      `Connection to ${network.name} timed out`
    );

    return {
      address,
      chainId: network.chainId,
      chainName: network.name
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to connect to ${network.name}`);
  }
}

export async function disconnectFromWallet(address: string): Promise<void> {
  // Find the wallet in the store to get its network type
  const network = SUPPORTED_NETWORKS[0]; // Default to EVM for now
  const provider = getWalletProvider(network.type);
  
  try {
    await provider.disconnect();
  } catch (error) {
    console.warn('Error disconnecting wallet:', error);
    // Don't throw here as some wallets don't support programmatic disconnect
  }
}