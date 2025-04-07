import React from 'react';
import { ExternalLink, Download } from 'lucide-react';
import type { NetworkType } from '../../config/networks';

interface WalletInstallPromptProps {
  networkType: NetworkType;
  onClose: () => void;
}

export function WalletInstallPrompt({ networkType, onClose }: WalletInstallPromptProps) {
  const getWalletInfo = () => {
    switch (networkType) {
      case 'solana':
        return {
          name: 'Phantom',
          url: 'https://phantom.app/download',
          description: 'The friendly crypto wallet for Solana',
          logo: 'https://phantom.app/img/phantom-logo.svg'
        };
      case 'xrp':
        return {
          name: 'Xaman (XUMM)',
          url: 'https://xaman.app/download',
          description: 'The most popular wallet for XRPL',
          logo: 'https://cdn.prod.website-files.com/66ffb9c73bc7e83a1e0e1006/67028cc20682f3c6f7ec6161_Xaman%20Logo.svg'
        };
      default:
        return {
          name: 'MetaMask',
          url: 'https://metamask.io/download',
          description: 'The most trusted way to access web3',
          logo: 'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg'
        };
    }
  };

  const walletInfo = getWalletInfo();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Install {walletInfo.name}
          </h2>
          
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={walletInfo.logo} 
              alt={`${walletInfo.name} logo`} 
              className="w-16 h-16"
            />
            <p className="text-gray-600 dark:text-gray-300">
              {walletInfo.description}
            </p>
          </div>

          <div className="space-y-4">
            <a
              href={walletInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Download {walletInfo.name}</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
            
            <button
              onClick={onClose}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              I'll do this later
            </button>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-500 dark:text-gray-400">
          After installing, refresh this page to connect your wallet
        </div>
      </div>
    </div>
  );
}