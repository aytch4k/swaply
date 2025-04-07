import React from 'react';
import { Network } from 'lucide-react';
import { SUPPORTED_NETWORKS } from '../../config/networks';

interface NetworkSelectorProps {
  selectedNetwork: number | null;
  onNetworkSelect: (chainId: number) => void;
}

export function NetworkSelector({ selectedNetwork, onNetworkSelect }: NetworkSelectorProps) {
  // Group networks by type
  const networksByType = SUPPORTED_NETWORKS.reduce((acc, network) => {
    if (!acc[network.type]) {
      acc[network.type] = [];
    }
    acc[network.type].push(network);
    return acc;
  }, {} as Record<string, typeof SUPPORTED_NETWORKS>);

  return (
    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Network className="w-4 h-4" />
        <span>Select Network</span>
      </div>
      
      {Object.entries(networksByType).map(([type, networks]) => (
        <div key={type} className="mb-4 last:mb-0">
          <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase">
            {type === 'evm' ? 'EVM Networks' : 
             type === 'solana' ? 'Solana Ecosystem' : 
             'XRP Network'}
          </h3>
          <div className="grid grid-cols-2 gap-1">
            {networks.map((network) => (
              <button
                key={network.chainId}
                onClick={() => onNetworkSelect(network.chainId)}
                className={`px-3 py-2 text-sm rounded-md text-left flex items-center gap-2
                  ${selectedNetwork === network.chainId
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                <span className="font-medium">{network.name}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}