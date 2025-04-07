import React from 'react';
import { ArrowLeftRight, TrendingUp } from 'lucide-react';
import { ActionButton } from './buttons/ActionButton';

export function ActionButtons() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <ActionButton icon={TrendingUp} label="Buy" />
      <ActionButton icon={TrendingUp} label="Sell" iconRotate={180} />
      <ActionButton icon={ArrowLeftRight} label="Swap" />
    </div>
  );
}