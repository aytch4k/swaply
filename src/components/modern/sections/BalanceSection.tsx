import React from 'react';
import { WalletBalance } from '../balances/WalletBalance';
import { ChangeBalance } from '../balances/ChangeBalance';

export function BalanceSection() {
  return (
    <div className="relative p-6">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl blur opacity-75"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <WalletBalance />
          <ChangeBalance />
        </div>
      </div>
    </div>
  );
}