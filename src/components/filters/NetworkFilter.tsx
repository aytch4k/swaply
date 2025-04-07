import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import type { Network } from '../../types';

interface NetworkFilterProps {
  value: Network | null;
  onChange: (network: Network | null) => void;
}

const NETWORKS: Network[] = [
  { id: 'ethereum', name: 'Ethereum', chainId: 1 },
  { id: 'base', name: 'Base', chainId: 8453 },
  { id: 'solana', name: 'Solana', chainId: -1 },
  { id: 'cardano', name: 'Cardano', chainId: -2 },
  { id: 'xrp', name: 'XRP', chainId: -3 },
];

export function NetworkFilter({ value, onChange }: NetworkFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <SlidersHorizontal size={16} />
        {value ? value.name : 'All Networks'}
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">
          <button
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
              !value ? 'bg-blue-50 text-blue-600' : ''
            }`}
            onClick={() => {
              onChange(null);
              setIsOpen(false);
            }}
          >
            All Networks
          </button>
          {NETWORKS.map((network) => (
            <button
              key={network.id}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                value?.id === network.id ? 'bg-blue-50 text-blue-600' : ''
              }`}
              onClick={() => {
                onChange(network);
                setIsOpen(false);
              }}
            >
              {network.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}