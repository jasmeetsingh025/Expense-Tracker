import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';
import {
  MagnifyingGlassIcon,
  Bars3BottomRightIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Close on Escape key press
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5 dark:border-white/10">
        <div className="bg-gray-950">
          <div className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
            <div className="flex font-mono text-2xl text-gray-400">
              Expense Tracker
            </div>
            <div className="text-white">
              <ul className="flex items-center gap-6">
                <li>
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="flex cursor-default items-center gap-2 text-sm text-gray-400"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    <span className="hidden sm:block">Search</span>
                    <span className="hidden text-xs text-gray-500 sm:block">
                      ⌘K
                    </span>
                  </button>
                </li>
                <li>Docs</li>
                <li>
                  <div className="hidden sm:block">
                    <button className="btn btn-primary">Sign In</button>
                  </div>
                </li>
                <li>
                  <div className="user-avatar">
                    {/* <img
                      className="h-10 w-10 rounded-full border-2 border-white/50 bg-cover bg-center shadow-inner"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
                      alt="This is user Profile photo"
                    /> */}
                    <UserIcon className="h-8 w-8 rounded-full" />
                  </div>
                </li>
                <li>
                  <div className="Sandwich-btn sm:hidden">
                    <Bars3BottomRightIcon className="h-6 w-6 cursor-pointer text-gray-400" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

export default Navbar;
