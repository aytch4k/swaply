import React from 'react';
import { Tooltip } from '../common/Tooltip';
import { useWalletNetwork } from '../../hooks/useWalletNetwork';

export function WalletTooltip({ children }: { children: React.ReactNode }) {
  const { selectedNetwork } = useWalletNetwork();
  const network = selectedNetwork?.type || 'evm';

  const getWalletInfo = () => {
    switch (network) {
      case 'solana':
        return {
          name: 'Phantom',
          url: 'https://phantom.app/download',
          description: 'For Solana and other Solana-based tokens'
        };
      case 'xrp':
        return {
          name: 'Xaman (XUMM)',
          url: 'https://xaman.app/download',
          description: 'For XRP Ledger transactions'
        };
      default:
        return {
          name: 'MetaMask',
          url: 'https://metamask.io/download/',
          description: 'For Ethereum and other EVM chains'
        };
    }
  };

  const walletInfo = getWalletInfo();

  return (
    <Tooltip
      content={
        <div className="space-y-3">
          <p className="font-medium text-gray-900 dark:text-white">No wallet detected!</p>
          <div className="space-y-2">
            <p>To use this network, please install:</p>
            <a
              href={walletInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <p className="font-medium">{walletInfo.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {walletInfo.description}
              </p>
            </a>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            After installation, refresh this page to connect your wallet.
          </p>
        </div>
      }
    >
      {children}
    </Tooltip>
  );
}