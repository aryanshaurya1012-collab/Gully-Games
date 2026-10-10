import { GameActivity, EnvironmentId, GroupSizeId, DurationMinutes, MoodId } from '../src/types/game.js';

export const SAMPLE_ACTIVITIES: GameActivity[] = [
  {
    id: 'sample-campus-shadow-scout',
    title: 'The Living Sundial',
    tagline: 'Map the shifting shadows and find synchronous stillness',
    premise: 'A gentle cooperative spatial game where players discover how natural sunlight, university architecture, and tree canopies create moving boundaries across the lawn.',
    environment: 'campus_lawn',
    groupSize: 'small_group',
    durationMinutes: 10,
    mood: 'observation',
    steps: [
      {
        stepNumber: 1,
        title: 'Shadow Anchor',
        durationMinutes: 3,
        instruction: 'Spread out across the grass. Each player finds a distinct shadow cast by a building, lamppost, or tree. Stand at its tip and note where your own shadow points.',
        pocketTip: 'Phones in pockets. Look up at the tree canopy and horizon.'
      },
      {
        stepNumber: 2,
        title: 'The Silent Grid',
        durationMinutes: 4,
        instruction: 'Without speaking out loud, players must rearrange themselves so everyone is standing inside a contiguous connected line of shade or sun. Use hand gestures only.',
        pocketTip: 'No talking—communicate through eye contact and polite pointing.'
      },
      {
        stepNumber: 3,
        title: 'Sundial Pulse',
        durationMinutes: 3,
        instruction: 'Reconvene in a tight circle on the lawn. Take three deep outdoor breaths together. One person starts a slow clap rhythm that shifts around the circle.',
        pocketTip: 'Notice the temperature difference between shade and sunlight on your skin.'
      }
    ],
    safetyNotes: [
      'Stay on open grassy areas; watch for sprinklers or uneven ground divots.',
      'Do not pick any flowers or break tree branches.',
      'Maintain pedestrian right-of-way for other campus students.'
    ],
    reflectionPrompt: 'What architectural or natural shadow surprised you most about this lawn that you usually walk past without noticing?',
    equipmentNeeded: 'None — only open outdoor ground and daylight',
    isSample: true,
    modelUsed: 'Curated Open-Source Community Bank (Sample Mode)',
    generatedAt: new Date().toISOString()
  },
  {
    id: 'sample-courtyard-relay',
    title: 'Echoes of the Quad',
    tagline: 'Sound-mapping and cooperative micro-improv in the courtyard',
    premise: 'A fun icebreaker designed for inner quads where courtyard acoustics amplify subtle natural and human sounds.',
    environment: 'courtyard',
    groupSize: 'small_group',
    durationMinutes: 5,
    mood: 'icebreaker',
    steps: [
      {
        stepNumber: 1,
        title: 'The 60-Second Sound Sweep',
        durationMinutes: 2,
        instruction: 'Stand facing outward in a circle with eyes softly lowered. In absolute silence, count how many distinct non-screen sounds you can hear (wind, distant laughter, footsteps, birds).',
        pocketTip: 'Close your eyes or look at the pavement. Focus solely on your ears.'
      },
      {
        stepNumber: 2,
        title: 'Sound Pass',
        durationMinutes: 2,
        instruction: 'Turn inward. Player 1 shares one sound they heard. The person to their right adds a complementary sound or harmless mimic rhythm. Pass it around the circle.',
        pocketTip: 'Keep volume respectful so nearby classrooms or offices are not disturbed.'
      },
      {
        stepNumber: 3,
        title: 'Group Resonance',
        durationMinutes: 1,
        instruction: 'Pick one shared sound from the quad and do a 10-second collective hum or breath release in unison.',
        pocketTip: 'Check in with everyone with a smile or high five.'
      }
    ],
    safetyNotes: [
      'Respect indoor quiet zones adjacent to courtyard windows.',
      'Keep pathways clear for passersby and service staff.'
    ],
    reflectionPrompt: 'Which background sound existed the entire time before you consciously tuned your ears to it?',
    equipmentNeeded: 'None — your group presence and natural quad acoustics',
    isSample: true,
    modelUsed: 'Curated Open-Source Community Bank (Sample Mode)',
    generatedAt: new Date().toISOString()
  },
  {
    id: 'sample-park-energetic',
    title: 'The Forest Orbit',
    tagline: 'Dynamic group movement using park landmarks as gravity wells',
    premise: 'A playful outdoor movement game that uses park benches, distinct trees, and open clearings as cooperative rally points without any physical contact.',
    environment: 'park',
    groupSize: 'large_group',
    durationMinutes: 15,
    mood: 'energetic',
    steps: [
      {
        stepNumber: 1,
        title: 'Designate the Orbits',
        durationMinutes: 4,
        instruction: 'Identify 3 visible natural landmarks in your clear park space (e.g., the Oak Tree, the Stone Path Bench, the Flower Bed Border). Assign each landmark a silly pose.',
        pocketTip: 'Choose safe landmarks on flat ground. Phone securely stowed.'
      },
      {
        stepNumber: 2,
        title: 'Gravity Shifts',
        durationMinutes: 7,
        instruction: 'One player calls out a landmark name and a speed (e.g., "Slow-Motion Glide to the Oak!"). All players travel together at that pace, adopting the designated pose upon arrival.',
        pocketTip: 'Keep eyes up to avoid collisions. No running on wet roots.'
      },
      {
        stepNumber: 3,
        title: 'The Grand Constellation',
        durationMinutes: 4,
        instruction: 'Gather in the center. Everyone takes one step back, forming the largest circle possible while still holding eye contact and celebrating the sprint with group applause.',
        pocketTip: 'Catch your breath, feel the fresh air in your lungs.'
      }
    ],
    safetyNotes: [
      'Stick to designated public park trails and open turf.',
      'Watch your step for tree roots, gravel, and changes in grade.',
      'Do not trespass beyond park boundary ropes or garden enclosures.'
    ],
    reflectionPrompt: 'How did shifting physical speed and body posture change the mood of the group within 10 minutes?',
    equipmentNeeded: 'None — open park space and natural landmarks',
    isSample: true,
    modelUsed: 'Curated Open-Source Community Bank (Sample Mode)',
    generatedAt: new Date().toISOString()
  },
  {
    id: 'sample-urban-plaza-puzzle',
    title: 'The Urban Cartographers',
    tagline: 'Collaborative architectural sleuthing in pedestrian alleys',
    premise: 'A cooperative observation game where players discover hidden patterns, brickwork motifs, and quirky street details right under their noses.',
    environment: 'urban_plaza',
    groupSize: 'duo_trio',
    durationMinutes: 10,
    mood: 'cooperative',
    steps: [
      {
        stepNumber: 1,
        title: 'The Color & Texture Quest',
        durationMinutes: 3,
        instruction: 'Within a 30-meter radius of your meeting point, each person must locate 3 different building textures (e.g., worn red brick, brushed copper, rough concrete, polished stone).',
        pocketTip: 'Stay on sidewalks; look at architectural facades above and below.'
      },
      {
        stepNumber: 2,
        title: 'Pebble & Tile Rhythms',
        durationMinutes: 4,
        instruction: 'Reconvene and guide each other to the most unexpected texture you found. Trace the pattern with your finger in the air while describing its history.',
        pocketTip: 'Notice the work human hands put into crafting these buildings decades ago.'
      },
      {
        stepNumber: 3,
        title: 'The Plaza Keystone',
        durationMinutes: 3,
        instruction: 'Agree on one collective focal point in the plaza (a clock, arch, sculpture, or bench) and give it an honorary group nickname.',
        pocketTip: 'Phone remains tucked away. Celebrate your new mental map.'
      }
    ],
    safetyNotes: [
      'Strictly remain on pedestrian plazas; avoid active roadways and vehicle lanes.',
      'Do not touch utility equipment or electrical fixtures.',
      'Be polite to store owners and pedestrians.'
    ],
    reflectionPrompt: 'What architectural detail had you walked by dozens of times without ever actually looking at?',
    equipmentNeeded: 'None — existing urban streetscapes and buildings',
    isSample: true,
    modelUsed: 'Curated Open-Source Community Bank (Sample Mode)',
    generatedAt: new Date().toISOString()
  },
  {
    id: 'sample-terrace-mindful',
    title: 'Horizon Horizon',
    tagline: 'Open-air perspective and sensory reset above the campus',
    premise: 'A calming sensory restoration activity designed for balconies, safe rooftop terraces, and overlook perches.',
    environment: 'terrace',
    groupSize: 'small_group',
    durationMinutes: 5,
    mood: 'mindful',
    steps: [
      {
        stepNumber: 1,
        title: 'Distant Focus',
        durationMinutes: 2,
        instruction: 'Stand comfortably at least 2 meters from railings. Find the furthest physical point visible on the horizon (a mountain ridge, distant water tower, cloud line). Soften your gaze on it.',
        pocketTip: 'Rest your ciliary eye muscles after hours of close screen staring.'
      },
      {
        stepNumber: 2,
        title: 'Wind Direction Check',
        durationMinutes: 2,
        instruction: 'Close your eyes. Which cheek feels the breeze first? Turn slowly until you face directly into the wind and take 5 slow synchronized breaths with your group.',
        pocketTip: 'Feel the temperature of the air and the open space around your body.'
      },
      {
        stepNumber: 3,
        title: 'Gratitude Anchor',
        durationMinutes: 1,
        instruction: 'Turn toward one person in the group. Silently acknowledge the fresh air you just shared and say one thing you are looking forward to today.',
        pocketTip: 'Pocket mode complete. Stretch your shoulders back.'
      }
    ],
    safetyNotes: [
      'Stay strictly within designated, structurally sound terrace barriers.',
      'Do not sit on or lean over perimeter railings under any circumstances.',
      'Avoid running or horseplay on elevated surfaces.'
    ],
    reflectionPrompt: 'How did expanding your visual focal depth from 12 inches (phone screen) to the horizon affect your head and chest tension?',
    equipmentNeeded: 'None — an open sky view and safe elevated terrace',
    isSample: true,
    modelUsed: 'Curated Open-Source Community Bank (Sample Mode)',
    generatedAt: new Date().toISOString()
  },
  {
    id: 'sample-grove-improv',
    title: 'The Council of the Grove',
    tagline: 'Whimsical collaborative micro-storytelling under the trees',
    premise: 'A creative improv circle where players assign imaginary personalities to nearby trees and craft a short collaborative fable.',
    environment: 'quiet_grove',
    groupSize: 'small_group',
    durationMinutes: 10,
    mood: 'improv',
    steps: [
      {
        stepNumber: 1,
        title: 'Tree Introductions',
        durationMinutes: 3,
        instruction: 'Form a loose circle under the trees. Each player picks one tree in sight and gives it a whimsical persona (e.g., "The Professor Birch", "The Slouching Pine").',
        pocketTip: 'Look at the bark texture and angle of the boughs.'
      },
      {
        stepNumber: 2,
        title: 'The One-Sentence Tale',
        durationMinutes: 4,
        instruction: 'Tell a continuous group story where each person adds exactly ONE sentence about what the trees witnessed this morning. Keep it humorous and lighthearted.',
        pocketTip: 'Listen attentively to whoever is speaking; no phones out.'
      },
      {
        stepNumber: 3,
        title: 'The Tree Oath',
        durationMinutes: 3,
        instruction: 'Wrap up the story. Touch the grass or ground gently with the soles of your shoes, acknowledging the grove that hosted your tale.',
        pocketTip: 'Give a round of applause to each storyteller.'
      }
    ],
    safetyNotes: [
      'Do not peel bark, pull moss, or snap branches.',
      'Stay alert for low-hanging branches and exposed roots.',
      'Leave the natural area clean—pack out any trash.'
    ],
    reflectionPrompt: 'When was the last time you allowed yourself to play with spontaneous imagination outside without any digital device?',
    equipmentNeeded: 'None — shade of trees and collective imagination',
    isSample: true,
    modelUsed: 'Curated Open-Source Community Bank (Sample Mode)',
    generatedAt: new Date().toISOString()
  }
];

export function getMatchingSampleActivity(
  env?: EnvironmentId,
  groupSize?: GroupSizeId,
  duration?: DurationMinutes,
  mood?: MoodId
): GameActivity {
  // Try exact match on mood or env
  const found = SAMPLE_ACTIVITIES.find(
    (a) => (env && a.environment === env) || (mood && a.mood === mood)
  ) || SAMPLE_ACTIVITIES[0];

  // Return a cloned version with requested parameters customized if needed
  return {
    ...found,
    id: `sample-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    environment: env || found.environment,
    groupSize: groupSize || found.groupSize,
    durationMinutes: duration || found.durationMinutes,
    mood: mood || found.mood,
    generatedAt: new Date().toISOString()
  };
}
