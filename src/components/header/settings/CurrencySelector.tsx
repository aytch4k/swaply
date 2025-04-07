import React from 'react';
import { DollarSign } from 'lucide-react';
import { SUPPORTED_CURRENCIES } from '../../../config/currencies';

interface CurrencySelectorProps {
  value: string;
  onChange: (currency: string) => void;
}

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  const currentCurrency = SUPPORTED_CURRENCIES.find(curr => curr.code === value);

  return (
    <div className="px-4 py-2">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <DollarSign className="w-4 h-4" />
        <span>Currency</span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {SUPPORTED_CURRENCIES.map((currency) => (
          <button
            key={currency.code}
            onClick={() => onChange(currency.code)}
            className={`px-3 py-2 text-sm rounded-md text-left flex items-center gap-2
              ${value === currency.code 
                ? 'bg-blue-50 text-blue-600' 
                : 'hover:bg-gray-50'}`}
          >
            <span className="font-medium">{currency.symbol}</span>
            <span>{currency.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
}