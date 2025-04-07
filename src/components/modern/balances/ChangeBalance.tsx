import React from 'react';
import { Coins } from 'lucide-react';
import { BalanceCard } from './BalanceCard';

export function ChangeBalance() {
  return (
    <BalanceCard
      icon={Coins}
      title="Available Change"
      tokenAmount="150 USDC"
      fiatAmount="$150.00 USD"
      onClick={() => console.log('Redirect to swap')}
    />
  );
}