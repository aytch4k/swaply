import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  iconRotate?: number;
}

export function ActionButton({ icon: Icon, label, iconRotate = 0 }: ActionButtonProps) {
  return (
    <button className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
      <div className="relative flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl space-y-3 transition-all duration-200 group-hover:translate-y-[-2px]">
        <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-full group-hover:scale-110 transition-transform">
          <Icon 
            className="w-6 h-6 text-gray-700 dark:text-gray-300" 
            style={{ transform: `rotate(${iconRotate}deg)` }}
          />
        </div>
        <span className="font-medium text-gray-900 dark:text-white">{label}</span>
      </div>
    </button>
  );
}