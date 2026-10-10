import React from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  Play, 
  ShieldCheck, 
  PhoneOff, 
  Clock, 
  Users, 
  Compass, 
  Sparkles,
  TreePine,
  HelpCircle,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { GameActivity } from '../types/game.js';

interface ActivityBriefingProps {
  activity: GameActivity;
  onStartPocketMode: () => void;
  onRegenerate: () => void;
  onBackToSetup: () => void;
}

export const ActivityBriefing: React.FC<ActivityBriefingProps> = ({
  activity,
  onStartPocketMode,
  onRegenerate,
  onBackToSetup
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    const text = `GullyGames: "${activity.title}" (${activity.durationMinutes} min outdoor game)\n${activity.premise}\nStage 1: ${activity.steps[0]?.title}\nStage 2: ${activity.steps[1]?.title}\nStage 3: ${activity.steps[2]?.title}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-8">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-[#23483D]/10 pb-4">
        <button
          onClick={onBackToSetup}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#23483D]/80 hover:text-[#23483D] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Preferences</span>
        </button>

        {/* Source / Model Disclosure (Truthful & Transparent) */}
        <div className="text-xs text-[#23483D]/70 font-mono flex items-center gap-2">
          {activity.isSample ? (
            <span className="text-[#E9785B] font-semibold bg-[#E9785B]/10 px-2 py-0.5 rounded">
              Curated Sample Game
            </span>
          ) : (
            <span className="text-[#23483D] font-semibold flex items-center gap-1 bg-[#23483D]/10 px-2 py-0.5 rounded">
              <Sparkles className="w-3 h-3 text-[#E9785B]" />
              <span>Gemma 4 IT ({activity.modelUsed})</span>
            </span>
          )}
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-[#FAF8F2] border border-[#23483D]/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Metadata Strip (Clean unboxed text, no pills) */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs font-medium text-[#23483D]/70">
          <span className="capitalize">{activity.environment.replace('_', ' ')}</span>
          <span aria-hidden="true">·</span>
          <span>{activity.durationMinutes} minutes</span>
          <span aria-hidden="true">·</span>
          <span className="capitalize">{activity.groupSize.replace('_', ' ')}</span>
          <span aria-hidden="true">·</span>
          <span className="capitalize">{activity.mood}</span>
        </div>

        {/* Title and premise */}
        <div className="space-y-2">
          <h1 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#23483D] tracking-tight">
            {activity.title}
          </h1>
          <p className="text-sm font-semibold text-[#E9785B]">
            {activity.tagline}
          </p>
          <p className="text-base text-[#23483D]/85 leading-relaxed pt-1">
            {activity.premise}
          </p>
        </div>

        {/* Equipment & Rule Guarantee */}
        <div className="p-3.5 rounded-xl bg-white border border-[#23483D]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#23483D]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#23483D]" />
            <span className="font-semibold">Equipment Needed:</span>
            <span className="text-[#23483D]/80">Zero — only your group and natural scenery</span>
          </div>
          <div className="flex items-center gap-2 text-[#E9785B] font-semibold">
            <PhoneOff className="w-4 h-4" />
            <span>Played in Pocket Mode</span>
          </div>
        </div>

      </div>

      {/* 3 Timed Stages Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-['Outfit'] font-bold text-xl text-[#23483D]">
            The 3 Timed Stages ({activity.durationMinutes} Total Min)
          </h2>
          <span className="text-xs text-[#23483D]/60 font-mono">
            Sequential breakdown
          </span>
        </div>

        <div className="space-y-4">
          {activity.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-white border border-[#23483D]/10 rounded-2xl p-5 space-y-2 shadow-sm hover:border-[#23483D]/25 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#23483D] text-[#F5F1E8] font-bold text-xs flex items-center justify-center font-mono">
                    {step.stepNumber}
                  </div>
                  <h3 className="font-['Outfit'] font-bold text-base text-[#23483D]">
                    {step.title}
                  </h3>
                </div>

                <div className="text-xs font-mono font-semibold text-[#E9785B] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{step.durationMinutes} min</span>
                </div>
              </div>

              <p className="text-sm text-[#23483D]/80 leading-relaxed pl-10">
                {step.instruction}
              </p>

              {step.pocketTip && (
                <div className="ml-10 text-xs text-[#23483D]/70 bg-[#FAF8F2] border border-[#23483D]/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <PhoneOff className="w-3.5 h-3.5 text-[#E9785B] shrink-0" />
                  <span><strong>Pocket Tip:</strong> {step.pocketTip}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Safety & Ecological Guidelines */}
      <section className="bg-[#FAF8F2] border border-[#23483D]/15 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-[#23483D]">
          <ShieldCheck className="w-5 h-5 text-[#23483D]" />
          <h3 className="font-['Outfit'] font-bold text-sm uppercase tracking-wider">
            Safety & Outdoor Ethics
          </h3>
        </div>

        <ul className="space-y-1.5 text-xs text-[#23483D]/80">
          {activity.safetyNotes.map((note, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#E9785B] font-bold leading-none mt-0.5">•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Reflection Question Teaser */}
      <div className="p-4 rounded-2xl bg-white border border-[#23483D]/10 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-[#E9785B] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="text-xs font-bold uppercase tracking-wider text-[#23483D]">
            Closing Reflection Prompt
          </div>
          <p className="text-sm text-[#23483D]/85 italic">
            "{activity.reflectionPrompt}"
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#23483D]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onRegenerate}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-[#23483D] bg-white hover:bg-[#FAF8F2] border border-[#23483D]/15 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#E9785B]" />
            <span>Regenerate Game</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 text-xs sm:text-sm font-semibold text-[#23483D]/80 hover:text-[#23483D] bg-white border border-[#23483D]/15 rounded-xl transition-colors cursor-pointer"
            title="Copy game briefing text"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        <button
          onClick={onStartPocketMode}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-[#F5F1E8] bg-[#23483D] hover:bg-[#19342C] rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer"
        >
          <Play className="w-5 h-5 fill-[#E9785B] text-[#E9785B]" />
          <span>Start Pocket Mode</span>
        </button>
      </div>

    </div>
  );
};
