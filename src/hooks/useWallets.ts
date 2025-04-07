import { useState } from 'react';
import type { Wallet } from '../types/wallet';

export function useWallets() {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const connectWallet = async () => {
    // TODO: Implement wallet connection logic
    console.log('Connecting wallet...');
  };

  const disconnectWallet = (address: string) => {
    setWallets(prev => prev.filter(w => w.address !== address));
  };

  return {
    wallets,
    connectWallet,
    disconnectWallet
  };
}