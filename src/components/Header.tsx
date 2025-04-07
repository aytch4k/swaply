import React from 'react';
import { Settings } from './header/Settings';
import { Profile } from './header/Profile';
import { LayoutToggle } from './header/LayoutToggle';
import { HeaderSearch } from './header/HeaderSearch';

interface HeaderProps {
  layout: 'classic' | 'modern';
  onLayoutChange: (layout: 'classic' | 'modern') => void;
}

export function Header({ layout, onLayoutChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold dark:text-white">Swaply</h1>
        <div className="flex-1 max-w-2xl mx-8">
          <HeaderSearch />
        </div>
        <div className="flex items-center gap-4">
          <LayoutToggle layout={layout} onToggle={onLayoutChange} />
          <Settings />
          <Profile />
        </div>
      </div>
    </header>
  );
}