import React, { useState, useEffect } from 'react';
import { ArrowUpDown, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import type { SearchResult } from '../types';
import type { DecimalPlaces } from '../types/filters';
import { formatTokenPrice } from '../utils/formatters';
import { useCurrency } from '../hooks/useCurrency';

interface TokenCardProps {
  result: SearchResult;
  decimalPlaces: DecimalPlaces;
  onBuy: () => void;
  onSell: () => void;
  onSwap: () => void;
}

export function TokenCard({ result, decimalPlaces, onBuy, onSell, onSwap }: TokenCardProps) {
  const { token, price, priceChange24h, volume24h } = result;
  const [isLoading, setIsLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<'buy' | 'sell' | 'swap' | null>(null);
  const { formatPrice } = useCurrency();
  const [formattedPrice, setFormattedPrice] = useState('$0.00');
  const [formattedVolume, setFormattedVolume] = useState('$0.00');

  useEffect(() => {
    let mounted = true;

    async function updatePrices() {
      try {
        const formattedPriceValue = await formatPrice(Number(formatTokenPrice(price, decimalPlaces)));
        const formattedVolumeValue = await formatPrice(volume24h);
        
        if (mounted) {
          setFormattedPrice(formattedPriceValue);
          setFormattedVolume(formattedVolumeValue);
        }
      } catch (error) {
        console.error('Error formatting prices:', error);
      }
    }

    updatePrices();

    return () => {
      mounted = false;
    };
  }, [price, volume24h, decimalPlaces, formatPrice]);

  const handleAction = async (action: 'buy' | 'sell' | 'swap') => {
    setIsLoading(true);
    setActiveAction(action);
    
    try {
      switch (action) {
        case 'buy':
          await onBuy();
          break;
        case 'sell':
          await onSell();
          break;
        case 'swap':
          await onSwap();
          break;
      }
    } finally {
      setIsLoading(false);
      setActiveAction(null);
    }
  };

  return (
    <div className="group w-full p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          {token.logoURI ? (
            <img
              src={token.logoURI}
              alt={token.name}
              className="w-12 h-12 rounded-full shadow-md group-hover:shadow-lg transition-shadow"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-400 dark:text-gray-500">
                {token.symbol.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{token.chainId}</span>
          </div>
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg dark:text-white">{token.name}</h3>
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400">
              {token.symbol}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-mono">
            {`${token.address.slice(0, 6)}...${token.address.slice(-4)}`}
          </p>
        </div>

        <div className="text-right">
          <p className="font-medium text-lg dark:text-white">{formattedPrice}</p>
          <p className={`flex items-center gap-1 text-sm justify-end
            ${priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {priceChange24h >= 0 ? (
              <TrendingUp size={16} className="animate-pulse" />
            ) : (
              <TrendingDown size={16} className="animate-pulse" />
            )}
            {Math.abs(priceChange24h).toFixed(2)}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Vol: {formattedVolume}</p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={() => handleAction('buy')}
          disabled={isLoading}
          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-200
            ${activeAction === 'buy'
              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
              : 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
            } disabled:opacity-50 disabled:cursor-not-allowed
            transform active:scale-95`}
        >
          {isLoading && activeAction === 'buy' ? (
            <Loader2 className="animate-spin mx-auto" size={20} />
          ) : 'Buy'}
        </button>
        
        <button
          onClick={() => handleAction('sell')}
          disabled={isLoading}
          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-200
            ${activeAction === 'sell'
              ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
              : 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
            } disabled:opacity-50 disabled:cursor-not-allowed
            transform active:scale-95`}
        >
          {isLoading && activeAction === 'sell' ? (
            <Loader2 className="animate-spin mx-auto" size={20} />
          ) : 'Sell'}
        </button>
        
        <button
          onClick={() => handleAction('swap')}
          disabled={isLoading}
          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-200
            ${activeAction === 'swap'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
              : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
            } disabled:opacity-50 disabled:cursor-not-allowed
            transform active:scale-95`}
        >
          {isLoading && activeAction === 'swap' ? (
            <Loader2 className="animate-spin mx-auto" size={20} />
          ) : (
            <div className="flex items-center justify-center gap-1.5">
              <ArrowUpDown size={16} />
              <span>Swap</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}