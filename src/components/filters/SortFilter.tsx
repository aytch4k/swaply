import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import type { SortOption } from '../../types';

interface SortFilterProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
}

export function SortFilter({ value, onChange }: SortFilterProps) {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
      onClick={() => onChange(value === 'price_asc' ? 'price_desc' : 'price_asc')}
    >
      <ArrowUpDown size={16} />
      {value === 'price_asc' ? 'Price: Low to High' : 'Price: High to Low'}
    </button>
  );
}