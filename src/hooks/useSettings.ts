import { useState, useEffect } from 'react';
import type { Settings } from '../types/settings';
import { SUPPORTED_LANGUAGES } from '../config/languages';

const STORAGE_KEY = 'app_settings';

const defaultSettings: Settings = {
  theme: 'light',
  currency: 'USD',
  language: 'en'
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  // Apply theme and direction changes
  useEffect(() => {
    // Theme
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(settings.theme);
    
    // RTL/LTR
    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === settings.language);
    if (language) {
      document.documentElement.dir = language.direction;
    }
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (key: keyof Settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return {
    ...settings,
    updateSettings
  };
}