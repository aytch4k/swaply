import React, { useState } from 'react';
import { Plus, X, Loader2, HelpCircle, Wallet } from 'lucide-react';
import type { Wallet as WalletType } from '../../types/wallet';
import { WalletTooltip } from './WalletTooltip';
import { NetworkSelector } from './NetworkSelector';
import { useWalletStore } from '../../stores/walletStore';
import { SUPPORTED_NETWORKS } from '../../config/networks';
import { isWalletAvailable } from '../../services/wallet/detection';
import { WalletInstallPrompt } from '../wallet/WalletInstallPrompt';

interface WalletListProps {
  wallets: WalletType[];
  connecting: boolean;
  error: string | null;
  onConnect: () => void;
  onDisconnect: (address: string) => void;
  onClose: () => void;
}

export function WalletList({ 
  wallets, 
  connecting, 
  error, 
  onDisconnect, 
  onClose 
}: WalletListProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<number | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const { connectWallet } = useWalletStore();

  const handleConnect = async () => {
    if (!selectedNetwork) return;

    const network = SUPPORTED_NETWORKS.find(n => n.chainId === selectedNetwork);
    if (!network) return;

    if (!isWalletAvailable(network.type)) {
      setShowInstallPrompt(true);
      return;
    }

    try {
      await connectWallet(selectedNetwork);
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-dropdown" onClick={onClose} />
      <div className="fixed right-4 top-16 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-dropdown">
        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="font-medium dark:text-white">Wallets</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleConnect}
                disabled={connecting || !selectedNetwork}
                className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                  text-blue-500 dark:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {connecting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>
              <WalletTooltip>
                <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <HelpCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </WalletTooltip>
            </div>
          </div>
        </div>

        <NetworkSelector 
          selectedNetwork={selectedNetwork}
          onNetworkSelect={setSelectedNetwork}
        />

        {error && (
          <div className="px-4 py-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/30">
            {error}
          </div>
        )}

        {wallets.length === 0 ? (
          <div className="px-4 py-6 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              <Wallet className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No wallets connected</p>
            </div>
          </div>
        ) : (
          <div className="py-1">
            {wallets.map(wallet => (
              <div key={wallet.address} 
                className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-sm dark:text-white">
                      {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{wallet.chainName}</p>
                  </div>
                  <button
                    onClick={() => onDisconnect(wallet.address)}
                    className="p-1 rounded-md opacity-0 group-hover:opacity-100 
                      hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showInstallPrompt && selectedNetwork && (
        <WalletInstallPrompt
          networkType={SUPPORTED_NETWORKS.find(n => n.chainId === selectedNetwork)?.type || 'evm'}
          onClose={() => setShowInstallPrompt(false)}
        />
      )}
    </>
  );
}