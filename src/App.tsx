import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { HeroLanding } from './components/HeroLanding.tsx';
import { ActivitySetup } from './components/ActivitySetup.tsx';
import { ActivityBriefing } from './components/ActivityBriefing.tsx';
import { PocketMode } from './components/PocketMode.tsx';
import { ReflectionView } from './components/ReflectionView.tsx';
import { HistoryView } from './components/HistoryView.tsx';
import { SampleBankView } from './components/SampleBankView.tsx';
import { OpenSourceInfoModal } from './components/OpenSourceInfoModal.tsx';
import { GameActivity, EnvironmentId, GroupSizeId, DurationMinutes, MoodId } from './types/game.ts';
import { getSessionHistory, saveLastActivity, getLastActivity } from './utils/storage.ts';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [currentActivity, setCurrentActivity] = useState<GameActivity | null>(() => getLastActivity());
  const [samples, setSamples] = useState<GameActivity[]>([]);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [historyCount, setHistoryCount] = useState<number>(() => getSessionHistory().length);

  // Load samples from backend
  useEffect(() => {
    fetch('/api/samples')
      .then((res) => res.json())
      .then((data) => {
        if (data.activities && Array.isArray(data.activities)) {
          setSamples(data.activities);
        }
      })
      .catch((err) => {
        console.error('Failed to load sample bank:', err);
      });
  }, []);

  // Update history count when returning to screens
  const refreshHistoryCount = () => {
    setHistoryCount(getSessionHistory().length);
  };

  const handleSelectActivity = (activity: GameActivity) => {
    setCurrentActivity(activity);
    saveLastActivity(activity);
    setCurrentView('briefing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPocketMode = () => {
    if (!currentActivity) return;
    setCurrentView('pocket');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishPocketGame = () => {
    setCurrentView('reflection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishReflection = () => {
    refreshHistoryCount();
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewHistory = () => {
    refreshHistoryCount();
    setCurrentView('history');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSampleDirect = (
    env: EnvironmentId,
    _size: GroupSizeId,
    _dur: DurationMinutes,
    mood: MoodId
  ) => {
    const matched = samples.find((s) => s.environment === env || s.mood === mood) || samples[0];
    if (matched) {
      handleSelectActivity(matched);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#23483D] flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#E9785B]/20 selection:text-[#23483D]">
      
      {/* Top Bar Navigation */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          refreshHistoryCount();
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDocModal={() => setDocModalOpen(true)}
        historyCount={historyCount}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <HeroLanding
            onStartSetup={() => setCurrentView('setup')}
            onSelectSample={handleSelectActivity}
            onOpenDocModal={() => setDocModalOpen(true)}
            featuredSamples={samples}
          />
        )}

        {currentView === 'setup' && (
          <ActivitySetup
            onBack={() => setCurrentView('landing')}
            onActivityReady={handleSelectActivity}
            onSelectSampleDirect={handleSelectSampleDirect}
          />
        )}

        {currentView === 'briefing' && currentActivity && (
          <ActivityBriefing
            activity={currentActivity}
            onStartPocketMode={handleStartPocketMode}
            onRegenerate={() => setCurrentView('setup')}
            onBackToSetup={() => setCurrentView('setup')}
          />
        )}

        {currentView === 'pocket' && currentActivity && (
          <PocketMode
            activity={currentActivity}
            onFinishGame={handleFinishPocketGame}
            onExitPocketMode={() => setCurrentView('briefing')}
          />
        )}

        {currentView === 'reflection' && currentActivity && (
          <ReflectionView
            activity={currentActivity}
            onFinishAndGoHome={handleFinishReflection}
            onViewHistory={handleViewHistory}
          />
        )}

        {currentView === 'history' && (
          <HistoryView
            onBack={() => setCurrentView('landing')}
            onMakeGame={() => setCurrentView('setup')}
          />
        )}

        {currentView === 'samples' && (
          <SampleBankView
            samples={samples}
            onSelectSample={handleSelectActivity}
            onBack={() => setCurrentView('landing')}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#23483D]/10 bg-[#FAF8F2] py-8 text-xs text-[#23483D]/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-['Outfit'] font-bold text-sm text-[#23483D]">GullyGames</span>
            <span aria-hidden="true">·</span>
            <span>Hacktoberfest Open-Source AI Challenge: Week 1 — “Touch Grass”</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setDocModalOpen(true)}
              className="hover:text-[#23483D] transition-colors cursor-pointer"
            >
              Open-Weight AI & Privacy
            </button>
            <span aria-hidden="true">·</span>
            <span>Built with Gemma 4 (gemma-4-26b-a4b-it)</span>
          </div>
        </div>
      </footer>

      {/* Open-Source AI Documentation Modal */}
      <OpenSourceInfoModal
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
      />

    </div>
  );
}
