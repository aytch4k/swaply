import React from 'react';
import { DollarSign, TrendingUp, Droplet } from 'lucide-react';
import { MarketMetric } from './MarketMetric';

export function MarketAnalytics() {
  return (
    <div className="relative p-6">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl blur opacity-75"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
          <MarketMetric
            icon={DollarSign}
            label="Current Price"
            value="$2,845.32"
            subValue="per ETH"
          />
          <MarketMetric
            icon={TrendingUp}
            label="24h Change"
            value="+3.5%"
            trend="up"
            subValue="$96.32"
          />
          <MarketMetric
            icon={Droplet}
            label="Liquidity"
            value="$890.5M"
            subValue="500 ETH"
          />
        </div>
      </div>
    </div>
  );
}