import React from 'react';
import { ActionButtons } from '../modern/ActionButtons';
import { MarketAnalytics } from '../modern/analytics/MarketAnalytics';
import { TokenDetails } from '../modern/TokenDetails';
import { BalanceSection } from '../modern/sections/BalanceSection';
import { SearchResults } from '../SearchResults';

export function ModernLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Action Buttons */}
          <div className="p-0.5 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <ActionButtons />
            </div>
          </div>

          {/* Market Analytics and Details */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl blur-sm"></div>
            <div className="relative bg-white/95 dark:bg-gray-800/95 rounded-xl shadow-xl backdrop-blur-sm">
              <MarketAnalytics />
              <TokenDetails />
              <BalanceSection />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="inline-block px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Prices are updated in real time. Trading involves risk.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}