import React, { useState } from 'react';
import { User } from 'lucide-react';
import { WalletList } from './WalletList';
import { useWalletStore } from '../../stores/walletStore';

export function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const { wallets, connecting, error, connectWallet, disconnectWallet, clearError } = useWalletStore();

  const handleConnect = async () => {
    clearError();
    await connectWallet();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
      >
        <User className="w-5 h-5 dark:text-white" />
      </button>

      {isOpen && (
        <WalletList
          wallets={wallets}
          connecting={connecting}
          error={error}
          onConnect={handleConnect}
          onDisconnect={disconnectWallet}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}