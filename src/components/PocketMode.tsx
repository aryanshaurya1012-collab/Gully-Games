import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Plus, 
  PhoneOff, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  CheckCircle2, 
  ArrowLeft,
  TreePine,
  Sparkles
} from 'lucide-react';
import { GameActivity, GameStep } from '../types/game.js';
import { playStepChime } from '../utils/audio.js';

interface PocketModeProps {
  activity: GameActivity;
  onFinishGame: () => void;
  onExitPocketMode: () => void;
}

export const PocketMode: React.FC<PocketModeProps> = ({
  activity,
  onFinishGame,
  onExitPocketMode
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep: GameStep = activity.steps[currentStepIndex] || activity.steps[0];
  
  // Seconds remaining for current step
  const [secondsRemaining, setSecondsRemaining] = useState(currentStep.durationMinutes * 60);
  const [totalStepSeconds, setTotalStepSeconds] = useState(currentStep.durationMinutes * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pocketDimmerActive, setPocketDimmerActive] = useState(false);

  // Sync timer when step changes
  useEffect(() => {
    const stepSeconds = currentStep.durationMinutes * 60;
    setTotalStepSeconds(stepSeconds);
    setSecondsRemaining(stepSeconds);
    setIsRunning(true);
  }, [currentStepIndex, currentStep]);

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      // Step ended
      if (soundEnabled) {
        playStepChime();
      }
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining, soundEnabled]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleNextStep = () => {
    if (currentStepIndex < activity.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onFinishGame();
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const addExtraMinute = () => {
    setSecondsRemaining((prev) => prev + 60);
    setTotalStepSeconds((prev) => prev + 60);
    if (!isRunning) setIsRunning(true);
  };

  // Format MM:SS
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  // Progress percentage
  const progressPercent = totalStepSeconds > 0 
    ? Math.max(0, Math.min(100, ((totalStepSeconds - secondsRemaining) / totalStepSeconds) * 100))
    : 100;

  // Pocket Dimmer View (Black / ultra-dim calm screen for putting phone in pocket)
  if (pocketDimmerActive) {
    return (
      <div 
        onClick={() => setPocketDimmerActive(false)}
        className="fixed inset-0 z-50 bg-[#121E1A] text-[#F5F1E8]/70 flex flex-col items-center justify-between p-8 select-none cursor-pointer"
      >
        <div className="pt-6 text-center">
          <PhoneOff className="w-8 h-8 text-[#E9785B] mx-auto mb-2 opacity-80" />
          <p className="text-xs font-mono uppercase tracking-widest text-[#F5F1E8]/50">
            Pocket Lock Active
          </p>
        </div>

        {/* Minimal Central Display */}
        <div className="text-center space-y-4">
          <div className="font-['Outfit'] font-black text-6xl tracking-tight font-mono text-[#F5F1E8]">
            {timeFormatted}
          </div>
          <p className="text-sm text-[#F5F1E8]/60 font-medium">
            Stage {currentStepIndex + 1} of 3: {currentStep.title}
          </p>
          <div className="w-16 h-1 bg-[#23483D] rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-[#E9785B] transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="pb-8 text-center text-xs text-[#F5F1E8]/40 animate-pulse">
          Tap anywhere to unlock screen
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 pb-24 space-y-6">
      
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between border-b border-[#23483D]/10 pb-3">
        <button
          onClick={onExitPocketMode}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#23483D]/70 hover:text-[#23483D] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Briefing</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-white border border-[#23483D]/10 text-[#23483D] hover:bg-[#FAF8F2] transition-colors"
            title={soundEnabled ? 'Mute chime' : 'Enable chime'}
            aria-label="Toggle chime sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#23483D]" /> : <VolumeX className="w-4 h-4 text-[#23483D]/40" />}
          </button>

          {/* Pocket Dimmer Mode Button */}
          <button
            onClick={() => setPocketDimmerActive(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#23483D] bg-white border border-[#23483D]/15 rounded-lg hover:bg-[#FAF8F2] transition-colors cursor-pointer"
            title="Dim screen to put in pocket"
          >
            <Moon className="w-3.5 h-3.5 text-[#E9785B]" />
            <span>Pocket Lock</span>
          </button>
        </div>
      </div>

      {/* Prominent Distraction-Free Advisory Banner */}
      <div className="bg-[#23483D] text-[#F5F1E8] rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <PhoneOff className="w-5 h-5 text-[#E9785B]" />
          </div>
          <div>
            <div className="font-['Outfit'] font-bold text-sm">
              Phone in your pocket!
            </div>
            <div className="text-xs text-[#F5F1E8]/70">
              Eyes up on your friends and the outdoor space.
            </div>
          </div>
        </div>

        <button
          onClick={() => setPocketDimmerActive(true)}
          className="text-xs font-semibold px-3 py-1.5 bg-[#E9785B] hover:bg-[#D66347] text-white rounded-lg transition-colors shrink-0 cursor-pointer"
        >
          Dim Screen
        </button>
      </div>

      {/* Main Pocket Mode Card */}
      <div className="bg-[#FAF8F2] border border-[#23483D]/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md text-center">
        
        {/* Stage progress dots */}
        <div className="flex items-center justify-center gap-2">
          {activity.steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentStepIndex
                  ? 'w-10 bg-[#E9785B]'
                  : idx < currentStepIndex
                  ? 'w-4 bg-[#23483D]'
                  : 'w-4 bg-[#23483D]/20'
              }`}
            />
          ))}
        </div>

        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#23483D]/60">
          Stage {currentStepIndex + 1} of 3
        </div>

        {/* Step Title */}
        <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-[#23483D] tracking-tight">
          {currentStep.title}
        </h2>

        {/* Big Circular / High-Visibility Timer Display */}
        <div className="py-2">
          <div className="inline-flex flex-col items-center justify-center w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white border-4 border-[#23483D]/10 shadow-inner relative mx-auto">
            <span className="font-['Outfit'] font-black text-4xl sm:text-5xl font-mono text-[#23483D] tracking-tight tabular-nums">
              {timeFormatted}
            </span>
            <span className="text-xs font-sans text-[#23483D]/50 font-medium mt-1">
              {secondsRemaining === 0 ? 'Stage complete!' : isRunning ? 'In play...' : 'Paused'}
            </span>
            
            {/* Subtle progress ring */}
            <div 
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#E9785B] pointer-events-none transition-all duration-1000"
              style={{ transform: `rotate(${(progressPercent / 100) * 360}deg)` }}
            />
          </div>
        </div>

        {/* Active Instruction */}
        <div className="bg-white border border-[#23483D]/10 rounded-2xl p-5 text-left space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#23483D]/60">
            Instruction
          </div>
          <p className="text-base text-[#23483D] font-medium leading-relaxed">
            {currentStep.instruction}
          </p>

          {currentStep.pocketTip && (
            <div className="pt-2 border-t border-[#23483D]/10 flex items-start gap-2 text-xs text-[#23483D]/80">
              <span className="font-semibold text-[#E9785B]">Tip:</span>
              <span>{currentStep.pocketTip}</span>
            </div>
          )}
        </div>

        {/* Timer Control Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          
          <button
            onClick={handlePreviousStep}
            disabled={currentStepIndex === 0}
            className={`p-3 rounded-xl border border-[#23483D]/15 text-[#23483D] transition-colors ${
              currentStepIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white cursor-pointer'
            }`}
            title="Previous Stage"
            aria-label="Previous Stage"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#23483D] hover:bg-[#19342C] text-[#F5F1E8] shadow-md transition-all active:scale-[0.96] cursor-pointer"
            title={isRunning ? 'Pause Timer' : 'Resume Timer'}
            aria-label={isRunning ? 'Pause Timer' : 'Resume Timer'}
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-[#E9785B] text-[#E9785B] ml-0.5" />}
          </button>

          <button
            onClick={addExtraMinute}
            className="p-3 rounded-xl border border-[#23483D]/15 text-[#23483D] hover:bg-white transition-colors cursor-pointer"
            title="Add +1 Minute"
            aria-label="Add 1 minute"
          >
            <div className="flex items-center text-xs font-bold font-mono">
              <Plus className="w-3.5 h-3.5" />
              <span>1m</span>
            </div>
          </button>

          <button
            onClick={handleNextStep}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E9785B] hover:bg-[#D66347] text-white font-bold text-sm shadow transition-all active:scale-[0.96] cursor-pointer"
          >
            <span>{currentStepIndex < activity.steps.length - 1 ? 'Next Stage' : 'Complete Game'}</span>
            <SkipForward className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Completion Banner if Timer Finished */}
      {secondsRemaining === 0 && (
        <div className="p-4 rounded-2xl bg-white border border-[#23483D]/20 flex items-center justify-between gap-4 animate-bounce">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#23483D]" />
            <span className="text-sm font-bold text-[#23483D]">
              Time's up for Stage {currentStepIndex + 1}!
            </span>
          </div>
          <button
            onClick={handleNextStep}
            className="px-4 py-2 text-xs font-bold text-white bg-[#23483D] rounded-xl hover:bg-[#19342C] cursor-pointer"
          >
            {currentStepIndex < activity.steps.length - 1 ? 'Advance to Stage ' + (currentStepIndex + 2) : 'Wrap Up & Reflect'}
          </button>
        </div>
      )}

    </div>
  );
};
