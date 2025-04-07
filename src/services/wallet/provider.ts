import type { EthereumProvider } from '../../types/ethereum';

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export async function getProvider(): Promise<EthereumProvider> {
  if (typeof window === 'undefined') {
    throw new Error('Window is not defined');
  }

  if (!window.ethereum) {
    throw new Error(
      'No Ethereum wallet found. Please install MetaMask or another web3 wallet'
    );
  }

  return window.ethereum;
}