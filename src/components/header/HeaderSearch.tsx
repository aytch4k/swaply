import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useSearchStore } from '../../stores/searchStore';

export function HeaderSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { setSearchQuery } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = inputRef.current?.value || '';
    if (query.trim()) {
      setSearchQuery(query.trim());
    }
  };

  const handleSearchClick = () => {
    if (isExpanded && inputRef.current?.value) {
      formRef.current?.requestSubmit();
    } else {
      setIsExpanded(true);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      <form ref={formRef} onSubmit={handleSubmit} className="relative">
        <div
          className={`flex items-center transition-all duration-300 ease-in-out ${
            isExpanded ? 'w-full' : 'w-10'
          }`}
        >
          <button
            type="button"
            onClick={handleSearchClick}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              isExpanded ? 'absolute left-2 z-10' : ''
            }`}
          >
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
          
          <input
            ref={inputRef}
            type="search"
            name="search"
            placeholder="Search tokens..."
            className={`w-full py-2 pl-12 pr-10 bg-gray-100 dark:bg-gray-700 rounded-full outline-none transition-all duration-300 ${
              isExpanded
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4 pointer-events-none'
            }`}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                handleClose();
              }
            }}
          />
          
          {isExpanded && (
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}