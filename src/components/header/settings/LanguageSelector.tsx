import React from 'react';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../../config/languages';

interface LanguageSelectorProps {
  value: string;
  onChange: (language: string) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === value);

  return (
    <div className="px-4 py-2">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Globe className="w-4 h-4" />
        <span>Language</span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {SUPPORTED_LANGUAGES.map((language) => (
          <button
            key={language.code}
            onClick={() => onChange(language.code)}
            className={`px-3 py-2 text-sm rounded-md text-left flex items-center gap-2
              ${value === language.code 
                ? 'bg-blue-50 text-blue-600' 
                : 'hover:bg-gray-50'}`}
          >
            <span className="font-medium">{language.nativeName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}