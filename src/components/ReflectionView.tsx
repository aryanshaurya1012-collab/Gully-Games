import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Smile, 
  Star, 
  MessageSquare, 
  Clock, 
  Compass, 
  TreePine,
  RotateCcw
} from 'lucide-react';
import { GameActivity, GameReflection } from '../types/game.js';
import { saveSessionToHistory } from '../utils/storage.js';

interface ReflectionViewProps {
  activity: GameActivity;
  onFinishAndGoHome: () => void;
  onViewHistory: () => void;
}

export const ReflectionView: React.FC<ReflectionViewProps> = ({
  activity,
  onFinishAndGoHome,
  onViewHistory
}) => {
  const [rating, setRating] = useState(5);
  const [groupMood, setGroupMood] = useState('Connected & Energized');
  const [playerNotes, setPlayerNotes] = useState('');
  
  const [aiTakeaway, setAiTakeaway] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const moodChoices = [
    'Connected & Energized',
    'Grounded & Calm',
    'Playful & Laughing',
    'Surprised & Curious',
    'Peaceful'
  ];

  const handleSummarizeWithGemma = async () => {
    if (!playerNotes.trim()) {
      setSummaryError('Please type a quick note or impression before synthesizing.');
      return;
    }

    setIsSummarizing(true);
    setSummaryError(null);

    try {
      const response = await fetch('/api/summarize-reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameTitle: activity.title,
          userNotes: playerNotes,
          groupMood,
          rating
        })
      });

      const data = await response.json();
      if (data.success && data.takeaway) {
        setAiTakeaway(data.takeaway);
      } else {
        setSummaryError(data.error || 'Could not reach Gemma summarizer.');
      }
    } catch (err: any) {
      setSummaryError(`Network error: ${err.message || 'Server unreachable'}`);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSave = () => {
    const reflection: GameReflection = {
      id: `session-${Date.now()}`,
      gameId: activity.id,
      gameTitle: activity.title,
      environment: activity.environment,
      durationMinutes: activity.durationMinutes,
      completedAt: new Date().toISOString(),
      rating,
      groupMood,
      memorableMoment: playerNotes || 'A refreshing moment outdoors together.',
      aiTakeaway: aiTakeaway || undefined
    };

    saveSessionToHistory(reflection);
    setSavedSuccess(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E9785B] uppercase tracking-wider">
          <TreePine className="w-4 h-4" />
          <span>Game Complete</span>
        </div>
        <h1 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#23483D] tracking-tight">
          Group Reflection
        </h1>
        <p className="text-sm text-[#23483D]/70 max-w-md mx-auto">
          Take 60 seconds with your friends to acknowledge stepping out into the real world.
        </p>
      </div>

      {/* Guided Reflection Card */}
      <div className="bg-[#FAF8F2] border border-[#23483D]/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Reflection prompt from the game */}
        <div className="p-4 rounded-2xl bg-white border border-[#23483D]/10 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#E9785B]">
            Debrief Prompt
          </span>
          <p className="text-sm font-semibold text-[#23483D] italic">
            "{activity.reflectionPrompt}"
          </p>
        </div>

        {/* 1. Rating */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#23483D]">
            How did this micro-game feel for your group?
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-2 rounded-xl hover:bg-white transition-colors cursor-pointer"
                title={`${star} stars`}
              >
                <Star
                  className={`w-7 h-7 ${
                    star <= rating
                      ? 'fill-[#E9785B] text-[#E9785B]'
                      : 'text-[#23483D]/20 hover:text-[#23483D]/40'
                  }`}
                />
              </button>
            ))}
            <span className="text-xs font-semibold text-[#23483D]/60 ml-2">
              {rating === 5 && 'Energizing & fun!'}
              {rating === 4 && 'Solid outdoor time'}
              {rating === 3 && 'Decent break'}
              {rating <= 2 && 'Needs improvement'}
            </span>
          </div>
        </div>

        {/* 2. Group Mood */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#23483D]">
            Group Vibe
          </label>
          <div className="flex flex-wrap gap-2">
            {moodChoices.map((m) => {
              const isSelected = groupMood === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setGroupMood(m)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#23483D] text-[#F5F1E8] border-[#23483D]'
                      : 'bg-white text-[#23483D]/80 border-[#23483D]/15 hover:bg-[#F5F1E8]'
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Notes */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#23483D]">
            Participant Memories or Impressions (Optional)
          </label>
          <textarea
            rows={3}
            value={playerNotes}
            onChange={(e) => setPlayerNotes(e.target.value)}
            placeholder="e.g. Everyone laughed when Sarah found the hidden shadow under the old elm tree..."
            className="w-full text-sm p-4 rounded-2xl border border-[#23483D]/15 bg-white text-[#23483D] placeholder-[#23483D]/40 focus:outline-none focus:ring-2 focus:ring-[#E9785B]"
          />
        </div>

        {/* Gemma Synthesizer Button */}
        {playerNotes.trim().length > 0 && !aiTakeaway && (
          <div className="pt-1">
            <button
              type="button"
              onClick={handleSummarizeWithGemma}
              disabled={isSummarizing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#23483D] bg-white border border-[#23483D]/20 hover:bg-[#F5F1E8] shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E9785B]" />
              <span>{isSummarizing ? 'Synthesizing with Gemma 4...' : 'Synthesize Reflection Takeaway with Gemma'}</span>
            </button>
            {summaryError && (
              <p className="text-xs text-[#E9785B] mt-1.5">{summaryError}</p>
            )}
          </div>
        )}

        {/* Gemma Takeaway Display */}
        {aiTakeaway && (
          <div className="p-4 rounded-2xl bg-white border border-[#23483D]/15 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#23483D]">
              <Sparkles className="w-3.5 h-3.5 text-[#E9785B]" />
              <span>Gemma 4 Takeaway</span>
            </div>
            <p className="text-sm text-[#23483D]/90 italic leading-relaxed">
              "{aiTakeaway}"
            </p>
          </div>
        )}

      </div>

      {/* Confirmation Banner */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-[#23483D] text-[#F5F1E8] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-[#E9785B]" />
            <span>Saved to your local browser history!</span>
          </div>
          <button
            onClick={onViewHistory}
            className="text-xs font-semibold px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
          >
            View History
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onFinishAndGoHome}
          className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#23483D]/70 hover:text-[#23483D] cursor-pointer text-center"
        >
          Skip & Return Home
        </button>

        <div className="flex items-center gap-3">
          {!savedSuccess ? (
            <button
              type="button"
              onClick={handleSave}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-[#23483D] hover:bg-[#19342C] rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer text-center"
            >
              Save Session & Complete
            </button>
          ) : (
            <button
              type="button"
              onClick={onFinishAndGoHome}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-[#F5F1E8] bg-[#23483D] hover:bg-[#19342C] rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer text-center"
            >
              Return Home
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
