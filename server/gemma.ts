import { GoogleGenAI } from '@google/genai';
import { ActivityGenerationRequest, GameActivity } from '../src/types/game.js';
import { validateAndSanitizeAiResponse, sanitizeText } from './validation.js';

// Primary requested open-weight model: Gemma 4 (gemma-4-26b-a4b-it)
export const DEFAULT_GEMMA_MODEL = process.env.GEMMA_MODEL_NAME || 'gemma-4-26b-a4b-it';

export interface ModelInfo {
  modelName: string;
  isOpenWeight: boolean;
  provider: string;
  architecture: string;
  inferenceType: 'hosted_api' | 'local';
  isConfigured: boolean;
}

export function getGemmaModelInfo(): ModelInfo {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  return {
    modelName: DEFAULT_GEMMA_MODEL,
    isOpenWeight: true,
    provider: 'Google AI Studio Hosted Inference API',
    architecture: 'Gemma 4 Open-Weight Architecture (26B Parameter Mixture-of-Experts/Dense)',
    inferenceType: 'hosted_api',
    isConfigured: hasKey
  };
}

function getGenAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

function extractJsonFromText(rawText: string): any {
  let cleaned = rawText.trim();
  // Strip markdown code fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  }
  // Try finding opening { and closing }
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  return JSON.parse(cleaned);
}

/**
 * Generate an outdoor collaborative activity using the Gemma open-weight model
 */
export async function generateOutdoorActivity(
  request: ActivityGenerationRequest
): Promise<{ success: boolean; activity?: GameActivity; error?: string; modelUsed: string }> {
  const modelName = DEFAULT_GEMMA_MODEL;
  const ai = getGenAiClient();

  if (!ai) {
    return {
      success: false,
      error: 'GEMINI_API_KEY is not configured in the environment / Secrets settings.',
      modelUsed: modelName
    };
  }

  const envLabels: Record<string, string> = {
    campus_lawn: 'Campus Green / Open Lawn',
    courtyard: 'Inner Quad / Enclosed Courtyard',
    terrace: 'Rooftop Terrace / Safe Overlook Deck',
    park: 'Public Park / Natural Clearing',
    urban_plaza: 'Pedestrian Town Plaza / Paved Alleyway',
    quiet_grove: 'Quiet Tree Grove / Shaded Woodland'
  };

  const groupLabels: Record<string, string> = {
    duo_trio: '2 to 3 players (duo or trio)',
    small_group: '4 to 6 players (small circle)',
    large_group: '7 to 12 players (large team)',
    crowd: '13+ players (open gathering)'
  };

  const moodLabels: Record<string, string> = {
    icebreaker: 'Connection & icebreaker (spark new friendships)',
    energetic: 'Playful movement & laughter (light physical energy)',
    observation: 'Stealth & quiet observation (noticing hidden outdoor details)',
    cooperative: 'Cooperative puzzle (working together to overcome a challenge)',
    mindful: 'Sensory grounding & de-stressing (calm outdoor reset)',
    improv: 'Creative storytelling & improv (using outdoor props & imagination)'
  };

  const accessibilityConstraints: string[] = [];
  if (request.accessibility.seatedOrLowMobility) {
    accessibilityConstraints.push('MUST be seated or low-mobility friendly (NO running, jumping, or fast movement required).');
  }
  if (request.accessibility.wheelchairAccessible) {
    accessibilityConstraints.push('MUST be 100% wheelchair accessible (flat, paved surfaces only, no stairs or unpaved mud/roots).');
  }
  if (request.accessibility.quietVoice) {
    accessibilityConstraints.push('Low-noise / shy-friendly (no loud shouting or performance pressure).');
  }
  if (request.accessibility.pavedOnly) {
    accessibilityConstraints.push('Remain strictly on paved paths and level ground.');
  }
  if (request.accessibility.customConstraint) {
    accessibilityConstraints.push(`User custom constraint: ${sanitizeText(request.accessibility.customConstraint)}`);
  }

  const systemInstruction = `You are GullyGames, an expert designer of collaborative, screen-free outdoor activities for college students, friends, and community groups.
Your goal is to get people to "Touch Grass" and interact with the physical world and each other.

STRICT DESIGN RULES:
1. Zero Equipment: The game MUST require ZERO props, cards, balls, or items. Only humans, voice, movement, and existing outdoor scenery.
2. Distraction-Free ("Pocket Mode"): The game is played with phones tucked away in pockets. Instructions must be easy to remember.
3. Safety & Ecology:
   - NEVER suggest climbing trees, walls, or high ledges.
   - NEVER suggest entering private property or trespassing.
   - NEVER suggest picking live flowers, peeling bark, breaking branches, or disturbing wildlife.
   - NEVER suggest blindfolded running or dashing across streets.
4. Duration: Split the total duration (${request.durationMinutes} minutes) into exactly 3 sequential timed steps.
5. Strict JSON Output: Output ONLY a valid JSON object matching the requested schema. No conversational preamble or trailing explanation.`;

  const userPrompt = `Create an original outdoor game for:
- Environment: ${envLabels[request.environment] || request.environment}
- Group Size: ${groupLabels[request.groupSize] || request.groupSize}
- Total Duration: ${request.durationMinutes} minutes
- Activity Mood: ${moodLabels[request.mood] || request.mood}
- Accessibility Constraints: ${accessibilityConstraints.length > 0 ? accessibilityConstraints.join(' ') : 'Standard open outdoor mobility.'}

Output JSON format:
{
  "title": "Creative, evocative title for the game",
  "tagline": "Catchy 1-sentence description",
  "premise": "2-3 sentences explaining what players do and why it creates connection in this specific space",
  "steps": [
    {
      "stepNumber": 1,
      "title": "Name of Step 1",
      "durationMinutes": ${Math.max(1, Math.floor(request.durationMinutes / 3))},
      "instruction": "Clear instructions for what the group does in this phase",
      "pocketTip": "1 concise sentence to remember while phone is in pocket"
    },
    {
      "stepNumber": 2,
      "title": "Name of Step 2",
      "durationMinutes": ${Math.max(1, Math.floor(request.durationMinutes / 3))},
      "instruction": "Clear instructions for the middle challenge or interactive phase",
      "pocketTip": "1 concise sentence to remember while phone is in pocket"
    },
    {
      "stepNumber": 3,
      "title": "Name of Step 3",
      "durationMinutes": ${request.durationMinutes - 2 * Math.max(1, Math.floor(request.durationMinutes / 3))},
      "instruction": "Clear instructions for concluding, celebrating, and debriefing",
      "pocketTip": "1 concise sentence to remember while phone is in pocket"
    }
  ],
  "safetyNotes": [
    "Specific safety tip for this environment",
    "Specific ecological respect tip",
    "Pedestrian/space awareness tip"
  ],
  "reflectionPrompt": "A single thoughtful question for the group to answer together at the end"
}`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.85
      }
    });

    const responseText = response.text;
    if (!responseText) {
      return {
        success: false,
        error: `Model ${modelName} returned an empty response.`,
        modelUsed: modelName
      };
    }

    let parsedJson: any;
    try {
      parsedJson = extractJsonFromText(responseText);
    } catch (parseErr: any) {
      return {
        success: false,
        error: `Failed to parse structured JSON from ${modelName}: ${parseErr.message}`,
        modelUsed: modelName
      };
    }

    const validation = validateAndSanitizeAiResponse(parsedJson, request, modelName);
    if (!validation.success || !validation.activity) {
      return {
        success: false,
        error: validation.error || 'AI output did not pass validation rules',
        modelUsed: modelName
      };
    }

    return {
      success: true,
      activity: validation.activity,
      modelUsed: modelName
    };
  } catch (err: any) {
    const errorMsg = err?.message || String(err);
    console.error(`Error calling Gemma model ${modelName}:`, errorMsg);
    return {
      success: false,
      error: `Gemma model inference error (${modelName}): ${errorMsg}`,
      modelUsed: modelName
    };
  }
}

/**
 * Summarize an outdoor group reflection using Gemma
 */
export async function summarizeReflection(
  gameTitle: string,
  userNotes: string,
  groupMood: string,
  rating: number
): Promise<{ success: boolean; takeaway?: string; error?: string; modelUsed: string }> {
  const modelName = DEFAULT_GEMMA_MODEL;
  const ai = getGenAiClient();

  if (!ai) {
    return {
      success: false,
      error: 'GEMINI_API_KEY is not configured',
      modelUsed: modelName
    };
  }

  const prompt = `You are GullyGames, a mindful outdoor activity facilitator.
A group just completed the outdoor game "${sanitizeText(gameTitle)}".
Their group mood was rated "${sanitizeText(groupMood)}" (${rating} / 5 stars).
Their participant notes: "${sanitizeText(userNotes)}".

Write a single, inspiring 1-2 sentence collective reflection takeaway acknowledging their real-world outdoor connection and encouragement to keep touching grass.
Keep it warm, organic, and grounded. Return plain text only.`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.7
      }
    });

    const text = response.text ? sanitizeText(response.text) : '';
    if (!text) {
      return {
        success: false,
        error: 'Empty reflection response',
        modelUsed: modelName
      };
    }

    return {
      success: true,
      takeaway: text,
      modelUsed: modelName
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || String(err),
      modelUsed: modelName
    };
  }
}
