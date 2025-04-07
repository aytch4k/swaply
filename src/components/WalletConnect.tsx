import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletConnectProps {
  onConnect: () => void;
  isConnected: boolean;
  address?: string;
}

export function WalletConnect({ onConnect, isConnected, address }: WalletConnectProps) {
  return (
    <button
      onClick={onConnect}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
    >
      <Wallet size={20} />
      <span>
        {isConnected
          ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
          : 'Connect Wallet'}
      </span>
    </button>
  );
}