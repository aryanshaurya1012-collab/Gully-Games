import React, { useState } from 'react';
import { 
  Trees, 
  Building2, 
  Sun, 
  MapPin, 
  Footprints, 
  Users, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  ArrowLeft,
  Check,
  Compass,
  Smile,
  Zap,
  Eye,
  Puzzle,
  Wind,
  Theater,
  Accessibility
} from 'lucide-react';
import { 
  EnvironmentId, 
  GroupSizeId, 
  DurationMinutes, 
  MoodId, 
  AccessibilitySettings,
  ActivityGenerationRequest,
  GameActivity
} from '../types/game.js';

interface ActivitySetupProps {
  onBack: () => void;
  onActivityReady: (activity: GameActivity) => void;
  onSelectSampleDirect: (env: EnvironmentId, size: GroupSizeId, dur: DurationMinutes, mood: MoodId) => void;
}

export const ActivitySetup: React.FC<ActivitySetupProps> = ({
  onBack,
  onActivityReady,
  onSelectSampleDirect
}) => {
  const [environment, setEnvironment] = useState<EnvironmentId>('campus_lawn');
  const [groupSize, setGroupSize] = useState<GroupSizeId>('small_group');
  const [duration, setDuration] = useState<DurationMinutes>(10);
  const [mood, setMood] = useState<MoodId>('icebreaker');
  
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    seatedOrLowMobility: false,
    wheelchairAccessible: false,
    quietVoice: false,
    pavedOnly: false,
    customConstraint: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fallbackSample, setFallbackSample] = useState<GameActivity | null>(null);

  // Loading step simulation
  React.useEffect(() => {
    let timer: any;
    if (isLoading) {
      setLoadingStep(0);
      timer = setInterval(() => {
        setLoadingStep((prev) => (prev < 2 ? prev + 1 : prev));
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  const handleGenerate = async (forceSampleMode = false) => {
    setIsLoading(true);
    setErrorMessage(null);
    setFallbackSample(null);

    const payload: ActivityGenerationRequest = {
      environment,
      groupSize,
      durationMinutes: duration,
      mood,
      accessibility
    };

    try {
      const response = await fetch('/api/generate-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          forceSample: forceSampleMode
        })
      });

      const data = await response.json();

      if (data.success && data.activity) {
        onActivityReady(data.activity);
      } else {
        // Gemma failed or returned error
        setErrorMessage(data.error || 'The Gemma model service is currently unavailable.');
        if (data.fallbackActivity) {
          setFallbackSample(data.fallbackActivity);
        }
      }
    } catch (err: any) {
      setErrorMessage(`Network connection error: ${err.message || 'Could not reach server'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const environments = [
    { id: 'campus_lawn' as EnvironmentId, label: 'Campus Green', desc: 'Lawns, turf, or quad fields', icon: Trees },
    { id: 'courtyard' as EnvironmentId, label: 'Inner Courtyard', desc: 'Enclosed stone/brick quads', icon: Building2 },
    { id: 'terrace' as EnvironmentId, label: 'Rooftop Terrace', desc: 'Safe overlook or patio deck', icon: Sun },
    { id: 'park' as EnvironmentId, label: 'Public Park', desc: 'Trails, clearings, or park trees', icon: MapPin },
    { id: 'urban_plaza' as EnvironmentId, label: 'Urban Plaza', desc: 'Paved walkways and pedestrian squares', icon: Footprints },
    { id: 'quiet_grove' as EnvironmentId, label: 'Shaded Grove', desc: 'Quiet canopy with dappled light', icon: Trees },
  ];

  const groupSizes = [
    { id: 'duo_trio' as GroupSizeId, label: 'Duo / Trio', count: '2–3 people', desc: 'Close friends or partners' },
    { id: 'small_group' as GroupSizeId, label: 'Small Circle', count: '4–6 people', desc: 'Classic hangout group' },
    { id: 'large_group' as GroupSizeId, label: 'Large Squad', count: '7–12 people', desc: 'Club meet or study group' },
    { id: 'crowd' as GroupSizeId, label: 'Open Gathering', count: '13+ people', desc: 'Orientation or social gathering' },
  ];

  const moods = [
    { id: 'icebreaker' as MoodId, label: 'Icebreaker & Spark', desc: 'Build quick connection and laughs', icon: Smile },
    { id: 'energetic' as MoodId, label: 'Playful Sprint', desc: 'Lighthearted active movement', icon: Zap },
    { id: 'observation' as MoodId, label: 'Stealth & Notice', desc: 'Uncover unseen details and sounds', icon: Eye },
    { id: 'cooperative' as MoodId, label: 'Team Puzzle', desc: 'Solve an environmental challenge', icon: Puzzle },
    { id: 'mindful' as MoodId, label: 'Sensory Grounding', desc: 'Deep breaths and sensory reset', icon: Wind },
    { id: 'improv' as MoodId, label: 'Outdoor Theater', desc: 'Creative spontaneous storytelling', icon: Theater },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-20 space-y-8">
      
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between border-b border-[#23483D]/10 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#23483D]/80 hover:text-[#23483D] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="text-xs text-[#23483D]/60 font-mono">
          Step 1 of 2: Activity Setup
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#23483D] tracking-tight">
          Configure Your Outdoor Game
        </h1>
        <p className="text-sm sm:text-base text-[#23483D]/75 leading-relaxed">
          Tell us about your physical surroundings and companions. Gemma 4 will tailor a game that needs no equipment and respects your constraints.
        </p>
      </div>

      {/* Loading Overlay State */}
      {isLoading ? (
        <div className="bg-[#FAF8F2] border border-[#23483D]/15 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-md">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 rounded-full border-4 border-[#23483D]/10 border-t-[#23483D] animate-spin"></div>
            <Sparkles className="w-6 h-6 text-[#E9785B] absolute inset-0 m-auto" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="font-['Outfit'] font-bold text-xl text-[#23483D]">
              {loadingStep === 0 && 'Connecting to Gemma 4 Open-Weight AI...'}
              {loadingStep === 1 && `Sculpting 3 timed stages for ${environment.replace('_', ' ')}...`}
              {loadingStep >= 2 && 'Verifying zero-equipment & outdoor safety rules...'}
            </h3>
            <p className="text-xs text-[#23483D]/65">
              Target model: <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#23483D]/10">gemma-4-26b-a4b-it</code>
            </p>
          </div>

          <div className="flex justify-center gap-1.5 pt-2">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === loadingStep ? 'w-8 bg-[#E9785B]' : 'w-2 bg-[#23483D]/20'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">

          {/* Section 1: Outdoor Space */}
          <section className="space-y-3">
            <label className="block text-sm font-bold text-[#23483D] uppercase tracking-wider">
              1. Choose your outdoor environment
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {environments.map((env) => {
                const Icon = env.icon;
                const isSelected = environment === env.id;
                return (
                  <button
                    key={env.id}
                    type="button"
                    onClick={() => setEnvironment(env.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                      isSelected
                        ? 'border-[#23483D] bg-white ring-2 ring-[#23483D]/20 shadow-sm'
                        : 'border-[#23483D]/10 bg-[#FAF8F2] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-[#E9785B]' : 'text-[#23483D]/70'}`} />
                      {isSelected && <Check className="w-4 h-4 text-[#23483D]" />}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#23483D]">{env.label}</div>
                      <div className="text-xs text-[#23483D]/60 line-clamp-1">{env.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Section 2: Group Size */}
          <section className="space-y-3">
            <label className="block text-sm font-bold text-[#23483D] uppercase tracking-wider">
              2. Group size
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {groupSizes.map((size) => {
                const isSelected = groupSize === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setGroupSize(size.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#23483D] bg-white ring-2 ring-[#23483D]/20 shadow-sm'
                        : 'border-[#23483D]/10 bg-[#FAF8F2] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-mono text-xs font-semibold text-[#E9785B]">{size.count}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#23483D]" />}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#23483D]">{size.label}</div>
                      <div className="text-xs text-[#23483D]/60">{size.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Section 3: Available Duration */}
          <section className="space-y-3">
            <label className="block text-sm font-bold text-[#23483D] uppercase tracking-wider">
              3. Available time
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[5, 10, 15].map((mins) => {
                const isSelected = duration === mins;
                return (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDuration(mins as DurationMinutes)}
                    className={`py-3.5 px-4 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#23483D] bg-white ring-2 ring-[#23483D]/20 shadow-sm font-bold'
                        : 'border-[#23483D]/10 bg-[#FAF8F2] hover:bg-white text-[#23483D]/80'
                    }`}
                  >
                    <div className="font-['Outfit'] text-2xl font-black text-[#23483D]">
                      {mins} <span className="text-xs font-sans font-medium text-[#23483D]/60">min</span>
                    </div>
                    <div className="text-[11px] text-[#23483D]/60 mt-0.5">
                      {mins === 5 && 'Quick Spark'}
                      {mins === 10 && 'Standard Adventure'}
                      {mins === 15 && 'Deep Group Flow'}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Section 4: Activity Mood */}
          <section className="space-y-3">
            <label className="block text-sm font-bold text-[#23483D] uppercase tracking-wider">
              4. Activity style & mood
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {moods.map((m) => {
                const Icon = m.icon;
                const isSelected = mood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMood(m.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'border-[#23483D] bg-white ring-2 ring-[#23483D]/20 shadow-sm'
                        : 'border-[#23483D]/10 bg-[#FAF8F2] hover:bg-white'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-[#E9785B]/15 text-[#E9785B]' : 'bg-[#23483D]/5 text-[#23483D]'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#23483D]">{m.label}</div>
                      <div className="text-xs text-[#23483D]/60 leading-tight mt-0.5">{m.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Section 5: Accessibility & Safety Constraints */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-[#23483D]" />
              <label className="text-sm font-bold text-[#23483D] uppercase tracking-wider">
                5. Accessibility & physical comfort (optional)
              </label>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <label className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-colors ${
                accessibility.seatedOrLowMobility ? 'bg-white border-[#23483D]' : 'bg-[#FAF8F2] border-[#23483D]/10'
              }`}>
                <input
                  type="checkbox"
                  checked={accessibility.seatedOrLowMobility}
                  onChange={(e) => setAccessibility({ ...accessibility, seatedOrLowMobility: e.target.checked })}
                  className="w-4 h-4 text-[#23483D] rounded border-[#23483D]/20 accent-[#23483D]"
                />
                <span className="text-xs sm:text-sm text-[#23483D] font-medium">
                  Seated / Low-mobility (No running or standing-only)
                </span>
              </label>

              <label className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-colors ${
                accessibility.wheelchairAccessible ? 'bg-white border-[#23483D]' : 'bg-[#FAF8F2] border-[#23483D]/10'
              }`}>
                <input
                  type="checkbox"
                  checked={accessibility.wheelchairAccessible}
                  onChange={(e) => setAccessibility({ ...accessibility, wheelchairAccessible: e.target.checked })}
                  className="w-4 h-4 text-[#23483D] rounded border-[#23483D]/20 accent-[#23483D]"
                />
                <span className="text-xs sm:text-sm text-[#23483D] font-medium">
                  Wheelchair accessible (Paved, zero steps/stairs)
                </span>
              </label>

              <label className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-colors ${
                accessibility.quietVoice ? 'bg-white border-[#23483D]' : 'bg-[#FAF8F2] border-[#23483D]/10'
              }`}>
                <input
                  type="checkbox"
                  checked={accessibility.quietVoice}
                  onChange={(e) => setAccessibility({ ...accessibility, quietVoice: e.target.checked })}
                  className="w-4 h-4 text-[#23483D] rounded border-[#23483D]/20 accent-[#23483D]"
                />
                <span className="text-xs sm:text-sm text-[#23483D] font-medium">
                  Quiet / Shy-friendly (Low voice, no spotlight)
                </span>
              </label>

              <label className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-colors ${
                accessibility.pavedOnly ? 'bg-white border-[#23483D]' : 'bg-[#FAF8F2] border-[#23483D]/10'
              }`}>
                <input
                  type="checkbox"
                  checked={accessibility.pavedOnly}
                  onChange={(e) => setAccessibility({ ...accessibility, pavedOnly: e.target.checked })}
                  className="w-4 h-4 text-[#23483D] rounded border-[#23483D]/20 accent-[#23483D]"
                />
                <span className="text-xs sm:text-sm text-[#23483D] font-medium">
                  Paved paths only (Rain/mud avoidance)
                </span>
              </label>

            </div>

            {/* Custom constraint input */}
            <div className="pt-1">
              <input
                type="text"
                placeholder="Optional custom note: e.g. 'Near campus clock tower', 'Light drizzle outside'"
                value={accessibility.customConstraint || ''}
                onChange={(e) => setAccessibility({ ...accessibility, customConstraint: e.target.value })}
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#23483D]/15 bg-white text-[#23483D] placeholder-[#23483D]/40 focus:outline-none focus:ring-2 focus:ring-[#E9785B]"
              />
            </div>
          </section>

          {/* Error Message & Sample Fallback Banner */}
          {errorMessage && (
            <div className="bg-[#FAF0ED] border border-[#E9785B]/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#E9785B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm text-[#23483D]">
                    Gemma 4 API Notice
                  </h4>
                  <p className="text-xs text-[#23483D]/80 leading-relaxed">
                    {errorMessage}
                  </p>
                  <p className="text-xs text-[#23483D]/60">
                    You can retry or immediately load a curated sample activity tested for this environment.
                  </p>
                </div>
              </div>

              {fallbackSample && (
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onActivityReady(fallbackSample)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#E9785B] hover:bg-[#D66347] rounded-xl transition-colors cursor-pointer"
                  >
                    Use Curated Sample: “{fallbackSample.title}”
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenerate(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#23483D] bg-white border border-[#23483D]/20 rounded-xl hover:bg-[#FAF8F2] transition-colors cursor-pointer"
                  >
                    Retry Gemma Call
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#23483D]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-xs text-[#23483D]/65">
              <span>Model: <strong>Gemma 4 Open-Weight</strong> (26B IT)</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleGenerate(true)}
                className="px-4 py-3 text-xs sm:text-sm font-semibold text-[#23483D] bg-white hover:bg-[#FAF8F2] border border-[#23483D]/15 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                Sample Activity
              </button>

              <button
                type="button"
                onClick={() => handleGenerate(false)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#F5F1E8] bg-[#23483D] hover:bg-[#19342C] rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#E9785B]" />
                <span>Generate with Gemma</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
