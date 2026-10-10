import React from 'react';
import { Compass, Sparkles, BookOpen, Clock, Info, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenDocModal: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenDocModal,
  historyCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNav = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F1E8]/90 backdrop-blur-md border-b border-[#23483D]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNav('landing')}
          className="flex items-center gap-2.5 text-left text-[#23483D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9785B] rounded-lg p-1 -ml-1 transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-[#23483D] flex items-center justify-center text-[#F5F1E8] shadow-sm">
            <Compass className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-['Outfit'] font-extrabold text-xl tracking-tight leading-none text-[#23483D]">
              GullyGames
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#23483D]/80">
          <button
            onClick={() => handleNav('setup')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-[#23483D] border-b-2 ${
              currentView === 'setup' ? 'border-[#E9785B] text-[#23483D] font-semibold' : 'border-transparent'
            }`}
          >
            Create Game
          </button>
          <button
            onClick={() => handleNav('samples')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-[#23483D] border-b-2 ${
              currentView === 'samples' ? 'border-[#E9785B] text-[#23483D] font-semibold' : 'border-transparent'
            }`}
          >
            Sample Bank
          </button>
          <button
            onClick={() => handleNav('history')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-[#23483D] border-b-2 ${
              currentView === 'history' ? 'border-[#E9785B] text-[#23483D] font-semibold' : 'border-transparent'
            }`}
          >
            History {historyCount > 0 && `(${historyCount})`}
          </button>
          <button
            onClick={onOpenDocModal}
            className="whitespace-nowrap shrink-0 transition-colors py-1 hover:text-[#23483D] border-b-2 border-transparent text-[#23483D]/70 flex items-center gap-1.5"
          >
            <span>Open-Source AI</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Mobile Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNav('setup')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#F5F1E8] bg-[#23483D] hover:bg-[#19342C] rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#E9785B]" />
            <span>Make a Game</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#23483D] hover:bg-[#23483D]/5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9785B]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#23483D]/10 bg-[#F5F1E8] px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => handleNav('landing')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#23483D] hover:bg-[#23483D]/5 flex items-center gap-3"
          >
            <Compass className="w-4 h-4 text-[#E9785B]" />
            Home
          </button>
          <button
            onClick={() => handleNav('setup')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#23483D] hover:bg-[#23483D]/5 flex items-center gap-3"
          >
            <Sparkles className="w-4 h-4 text-[#E9785B]" />
            Create Game
          </button>
          <button
            onClick={() => handleNav('samples')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#23483D] hover:bg-[#23483D]/5 flex items-center gap-3"
          >
            <BookOpen className="w-4 h-4 text-[#E9785B]" />
            Sample Activities Bank
          </button>
          <button
            onClick={() => handleNav('history')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#23483D] hover:bg-[#23483D]/5 flex items-center gap-3"
          >
            <Clock className="w-4 h-4 text-[#E9785B]" />
            Session History {historyCount > 0 && `(${historyCount})`}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDocModal();
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#23483D] hover:bg-[#23483D]/5 flex items-center gap-3"
          >
            <Info className="w-4 h-4 text-[#E9785B]" />
            Gemma AI & Open-Source Docs
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNav('setup')}
              className="w-full py-3 text-center text-sm font-semibold text-[#F5F1E8] bg-[#23483D] hover:bg-[#19342C] rounded-xl shadow-sm"
            >
              Make a Game Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
