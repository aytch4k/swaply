import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface MarketMetricProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function MarketMetric({ 
  icon: Icon, 
  label, 
  value, 
  subValue,
  trend 
}: MarketMetricProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-900 dark:text-gray-100';
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-500">{label}</span>
      </div>
      <p className={`text-2xl font-bold ${getTrendColor()}`}>{value}</p>
      {subValue && (
        <p className="text-sm text-gray-500 mt-1">{subValue}</p>
      )}
    </div>
  );
}