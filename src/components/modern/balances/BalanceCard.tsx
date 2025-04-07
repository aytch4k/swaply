import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface BalanceCardProps {
  icon: LucideIcon;
  title: string;
  tokenAmount: string;
  fiatAmount: string;
  onClick: () => void;
  mainBalance?: boolean;
}

export function BalanceCard({ 
  icon: Icon, 
  title, 
  tokenAmount, 
  fiatAmount, 
  onClick,
  mainBalance = false
}: BalanceCardProps) {
  return (
    <button 
      onClick={onClick}
      className={`group relative w-full text-left ${
        mainBalance ? 'bg-gradient-to-br from-gray-100 to-gray-50' : 'bg-white'
      } rounded-xl p-4 transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-full ${
          mainBalance 
            ? 'bg-gradient-to-br from-gray-200 to-gray-300' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200'
        }`}>
          <Icon className="w-5 h-5 text-gray-700" />
        </div>
        <span className="text-sm font-medium text-gray-600">{title}</span>
      </div>
      
      <div className="space-y-1">
        <p className={`font-mono ${
          mainBalance ? 'text-xl font-semibold' : 'text-lg'
        } text-gray-900`}>
          {tokenAmount}
        </p>
        <p className="text-sm text-gray-500">{fiatAmount}</p>
      </div>
      
      <div className="absolute inset-0 border border-gray-200 rounded-xl transition-opacity opacity-0 group-hover:opacity-100" />
    </button>
  );
}