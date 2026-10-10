import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Users, 
  Compass, 
  TreePine, 
  Filter, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { GameActivity, EnvironmentId } from '../types/game.js';

interface SampleBankViewProps {
  samples: GameActivity[];
  onSelectSample: (activity: GameActivity) => void;
  onBack: () => void;
}

export const SampleBankView: React.FC<SampleBankViewProps> = ({
  samples,
  onSelectSample,
  onBack
}) => {
  const [filterEnv, setFilterEnv] = useState<string>('all');

  const filtered = filterEnv === 'all' 
    ? samples 
    : samples.filter((s) => s.environment === filterEnv);

  const envOptions = [
    { id: 'all', label: 'All Environments' },
    { id: 'campus_lawn', label: 'Campus Green' },
    { id: 'courtyard', label: 'Courtyard / Quad' },
    { id: 'terrace', label: 'Rooftop Terrace' },
    { id: 'park', label: 'Public Park' },
    { id: 'urban_plaza', label: 'Urban Plaza' },
    { id: 'quiet_grove', label: 'Shaded Grove' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-8">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#23483D]/10 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#23483D]/80 hover:text-[#23483D] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="text-xs text-[#23483D]/60 font-mono">
          {samples.length} Curated Micro-Games
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#23483D] tracking-tight">
          Curated Sample Activities Bank
        </h1>
        <p className="text-sm sm:text-base text-[#23483D]/75 leading-relaxed max-w-2xl">
          Pre-tested zero-equipment games ready to play offline or when AI endpoints are quiet. Designed for real physical presence.
        </p>
      </div>

      {/* Filter Tabs (Interactive filter buttons) */}
      <div className="flex flex-wrap items-center gap-2">
        {envOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setFilterEnv(opt.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterEnv === opt.id
                ? 'bg-[#23483D] text-[#F5F1E8] shadow-sm'
                : 'bg-white text-[#23483D]/70 border border-[#23483D]/10 hover:bg-[#FAF8F2]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((activity) => (
          <div
            key={activity.id}
            className="bg-[#FAF8F2] border border-[#23483D]/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#23483D]/25 transition-all shadow-sm hover:shadow group"
          >
            <div className="space-y-3">
              {/* Metadata */}
              <div className="flex items-center gap-2 text-xs text-[#23483D]/70 font-medium">
                <span className="capitalize">{activity.environment.replace('_', ' ')}</span>
                <span aria-hidden="true">·</span>
                <span>{activity.durationMinutes} min</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize">{activity.mood}</span>
              </div>

              <h3 className="font-['Outfit'] font-bold text-xl text-[#23483D] group-hover:text-[#19342C]">
                {activity.title}
              </h3>

              <p className="text-xs text-[#E9785B] font-semibold">
                {activity.tagline}
              </p>

              <p className="text-sm text-[#23483D]/75 leading-relaxed">
                {activity.premise}
              </p>

              {/* Steps overview */}
              <div className="pt-2 space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#23483D]/50 font-mono">
                  3 Timed Stages
                </div>
                {activity.steps.map((st) => (
                  <div key={st.stepNumber} className="text-xs text-[#23483D]/80 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#23483D]/10 text-[#23483D] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {st.stepNumber}
                    </span>
                    <span className="truncate">{st.title} ({st.durationMinutes}m)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#23483D]/10 flex items-center justify-between">
              <span className="text-[11px] text-[#23483D]/60 font-mono">
                Sample Mode
              </span>

              <button
                onClick={() => onSelectSample(activity)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#F5F1E8] bg-[#23483D] hover:bg-[#19342C] rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-[#E9785B] text-[#E9785B]" />
                <span>Play Game</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
