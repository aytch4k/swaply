import React from 'react';
import { LayoutGrid, LayoutList } from 'lucide-react';

interface LayoutToggleProps {
  layout: 'classic' | 'modern';
  onToggle: (layout: 'classic' | 'modern') => void;
}

export function LayoutToggle({ layout, onToggle }: LayoutToggleProps) {
  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <button
        onClick={() => onToggle('classic')}
        className={`p-2 rounded-md transition-colors ${
          layout === 'classic'
            ? 'bg-white dark:bg-gray-600 text-blue-500 shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        }`}
      >
        <LayoutList className="w-4 h-4" />
      </button>
      <button
        onClick={() => onToggle('modern')}
        className={`p-2 rounded-md transition-colors ${
          layout === 'modern'
            ? 'bg-white dark:bg-gray-600 text-blue-500 shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
    </div>
  );
}