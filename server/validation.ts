import { ActivityGenerationRequest, GameActivity, GameStep, EnvironmentId, GroupSizeId, DurationMinutes, MoodId } from '../src/types/game.js';

const VALID_ENVIRONMENTS: EnvironmentId[] = [
  'campus_lawn',
  'courtyard',
  'terrace',
  'park',
  'urban_plaza',
  'quiet_grove'
];

const VALID_GROUP_SIZES: GroupSizeId[] = [
  'duo_trio',
  'small_group',
  'large_group',
  'crowd'
];

const VALID_DURATIONS: DurationMinutes[] = [5, 10, 15];

const VALID_MOODS: MoodId[] = [
  'icebreaker',
  'energetic',
  'observation',
  'cooperative',
  'mindful',
  'improv'
];

/**
 * Strip potential HTML tags and sanitize string inputs
 */
export function sanitizeText(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '')
    .trim();
}

/**
 * Validates incoming client request for generating an outdoor game
 */
export function validateActivityRequest(body: any): { valid: boolean; error?: string; data?: ActivityGenerationRequest } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be an object' };
  }

  const environment = body.environment as EnvironmentId;
  if (!VALID_ENVIRONMENTS.includes(environment)) {
    return { valid: false, error: `Invalid environment: ${environment}` };
  }

  const groupSize = body.groupSize as GroupSizeId;
  if (!VALID_GROUP_SIZES.includes(groupSize)) {
    return { valid: false, error: `Invalid group size: ${groupSize}` };
  }

  const durationMinutes = Number(body.durationMinutes) as DurationMinutes;
  if (!VALID_DURATIONS.includes(durationMinutes)) {
    return { valid: false, error: `Invalid duration: ${durationMinutes}. Must be 5, 10, or 15.` };
  }

  const mood = body.mood as MoodId;
  if (!VALID_MOODS.includes(mood)) {
    return { valid: false, error: `Invalid mood: ${mood}` };
  }

  const accessibility = {
    seatedOrLowMobility: Boolean(body.accessibility?.seatedOrLowMobility),
    wheelchairAccessible: Boolean(body.accessibility?.wheelchairAccessible),
    quietVoice: Boolean(body.accessibility?.quietVoice),
    pavedOnly: Boolean(body.accessibility?.pavedOnly),
    customConstraint: sanitizeText(body.accessibility?.customConstraint)
  };

  return {
    valid: true,
    data: {
      environment,
      groupSize,
      durationMinutes,
      mood,
      accessibility
    }
  };
}

/**
 * Validates and sanitizes structured AI response from Gemma
 */
export function validateAndSanitizeAiResponse(
  raw: any,
  request: ActivityGenerationRequest,
  modelName: string
): { success: boolean; activity?: GameActivity; error?: string } {
  if (!raw || typeof raw !== 'object') {
    return { success: false, error: 'AI output must be a valid JSON object' };
  }

  const title = sanitizeText(raw.title);
  if (!title || title.length < 3) {
    return { success: false, error: 'Activity title missing or too short' };
  }

  const tagline = sanitizeText(raw.tagline || raw.premise?.substring(0, 80) || 'An outdoor collaborative game');
  const premise = sanitizeText(raw.premise);
  if (!premise || premise.length < 15) {
    return { success: false, error: 'Activity premise missing or too brief' };
  }

  // Validate steps
  if (!Array.isArray(raw.steps) || raw.steps.length < 3) {
    return { success: false, error: 'Activity must contain at least 3 distinct steps' };
  }

  // Duration distribution
  const targetDuration = request.durationMinutes;
  const defaultStepDuration = Math.max(1, Math.floor(targetDuration / 3));

  const steps: GameStep[] = raw.steps.slice(0, 3).map((s: any, idx: number) => {
    const stepNum = idx + 1;
    const stepTitle = sanitizeText(s.title || `Part ${stepNum}`);
    const stepInstruction = sanitizeText(s.instruction || s.description || '');
    const pocketTip = sanitizeText(s.pocketTip || 'Phone in pocket; focus on your friends and the outdoor space.');
    
    // Allocate realistic step minutes summing to total duration
    let dur = Number(s.durationMinutes);
    if (isNaN(dur) || dur <= 0) {
      dur = stepNum === 3 
        ? targetDuration - (defaultStepDuration * 2) 
        : defaultStepDuration;
    }
    
    return {
      stepNumber: stepNum,
      title: stepTitle,
      durationMinutes: Math.max(1, dur),
      instruction: stepInstruction,
      pocketTip
    };
  });

  // Ensure steps sum to requested duration
  const currentTotal = steps.reduce((sum, s) => sum + s.durationMinutes, 0);
  if (currentTotal !== targetDuration) {
    // Adjust last step to match total
    const diff = targetDuration - currentTotal;
    if (steps[2].durationMinutes + diff > 0) {
      steps[2].durationMinutes += diff;
    } else {
      steps[0].durationMinutes = defaultStepDuration;
      steps[1].durationMinutes = defaultStepDuration;
      steps[2].durationMinutes = targetDuration - (defaultStepDuration * 2);
    }
  }

  // Safety notes
  let safetyNotes: string[] = [];
  if (Array.isArray(raw.safetyNotes) && raw.safetyNotes.length > 0) {
    safetyNotes = raw.safetyNotes.map((note: any) => sanitizeText(note)).filter(Boolean);
  }

  // Always ensure foundational outdoor safety notes are present
  if (safetyNotes.length === 0) {
    safetyNotes = [
      'Respect the shared space and do not trespass into private zones.',
      'Watch your step for natural obstacles, roots, and curbs.',
      'Do not pick plants, disturb wildlife, or leave trash behind.'
    ];
  }

  // Check safety content policies
  const combinedText = `${title} ${premise} ${steps.map(s => s.instruction).join(' ')}`.toLowerCase();
  const prohibitedBehaviors = [
    'climb high',
    'climb tree',
    'scale the wall',
    'trespass',
    'private property',
    'pick flowers',
    'break branches',
    'capture wildlife',
    'blindfolded running',
    'cross busy traffic',
    'cross the road blindly'
  ];

  for (const dangerous of prohibitedBehaviors) {
    if (combinedText.includes(dangerous)) {
      return {
        success: false,
        error: `Activity violated outdoor safety policy (contained reference to: "${dangerous}")`
      };
    }
  }

  const reflectionPrompt = sanitizeText(
    raw.reflectionPrompt || 'How did it feel to step away from screens and connect in this space together?'
  );

  const activity: GameActivity = {
    id: `gemma-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title,
    tagline,
    premise,
    environment: request.environment,
    groupSize: request.groupSize,
    durationMinutes: targetDuration,
    mood: request.mood,
    accessibilitySettings: request.accessibility,
    steps,
    safetyNotes,
    reflectionPrompt,
    equipmentNeeded: 'None — zero equipment needed',
    isSample: false,
    modelUsed: modelName,
    generatedAt: new Date().toISOString()
  };

  return { success: true, activity };
}
