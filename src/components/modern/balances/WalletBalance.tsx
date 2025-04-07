import React from 'react';
import { Wallet } from 'lucide-react';
import { BalanceCard } from './BalanceCard';
import { useWalletStore } from '../../../stores/walletStore';

export function WalletBalance() {
  const { wallets } = useWalletStore();
  const mainWallet = wallets[0]; // Using first wallet for demo

  return (
    <BalanceCard
      icon={Wallet}
      title="Available Balance"
      tokenAmount="1.25 ETH"
      fiatAmount="$2,500.00 USD"
      onClick={() => console.log('Show wallet breakdown')}
      mainBalance
    />
  );
}