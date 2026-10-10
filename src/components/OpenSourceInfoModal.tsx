import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Github, 
  Terminal, 
  Cpu, 
  CheckCircle2, 
  Lock, 
  ExternalLink,
  BookOpen,
  Info
} from 'lucide-react';

interface OpenSourceInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OpenSourceInfoModal: React.FC<OpenSourceInfoModalProps> = ({
  isOpen,
  onClose
}) => {
  const [modelInfo, setModelInfo] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/model-info')
        .then((res) => res.json())
        .then((data) => setModelInfo(data))
        .catch((err) => console.error('Failed to fetch model info:', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative bg-[#FAF8F2] border border-[#23483D]/20 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-[#23483D] max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#23483D]/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E9785B] uppercase tracking-wider">
              <span>Hacktoberfest Open-Source AI Challenge</span>
              <span aria-hidden="true">·</span>
              <span>Week 1</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl tracking-tight text-[#23483D]">
              Open-Weight AI & Privacy Architecture
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#23483D]/60 hover:text-[#23483D] hover:bg-[#23483D]/5 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Section 1: Why Open-Weight AI Matters */}
        <section className="space-y-3 bg-white p-5 rounded-2xl border border-[#23483D]/10">
          <div className="flex items-center gap-2 font-['Outfit'] font-bold text-lg text-[#23483D]">
            <Cpu className="w-5 h-5 text-[#E9785B]" />
            <h3>Why Open-Weight AI is Central to GullyGames</h3>
          </div>
          <p className="text-sm text-[#23483D]/80 leading-relaxed">
            Proprietary black-box models lock community applications into vendor silos, unpredictable pricing, and opaque filters. 
            GullyGames is built from the ground up on Google's <strong>Gemma open-weight models</strong> (specifically initially <code>gemma-4-26b-a4b-it</code>).
          </p>
          <ul className="space-y-2 text-xs text-[#23483D]/80 pl-2">
            <li className="flex items-start gap-2">
              <span className="text-[#E9785B] font-bold">•</span>
              <span><strong>Weight Transparency:</strong> Anyone can inspect, fine-tune, or run Gemma locally on consumer GPUs, Ollama, or vLLM.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E9785B] font-bold">•</span>
              <span><strong>Community Autonomy:</strong> Universities, parks, and youth clubs can host their own local instances without relying on third-party tracking.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E9785B] font-bold">•</span>
              <span><strong>Modular Backend:</strong> The GullyGames AI engine is decoupled from any proprietary API; swap to a self-hosted endpoint in seconds.</span>
            </li>
          </ul>
        </section>

        {/* Section 2: Hosted Inference & API Setup Transparency */}
        <section className="space-y-3 bg-white p-5 rounded-2xl border border-[#23483D]/10">
          <div className="flex items-center gap-2 font-['Outfit'] font-bold text-lg text-[#23483D]">
            <Sparkles className="w-5 h-5 text-[#23483D]" />
            <h3>Hosted Inference Disclosure & Runtime Setup</h3>
          </div>
          <p className="text-sm text-[#23483D]/80 leading-relaxed">
            In this cloud development environment, Gemma is accessed through the official Google AI Studio inference endpoint via the <code>@google/genai</code> SDK.
          </p>
          
          <div className="bg-[#FAF8F2] p-3.5 rounded-xl border border-[#23483D]/10 text-xs font-mono space-y-1 text-[#23483D]/90">
            <div><strong>Active Model:</strong> {modelInfo?.modelName || 'gemma-4-26b-a4b-it'}</div>
            <div><strong>Inference Provider:</strong> {modelInfo?.provider || 'Google AI Studio Hosted Inference'}</div>
            <div><strong>SDK:</strong> @google/genai (server-side proxy)</div>
            <div><strong>API Key Status:</strong> {modelInfo?.isConfigured ? 'Injected via Environment Secrets' : 'Requires GEMINI_API_KEY'}</div>
          </div>

          <div className="text-xs text-[#23483D]/70 space-y-1">
            <p>
              <strong>Security Guarantee:</strong> Credentials are stored strictly on the Node.js server inside <code>process.env.GEMINI_API_KEY</code>. No API keys ever enter browser code.
            </p>
          </div>
        </section>

        {/* Section 3: Privacy & Zero-Data-Collection Commitment */}
        <section className="space-y-3 bg-white p-5 rounded-2xl border border-[#23483D]/10">
          <div className="flex items-center gap-2 font-['Outfit'] font-bold text-lg text-[#23483D]">
            <Lock className="w-5 h-5 text-[#23483D]" />
            <h3>Privacy & Zero-Data-Collection</h3>
          </div>
          <p className="text-sm text-[#23483D]/80 leading-relaxed">
            True to the "Touch Grass" spirit, GullyGames respects your privacy:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#23483D]/80">
            <div className="flex items-center gap-2 bg-[#FAF8F2] p-2.5 rounded-lg border border-[#23483D]/5">
              <CheckCircle2 className="w-4 h-4 text-[#23483D] shrink-0" />
              <span>Zero exact GPS tracking (user chooses general category)</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF8F2] p-2.5 rounded-lg border border-[#23483D]/5">
              <CheckCircle2 className="w-4 h-4 text-[#23483D] shrink-0" />
              <span>Zero user account or login required</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF8F2] p-2.5 rounded-lg border border-[#23483D]/5">
              <CheckCircle2 className="w-4 h-4 text-[#23483D] shrink-0" />
              <span>Zero telemetry trackers or advertising scripts</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF8F2] p-2.5 rounded-lg border border-[#23483D]/5">
              <CheckCircle2 className="w-4 h-4 text-[#23483D] shrink-0" />
              <span>All history stored purely in client localStorage</span>
            </div>
          </div>
        </section>

        {/* Section 4: GitHub Repository Sync & Demo Recording Checklist */}
        <section className="space-y-3 bg-white p-5 rounded-2xl border border-[#23483D]/10">
          <div className="flex items-center gap-2 font-['Outfit'] font-bold text-lg text-[#23483D]">
            <Github className="w-5 h-5 text-[#23483D]" />
            <h3>GitHub Repository Sync & Submission Guide</h3>
          </div>
          
          <div className="space-y-2 text-xs text-[#23483D]/80">
            <p className="font-semibold text-[#23483D]">How to push this codebase to a public GitHub repository:</p>
            <div className="bg-[#19342C] text-[#F5F1E8] p-3 rounded-xl font-mono text-[11px] space-y-1">
              <div># 1. Initialize git and commit files</div>
              <div>git init</div>
              <div>git add .</div>
              <div>git commit -m "feat: initial GullyGames Hacktoberfest release"</div>
              <div># 2. Add your public GitHub repo origin and push</div>
              <div>git remote add origin https://github.com/&lt;your-username&gt;/gullygames.git</div>
              <div>git branch -M main</div>
              <div>git push -u origin main</div>
            </div>
          </div>

          <div className="pt-2 space-y-1 text-xs text-[#23483D]/80">
            <p className="font-semibold text-[#23483D]">Hacktoberfest Demo Recording Checklist (2-3 min video):</p>
            <div className="space-y-1 text-[11px] text-[#23483D]/75 pl-1">
              <div>1. [ ] <strong>Hook:</strong> Introduce GullyGames and why open-weight Gemma gets groups outside to touch grass.</div>
              <div>2. [ ] <strong>Setup:</strong> Select Campus Green / 10 Min / Small Circle / Icebreaker mood.</div>
              <div>3. [ ] <strong>Gemma Generation:</strong> Show the generated 3-step activity briefing with safety notes.</div>
              <div>4. [ ] <strong>Pocket Mode:</strong> Demonstrate the timer, pocket lock screen dimmer, and audio chime.</div>
              <div>5. [ ] <strong>Reflection:</strong> Type a quick participant note and show Gemma synthesizing the takeaway.</div>
              <div>6. [ ] <strong>History & Sample Mode:</strong> Show saved localStorage history and offline sample bank.</div>
            </div>
          </div>
        </section>

        {/* Modal Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-[#F5F1E8] bg-[#23483D] hover:bg-[#19342C] rounded-xl shadow cursor-pointer"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
};
