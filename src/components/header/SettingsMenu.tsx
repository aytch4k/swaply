import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { LanguageSelector } from './settings/LanguageSelector';
import { CurrencySelector } from './settings/CurrencySelector';
import type { Settings } from '../../types/settings';

interface SettingsMenuProps {
  settings: Settings;
  onUpdate: (key: keyof Settings, value: string) => void;
  onClose: () => void;
}

export function SettingsMenu({ settings, onUpdate, onClose }: SettingsMenuProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-dropdown" onClick={onClose} />
      <div className="fixed right-4 top-16 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-dropdown">
        {/* Theme Toggle */}
        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
          <button
            onClick={() => onUpdate('theme', settings.theme === 'light' ? 'dark' : 'light')}
            className="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md px-3 py-2 text-gray-700 dark:text-gray-200"
          >
            <span>Theme</span>
            <div className="flex items-center gap-2">
              {settings.theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              <span>{settings.theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
          </button>
        </div>

        {/* Currency and Language Selectors */}
        <div className="border-b border-gray-100 dark:border-gray-700">
          <CurrencySelector
            value={settings.currency}
            onChange={(value) => onUpdate('currency', value)}
          />
        </div>

        <LanguageSelector
          value={settings.language}
          onChange={(value) => onUpdate('language', value)}
        />
      </div>
    </>
  );
}