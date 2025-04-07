import { useState } from 'react';
import type { WalletInfo } from '../types';

export function useWallet() {
  const [wallet, setWallet] = useState<WalletInfo>({
    address: '',
    chainId: 1,
    isConnected: false,
  });

  const handleConnect = async () => {
    // TODO: Implement wallet connection logic
    console.log('Connecting wallet...');
  };

  return {
    wallet,
    handleConnect
  };
}