import React from 'react';
import { Sparkles, ArrowRight, Sun, Users, Clock, ShieldCheck, PhoneOff, TreePine, MapPin } from 'lucide-react';
import { GameActivity } from '../types/game.js';

interface HeroLandingProps {
  onStartSetup: () => void;
  onSelectSample: (activity: GameActivity) => void;
  onOpenDocModal: () => void;
  featuredSamples: GameActivity[];
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onStartSetup,
  onSelectSample,
  onOpenDocModal,
  featuredSamples
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Hacktoberfest Context Kicker (Clean unboxed text, no pills) */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#23483D]/80 mb-4 tracking-wide uppercase">
            <span>Hacktoberfest Open-Source AI Challenge</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E9785B]">Week 1: “Touch Grass”</span>
            <span aria-hidden="true">·</span>
            <span>Gemma 4 Open-Weight</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headline and Call-to-action */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-[#23483D] tracking-tight leading-[1.08] text-balance">
                Put your screens away. Step outside. Play together.
              </h1>
              
              <p className="text-lg sm:text-xl text-[#23483D]/85 leading-relaxed max-w-2xl font-normal">
                GullyGames generates spontaneous 5, 10, or 15-minute collaborative outdoor games for campus lawns, courtyards, terraces, and parks. Zero equipment. Zero screen-watching.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onStartSetup}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-[#F5F1E8] bg-[#23483D] hover:bg-[#19342C] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-[#E9785B]" />
                  <span>Make a game</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenDocModal}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#23483D] bg-white/70 hover:bg-white border border-[#23483D]/15 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Why Open-Weight AI?</span>
                </button>
              </div>

              {/* Trust & Design Specs Line */}
              <div className="pt-4 border-t border-[#23483D]/10 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-[#23483D]/70">
                <div className="flex items-center gap-1.5">
                  <PhoneOff className="w-4 h-4 text-[#E9785B]" />
                  <span>Pocket Mode for zero distractions</span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#23483D]" />
                  <span>100% zero equipment required</span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <TreePine className="w-4 h-4 text-[#23483D]" />
                  <span>Ecology & safety safe-guards</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#23483D]/15 shadow-xl bg-[#ECE5D8] aspect-[16/10] lg:aspect-[4/3]">
                <img
                  src="/src/assets/images/hero_outdoor_friends_1791631715635.jpg"
                  alt="Friends laughing together on a sunlit university campus lawn"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Subtle caption overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#19342C]/90 via-[#19342C]/50 to-transparent p-4 text-[#F5F1E8]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#E9785B]">Real-world presence</p>
                  <p className="text-sm font-medium">Reconnecting university friends through micro-play</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Core Pillars: The Philosophy of GullyGames */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-[#23483D]">
            Designed for genuine presence
          </h2>
          <p className="text-sm sm:text-base text-[#23483D]/75">
            Most social apps optimize for screen engagement. GullyGames optimizes for the exact opposite: putting the phone away in your pocket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#FAF8F2] border border-[#23483D]/10 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#23483D]/10 flex items-center justify-center text-[#23483D]">
              <PhoneOff className="w-5 h-5 text-[#E9785B]" />
            </div>
            <h3 className="font-['Outfit'] font-semibold text-lg text-[#23483D]">Pocket Mode</h3>
            <p className="text-sm text-[#23483D]/75 leading-relaxed">
              Read one simple timed instruction, slip the phone into your pocket, and let gentle audio chimes guide your group without staring at a screen.
            </p>
          </div>

          <div className="bg-[#FAF8F2] border border-[#23483D]/10 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#23483D]/10 flex items-center justify-center text-[#23483D]">
              <TreePine className="w-5 h-5 text-[#23483D]" />
            </div>
            <h3 className="font-['Outfit'] font-semibold text-lg text-[#23483D]">Zero Props, Any Space</h3>
            <p className="text-sm text-[#23483D]/75 leading-relaxed">
              Whether you have 5 minutes in a quad between classes or 15 minutes at a community park, all games use only natural space, observation, and human voice.
            </p>
          </div>

          <div className="bg-[#FAF8F2] border border-[#23483D]/10 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#23483D]/10 flex items-center justify-center text-[#23483D]">
              <Sparkles className="w-5 h-5 text-[#E9785B]" />
            </div>
            <h3 className="font-['Outfit'] font-semibold text-lg text-[#23483D]">Gemma 4 Open-Weight AI</h3>
            <p className="text-sm text-[#23483D]/75 leading-relaxed">
              Powered by Google's Gemma 4 open architecture. Tailored dynamically for your exact group size, weather, and accessibility needs.
            </p>
          </div>

        </div>
      </section>

      {/* Pocket Mode Visual Spotlight */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#23483D] text-[#F5F1E8] rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E9785B]">
              <span>Tactile Play Experience</span>
            </div>
            
            <h2 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              One glance. Three minutes. Eyes up on your friends.
            </h2>
            
            <p className="text-base text-[#F5F1E8]/85 leading-relaxed max-w-xl">
              When Pocket Mode begins, an ambient screen dimmer prevents accidental touches in your jacket or backpack. A warm acoustic chime signals when each stage wraps up.
            </p>

            <div className="pt-2">
              <button
                onClick={onStartSetup}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#23483D] bg-[#F5F1E8] hover:bg-white rounded-xl shadow transition-all cursor-pointer"
              >
                <span>Try an Activity Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#19342C] aspect-[4/3]">
              <img
                src="/src/assets/images/pocket_mode_pocket_1791631730451.jpg"
                alt="Phone resting safely in a canvas jacket pocket while friends gather outside"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Featured Micro-Games Bank Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-[#23483D]">
              Explore Curated Micro-Games
            </h2>
            <p className="text-sm text-[#23483D]/70 mt-1">
              Sample activities ready to play instantly, tested by students and community groups.
            </p>
          </div>
          
          <button
            onClick={onStartSetup}
            className="text-sm font-semibold text-[#23483D] hover:text-[#19342C] flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Or generate with Gemma AI</span>
            <ArrowRight className="w-4 h-4 text-[#E9785B]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSamples.slice(0, 3).map((activity) => (
            <div
              key={activity.id}
              className="bg-[#FAF8F2] border border-[#23483D]/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#23483D]/25 transition-all shadow-sm hover:shadow group"
            >
              <div className="space-y-3">
                {/* Metadata Line */}
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

                <p className="text-sm text-[#23483D]/75 line-clamp-3 leading-relaxed">
                  {activity.premise}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#23483D]/10 flex items-center justify-between">
                <span className="text-xs text-[#23483D]/60 font-mono">
                  3 timed stages
                </span>
                
                <button
                  onClick={() => onSelectSample(activity)}
                  className="px-4 py-2 text-xs font-semibold text-[#F5F1E8] bg-[#23483D] hover:bg-[#19342C] rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  View Game
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
