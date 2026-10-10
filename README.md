# GullyGames 🌿

> **Hacktoberfest Open-Source AI Challenge: Week 1 — “Touch Grass”**  
> Collaborative, zero-equipment outdoor micro-games powered by Google's open-weight **Gemma 4** (`gemma-4-26b-a4b-it`).

GullyGames uses open-weight AI to create spontaneous 5, 10, or 15-minute collaborative outdoor activities for college students, friends, and community groups. It is specifically engineered to counteract screen addiction by encouraging people to put their phones in their pockets and interact in real physical spaces—campus greens, courtyards, rooftops, and parks.

---

## 🧭 Why Open-Weight AI is Central to GullyGames

Proprietary models lock community applications into closed ecosystems, commercial API rate limits, and opaque data practices. In contrast, **open-weight models like Gemma** empower local communities, students, and clubs to:

1. **Retain Full Autonomy:** Open-weight model architectures can be run on local servers (via Ollama, vLLM, or consumer hardware) without dependence on proprietary cloud services.
2. **Transparent Weight Provenance:** Open weights ensure reproducible behavior, verifiable safety guardrails, and democratic access for educational institutions.
3. **Modular Decoupling:** GullyGames abstracts the model interface (`server/gemma.ts`), allowing users or organizations to easily point to self-hosted Gemma inference endpoints.
4. **Community Co-Creation:** Anyone can fine-tune or extend the model for regional outdoor games, cultural traditions, or physical accessibility needs.

---

## 📱 Features

- **Activity Setup:** Customize environment (Campus Lawn, Courtyard, Terrace, Park, Plaza, Shaded Grove), group size (2 to 13+ players), duration (5, 10, or 15 mins), mood (Icebreaker, Sprint, Observation, Puzzle, Mindful, Improv), and physical accessibility needs.
- **Gemma 4 Generation:** Server-side generation using `gemma-4-26b-a4b-it` with structured JSON validation, safety sanitization, and duration timing.
- **Activity Briefing:** Structured preview displaying 3 sequential timed stages, safety rules, ecological ethics, and a reflection prompt.
- **Distraction-Free Pocket Mode:**
  - One readable instruction at a time with a countdown timer.
  - **Pocket Lock / Ambient Dimmer:** Dim screen to prevent accidental touches in pockets while walking.
  - **Synthesized Audio Chime:** Soft chime generated via Web Audio API when time expires.
  - Controls: Pause/resume, next/prev stage, +1 minute round extension.
- **Group Reflection:** Rate the experience, note memorable moments, and use Gemma to generate a concise group takeaway.
- **Local History:** Saved in browser `localStorage`. Review past sessions, delete items, or copy shareable summaries.
- **Curated Sample Activities Bank:** Pre-tested offline outdoor games ready whenever internet or API endpoints are unreachable.
- **Truthful Model Disclosure:** Transparent labelling distinguishes real Gemma AI generations from curated sample activities.

---

## 🛠 Architecture & Tech Stack

```
gullygames/
├── server.ts                  # Express full-stack server & Vite middleware
├── server/
│   ├── gemma.ts              # Modular Gemma open-weight AI integration (@google/genai)
│   ├── validation.ts         # Request schema validation & AI safety guardrails
│   └── sampleActivities.ts   # Curated offline community micro-games bank
├── src/
│   ├── components/
│   │   ├── Header.tsx             # 3-Zone top navigation (Top Bar Contract)
│   │   ├── HeroLanding.tsx        # Outdoor lifestyle landing & value pillars
│   │   ├── ActivitySetup.tsx      # Multi-preference game configurator
│   │   ├── ActivityBriefing.tsx   # 3-Stage card briefing & safety notes
│   │   ├── PocketMode.tsx         # Timer, Pocket Lock dimmer & audio chime
│   │   ├── ReflectionView.tsx     # Post-game reflection & Gemma summarizer
│   │   ├── HistoryView.tsx        # LocalStorage session history manager
│   │   ├── SampleBankView.tsx     # Filterable sample activities browser
│   │   └── OpenSourceInfoModal.tsx# Open-weight architecture & demo guide
│   ├── types/game.ts              # TypeScript interfaces for games & reflections
│   ├── utils/audio.ts             # Web Audio chime synthesizer
│   ├── utils/storage.ts           # LocalStorage wrapper
│   ├── App.tsx                    # Main SPA router & state coordinator
│   └── index.css                  # Warm paper palette (#F5F1E8, #23483D, #E9785B)
├── test/
│   └── api-validation.test.ts     # Automated unit tests for validation & safety
├── metadata.json              # Applet configuration & server capability
├── .env.example               # Safe environment variable template
└── README.md
```

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide React icons.
- **Backend:** Node.js, Express, tsx.
- **AI SDK:** `@google/genai` (server-side only; API keys never touch browser code).
- **Default Open-Weight Model:** `gemma-4-26b-a4b-it` (configurable via `GEMMA_MODEL_NAME`).

---

## 🔒 Privacy & Security

- **Zero Location Tracking:** GullyGames never requests GPS coordinates; users simply choose a physical category (lawn, terrace, courtyard).
- **No Account Required:** No registration, cookies, or personal logins.
- **Local Storage Only:** Game reflections are saved strictly in the user's browser `localStorage`.
- **Server-Side API Key Protection:** The API key is stored in server environment variables (`process.env.GEMINI_API_KEY`) and never exposed in client bundles.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm
- A Google AI Studio API key with access to Gemma models.

### Installation

```bash
# 1. Clone or download the repository
git clone https://github.com/<your-username>/gullygames.git
cd gullygames

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and supply your GEMINI_API_KEY
```

### Running the App

```bash
# Start development server on http://localhost:3000
npm run dev
```

### Running Validation Tests

```bash
# Run automated schema validation and safety guardrail tests
npm test
```

---

## 📤 Syncing to a Public GitHub Repository

To push this project to a new public GitHub repository for Hacktoberfest submission:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Stage and commit files
git add .
git commit -m "feat: complete GullyGames open-weight AI outdoor app"

# 3. Link your public GitHub repository
git remote add origin https://github.com/<your-username>/gullygames.git
git branch -M main

# 4. Push to GitHub
git push -u origin main
```

---

## 🎬 Testing Checklist & Recording Demo

Use this checklist to verify features and record a 2–3 minute walkthrough video:

- [ ] **1. Landing & Concept:** Highlight the Hacktoberfest "Touch Grass" theme and why open-weight AI is used.
- [ ] **2. Activity Setup:** Select Campus Green, 10 Minutes, Small Circle, and Icebreaker style.
- [ ] **3. AI Generation:** Click "Generate with Gemma" to call `gemma-4-26b-a4b-it` and display the 3-stage briefing.
- [ ] **4. Pocket Mode:** Launch Pocket Mode, test the timer, demonstrate "Pocket Lock" screen dimmer, and test the audio chime.
- [ ] **5. Group Reflection:** Enter notes and demonstrate the Gemma reflection summarizer.
- [ ] **6. Session History:** Check that the session is stored in `localStorage`, test the "Share Summary" copy button, and delete a record.
- [ ] **7. Curated Sample Mode:** Browse the sample bank to demonstrate offline resilience.
- [ ] **8. Automated Tests:** Run `npm test` in the terminal to show all validation passes.
