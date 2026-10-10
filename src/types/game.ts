export type EnvironmentId = 
  | 'campus_lawn'
  | 'courtyard'
  | 'terrace'
  | 'park'
  | 'urban_plaza'
  | 'quiet_grove';

export interface EnvironmentOption {
  id: EnvironmentId;
  label: string;
  description: string;
  iconName: string;
}

export type GroupSizeId = 'duo_trio' | 'small_group' | 'large_group' | 'crowd';

export interface GroupSizeOption {
  id: GroupSizeId;
  label: string;
  rangeText: string;
  description: string;
}

export type DurationMinutes = 5 | 10 | 15;

export type MoodId = 
  | 'icebreaker'
  | 'energetic'
  | 'observation'
  | 'cooperative'
  | 'mindful'
  | 'improv';

export interface MoodOption {
  id: MoodId;
  label: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface AccessibilitySettings {
  seatedOrLowMobility: boolean;
  wheelchairAccessible: boolean;
  quietVoice: boolean;
  pavedOnly: boolean;
  customConstraint?: string;
}

export interface GameStep {
  stepNumber: number;
  title: string;
  durationMinutes: number;
  instruction: string;
  pocketTip: string;
}

export interface GameActivity {
  id: string;
  title: string;
  tagline: string;
  premise: string;
  environment: EnvironmentId;
  groupSize: GroupSizeId;
  durationMinutes: DurationMinutes;
  mood: MoodId;
  accessibilitySettings?: AccessibilitySettings;
  steps: GameStep[];
  safetyNotes: string[];
  reflectionPrompt: string;
  equipmentNeeded: string;
  isSample: boolean;
  modelUsed: string;
  generatedAt: string;
}

export interface ActivityGenerationRequest {
  environment: EnvironmentId;
  groupSize: GroupSizeId;
  durationMinutes: DurationMinutes;
  mood: MoodId;
  accessibility: AccessibilitySettings;
}

export interface GameReflection {
  id: string;
  gameId: string;
  gameTitle: string;
  environment: string;
  durationMinutes: number;
  completedAt: string;
  rating: number; // 1 - 5
  groupMood: string;
  memorableMoment: string;
  aiTakeaway?: string;
}
