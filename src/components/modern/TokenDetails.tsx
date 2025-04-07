import React from 'react';
import { TrendingUp, Activity, DollarSign } from 'lucide-react';

export function TokenDetails() {
  return (
    <div className="p-6">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl blur opacity-75"></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full blur opacity-75"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">E</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ethereum</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">ETH</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$2,845.32</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-end gap-1">
                <TrendingUp className="w-4 h-4" />
                +2.45%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg blur opacity-50"></div>
              <div className="relative p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-600/50">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm">24h Volume</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">$1.2B</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg blur opacity-50"></div>
              <div className="relative p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-600/50">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Liquidity</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">$890.5M</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}