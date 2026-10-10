import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Trash2, 
  Calendar, 
  Clock, 
  Star, 
  Sparkles, 
  TreePine, 
  Share2, 
  Compass,
  AlertTriangle
} from 'lucide-react';
import { GameReflection } from '../types/game.js';
import { getSessionHistory, deleteSessionFromHistory, clearAllHistory } from '../utils/storage.js';

interface HistoryViewProps {
  onBack: () => void;
  onMakeGame: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  onBack,
  onMakeGame
}) => {
  const [history, setHistory] = useState<GameReflection[]>(getSessionHistory());
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    deleteSessionFromHistory(id);
    setHistory(getSessionHistory());
  };

  const handleClearAll = () => {
    clearAllHistory();
    setHistory([]);
    setShowClearConfirm(false);
  };

  const handleCopySession = (session: GameReflection) => {
    const text = `GullyGames Outdoor Session: "${session.gameTitle}" (${session.durationMinutes} min in ${session.environment})\nMood: ${session.groupMood} | Rating: ${session.rating}/5 stars\nNotes: ${session.memorableMoment}${session.aiTakeaway ? `\nGemma Takeaway: "${session.aiTakeaway}"` : ''}`;
    navigator.clipboard.writeText(text);
    setCopiedId(session.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#23483D]/10 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#23483D]/80 hover:text-[#23483D] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {history.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="text-xs font-semibold text-[#E9785B] hover:text-[#D66347] flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      <div className="space-y-1">
        <h1 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#23483D] tracking-tight">
          Session History
        </h1>
        <p className="text-sm text-[#23483D]/70">
          Saved locally in your browser. All reflections and Gemma takeaways from past outdoor sessions.
        </p>
      </div>

      {/* Clear Confirmation Modal / Bar */}
      {showClearConfirm && (
        <div className="p-4 rounded-2xl bg-[#FAF0ED] border border-[#E9785B]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#23483D] font-medium">
            <AlertTriangle className="w-4 h-4 text-[#E9785B]" />
            <span>Delete all {history.length} saved sessions? This cannot be undone.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-3 py-1.5 text-xs font-semibold text-[#23483D] bg-white rounded-lg border border-[#23483D]/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleClearAll}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#E9785B] rounded-lg hover:bg-[#D66347] cursor-pointer"
            >
              Yes, Clear All
            </button>
          </div>
        </div>
      )}

      {/* History List or Empty State */}
      {history.length === 0 ? (
        <div className="bg-[#FAF8F2] border border-[#23483D]/10 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#23483D]/10 flex items-center justify-center text-[#23483D] mx-auto">
            <TreePine className="w-6 h-6 text-[#E9785B]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-['Outfit'] font-bold text-lg text-[#23483D]">
              No sessions logged yet
            </h3>
            <p className="text-xs text-[#23483D]/65">
              Head outside with friends, play a micro-game in Pocket Mode, and record your group debrief!
            </p>
          </div>
          <button
            onClick={onMakeGame}
            className="px-5 py-2.5 text-xs font-bold text-[#F5F1E8] bg-[#23483D] rounded-xl hover:bg-[#19342C] shadow transition-colors cursor-pointer"
          >
            Create Your First Game
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((session) => {
            const dateStr = new Date(session.completedAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={session.id}
                className="bg-[#FAF8F2] border border-[#23483D]/10 rounded-2xl p-5 space-y-3 shadow-sm hover:border-[#23483D]/25 transition-colors"
              >
                {/* Top strip */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-[#23483D]/60 font-mono">
                      <span>{dateStr}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{session.environment.replace('_', ' ')}</span>
                      <span aria-hidden="true">·</span>
                      <span>{session.durationMinutes} min</span>
                    </div>

                    <h3 className="font-['Outfit'] font-bold text-lg text-[#23483D]">
                      {session.gameTitle}
                    </h3>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 shrink-0">
                    {[...Array(session.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E9785B] text-[#E9785B]" />
                    ))}
                  </div>
                </div>

                {/* Vibe and participant notes */}
                <div className="space-y-2 text-xs sm:text-sm text-[#23483D]/80">
                  <div className="font-medium text-[#23483D]">
                    <span className="text-[#23483D]/60 font-normal">Group Vibe:</span> {session.groupMood}
                  </div>
                  {session.memorableMoment && (
                    <p className="bg-white p-3 rounded-xl border border-[#23483D]/10 text-xs text-[#23483D]/85 italic">
                      "{session.memorableMoment}"
                    </p>
                  )}
                </div>

                {/* AI Takeaway */}
                {session.aiTakeaway && (
                  <div className="p-3 rounded-xl bg-white border border-[#23483D]/10 flex items-start gap-2 text-xs text-[#23483D]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E9785B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Gemma Takeaway: </span>
                      <span className="italic">{session.aiTakeaway}</span>
                    </div>
                  </div>
                )}

                {/* Bottom row actions */}
                <div className="pt-2 border-t border-[#23483D]/10 flex items-center justify-between">
                  <button
                    onClick={() => handleCopySession(session)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#23483D]/70 hover:text-[#23483D] cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedId === session.id ? 'Copied to Clipboard!' : 'Share Summary'}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(session.id)}
                    className="text-xs text-[#23483D]/40 hover:text-[#E9785B] flex items-center gap-1 cursor-pointer transition-colors"
                    title="Delete session"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
