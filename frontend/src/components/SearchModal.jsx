import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

const SearchModal = ({ isOpen, onClose }) => {
  const searchRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-950/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="Search container fixed bottom-0 w-full transform sm:bottom-auto sm:left-1/2 sm:top-20 sm:max-w-3xl sm:-translate-x-1/2">
        <div className="mx-auto my-0 rounded-lg border border-gray-800 bg-slate-800 shadow-2xl">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search expenses..."
              className="w-full rounded-t-lg border-b border-gray-800 bg-transparent py-3 pl-11 pr-4 text-gray-100 outline-none"
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-400"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="Search-Result max-h-96 overflow-y-auto rounded-b-lg border-t border-slate-600 py-4">
            {/* Add your search results here */}
          </div>
          <footer className="Footer flex items-center justify-end rounded-b-lg border-t border-slate-600 bg-slate-800 px-4 py-2">
            <div className="Footer-Logo">
              <BookOpenIcon className="h-5 w-5 text-gray-500" />
            </div>
            <div className="Footer-Text ml-2 text-sm text-gray-500">
              Find your expenses
            </div>
          </footer>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;
