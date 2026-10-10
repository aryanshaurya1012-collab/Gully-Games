import { validateActivityRequest, validateAndSanitizeAiResponse, sanitizeText } from '../server/validation.js';
import { SAMPLE_ACTIVITIES, getMatchingSampleActivity } from '../server/sampleActivities.js';
import { ActivityGenerationRequest } from '../src/types/game.js';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('--- Running GullyGames API & Validation Tests ---\n');

// 1. Text Sanitization
console.log('1. Sanitization:');
const dirtyString = '<script>alert("hack")</script>Hello <b>Campus</b> World';
const cleanString = sanitizeText(dirtyString);
assert(!cleanString.includes('<script>') && !cleanString.includes('<b>'), 'Strips HTML and script tags');
assert(cleanString === 'alert("hack")Hello Campus World', 'Retains clean text content');

// 2. Request Validation
console.log('\n2. Request Validation:');
const validReq: ActivityGenerationRequest = {
  environment: 'campus_lawn',
  groupSize: 'small_group',
  durationMinutes: 10,
  mood: 'icebreaker',
  accessibility: {
    seatedOrLowMobility: false,
    wheelchairAccessible: true,
    quietVoice: false,
    pavedOnly: true
  }
};
const res1 = validateActivityRequest(validReq);
assert(res1.valid === true, 'Accepts valid activity request');

const invalidDurReq = { ...validReq, durationMinutes: 45 };
const res2 = validateActivityRequest(invalidDurReq);
assert(res2.valid === false, 'Rejects unsupported duration (45 mins; must be 5, 10, or 15)');

const invalidEnvReq = { ...validReq, environment: 'mars_rover' };
const res3 = validateActivityRequest(invalidEnvReq);
assert(res3.valid === false, 'Rejects unlisted environment type');

// 3. AI Response Schema Validation
console.log('\n3. AI Response Schema Validation:');
const rawAiMock = {
  title: '<b>The Quad Compass</b>',
  tagline: 'Navigate unseen lines across the lawn',
  premise: 'A fun collaborative discovery game that helps university peers tune into campus geometry.',
  steps: [
    {
      stepNumber: 1,
      title: 'North Star Alignment',
      durationMinutes: 3,
      instruction: 'Find the northernmost corner of the quad together.',
      pocketTip: 'Keep your phone tucked in your bag or pocket.'
    },
    {
      stepNumber: 2,
      title: 'The Silent Compass',
      durationMinutes: 4,
      instruction: 'Spread outward and silently signal four cardinal directions.',
      pocketTip: 'Use gestures and smiles only.'
    },
    {
      stepNumber: 3,
      title: 'Reunion Pulse',
      durationMinutes: 3,
      instruction: 'Come back together in a ring and share one highlight.',
      pocketTip: 'Look at each person in the eye.'
    }
  ],
  safetyNotes: [
    'Stay on pedestrian lawn spaces.',
    'Do not pick any flowers or break plants.'
  ],
  reflectionPrompt: 'What did you notice about the campus that you usually rush past?'
};

const validated = validateAndSanitizeAiResponse(rawAiMock, validReq, 'gemma-4-26b-a4b-it');
assert(validated.success === true, 'Validates compliant Gemma output');
assert(validated.activity?.title === 'The Quad Compass', 'Sanitizes HTML tags from title');
assert(validated.activity?.steps.length === 3, 'Enforces exactly 3 timed steps');
assert(validated.activity?.durationMinutes === 10, 'Matches requested total duration');

// 4. Dangerous Content Safety Filtering
console.log('\n4. Dangerous Content Safety Guardrails:');
const dangerousAiMock = {
  ...rawAiMock,
  title: 'Tree Climb Challenge',
  premise: 'We will climb high into the highest oak branches on the lawn.',
  steps: [
    { ...rawAiMock.steps[0], instruction: 'Climb tree branch as high as possible.' },
    rawAiMock.steps[1],
    rawAiMock.steps[2]
  ]
};
const dangerousResult = validateAndSanitizeAiResponse(dangerousAiMock, validReq, 'gemma-4-26b-a4b-it');
assert(dangerousResult.success === false, 'Rejects dangerous climb high / tree climbing activities');

// 5. Sample Activity Repository
console.log('\n5. Curated Sample Repository:');
assert(SAMPLE_ACTIVITIES.length >= 6, 'Contains at least 6 diverse curated sample games');
const sampleMatch = getMatchingSampleActivity('park', 'large_group', 15, 'energetic');
assert(sampleMatch.isSample === true, 'Curated samples are explicitly flagged as isSample: true');
assert(sampleMatch.steps.length === 3, 'Sample activity has 3 steps');

console.log(`\n========================================`);
console.log(`Test Results: ${passed} passed, ${failed} failed.`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
