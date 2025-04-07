import React, { useState, useRef, useEffect } from 'react';
import { Settings2 } from 'lucide-react';
import { SettingsMenu } from './SettingsMenu';
import { useSettings } from '../../hooks/useSettings';

export function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, currency, language, updateSettings } = useSettings();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
      >
        <Settings2 
          className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300 dark:text-white" 
        />
      </button>

      {isOpen && (
        <SettingsMenu
          settings={{ theme, currency, language }}
          onUpdate={updateSettings}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}