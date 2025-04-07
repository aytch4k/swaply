import React from 'react';
import { Wallet, Loader2 } from 'lucide-react';
import { useWalletStore } from '../../stores/walletStore';

export function WalletButton() {
  const { wallets, connecting, error, connectWallet, clearError } = useWalletStore();

  const handleClick = async () => {
    clearError();
    await connectWallet();
  };

  return (
    <button
      onClick={handleClick}
      disabled={connecting}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
        bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50
        disabled:cursor-not-allowed transition-colors relative group"
    >
      {connecting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Wallet className="w-4 h-4" />
      )}
      <span>
        {wallets.length > 0 
          ? `${wallets.length} Wallet${wallets.length > 1 ? 's' : ''}`
          : 'Connect Wallet'
        }
      </span>
      
      {error && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2
          text-xs text-red-500 bg-white border border-red-100 rounded-lg shadow-lg
          opacity-0 group-hover:opacity-100 transition-opacity">
          {error}
        </div>
      )}
    </button>
  );
}