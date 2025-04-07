import React, { useState } from 'react';
import { Hash } from 'lucide-react';
import type { DecimalPlaces } from '../../types/filters';

interface DecimalPlacesFilterProps {
  value: DecimalPlaces;
  onChange: (value: DecimalPlaces) => void;
}

const DECIMAL_OPTIONS: DecimalPlaces[] = [2, 4, 6, 8, 10];

export function DecimalPlacesFilter({ value, onChange }: DecimalPlacesFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Hash size={16} />
        <span>{value} decimals</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">
          {DECIMAL_OPTIONS.map((places) => (
            <button
              key={places}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                value === places ? 'bg-blue-50 text-blue-600' : ''
              }`}
              onClick={() => {
                onChange(places);
                setIsOpen(false);
              }}
            >
              {places} decimals
            </button>
          ))}
        </div>
      )}
    </div>
  );
}