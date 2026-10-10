import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { generateOutdoorActivity, summarizeReflection, getGemmaModelInfo, DEFAULT_GEMMA_MODEL } from './server/gemma.js';
import { validateActivityRequest } from './server/validation.js';
import { SAMPLE_ACTIVITIES, getMatchingSampleActivity } from './server/sampleActivities.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Health and Model Info API
  app.get('/api/model-info', (_req, res) => {
    res.json(getGemmaModelInfo());
  });

  // Curated samples endpoint
  app.get('/api/samples', (_req, res) => {
    res.json({
      activities: SAMPLE_ACTIVITIES,
      total: SAMPLE_ACTIVITIES.length
    });
  });

  // Generate Activity API
  app.post('/api/generate-activity', async (req, res) => {
    const { forceSample, ...activityParams } = req.body || {};

    const validation = validateActivityRequest(activityParams);
    if (!validation.valid || !validation.data) {
      return res.status(400).json({
        success: false,
        error: validation.error || 'Invalid activity parameters'
      });
    }

    const request = validation.data;

    // Explicit sample request bypasses AI
    if (forceSample) {
      const sample = getMatchingSampleActivity(
        request.environment,
        request.groupSize,
        request.durationMinutes,
        request.mood
      );
      return res.json({
        success: true,
        activity: sample,
        isSample: true,
        notice: 'Loaded curated offline sample activity per user request.'
      });
    }

    // Call Gemma open-weight model
    try {
      const gemmaResult = await generateOutdoorActivity(request);

      if (gemmaResult.success && gemmaResult.activity) {
        return res.json({
          success: true,
          activity: gemmaResult.activity,
          isSample: false,
          modelUsed: gemmaResult.modelUsed
        });
      }

      // If Gemma call fails (e.g., missing API key, rate limit, endpoint downtime),
      // provide descriptive failure details and clearly offer a curated sample activity
      const fallbackSample = getMatchingSampleActivity(
        request.environment,
        request.groupSize,
        request.durationMinutes,
        request.mood
      );

      return res.status(200).json({
        success: false,
        error: gemmaResult.error || 'Gemma open-weight model was unavailable.',
        modelUsed: gemmaResult.modelUsed || DEFAULT_GEMMA_MODEL,
        canUseSample: true,
        fallbackActivity: fallbackSample
      });
    } catch (err: any) {
      const fallbackSample = getMatchingSampleActivity(
        request.environment,
        request.groupSize,
        request.durationMinutes,
        request.mood
      );

      return res.status(500).json({
        success: false,
        error: `Unexpected server error while querying Gemma: ${err?.message || err}`,
        modelUsed: DEFAULT_GEMMA_MODEL,
        canUseSample: true,
        fallbackActivity: fallbackSample
      });
    }
  });

  // Summarize Reflection API
  app.post('/api/summarize-reflection', async (req, res) => {
    const { gameTitle, userNotes, groupMood, rating } = req.body || {};

    if (!gameTitle || !userNotes) {
      return res.status(400).json({
        success: false,
        error: 'Missing gameTitle or userNotes'
      });
    }

    try {
      const result = await summarizeReflection(
        String(gameTitle),
        String(userNotes),
        String(groupMood || 'happy'),
        Number(rating || 5)
      );

      if (result.success && result.takeaway) {
        return res.json({
          success: true,
          takeaway: result.takeaway,
          modelUsed: result.modelUsed,
          isSample: false
        });
      }

      // Fallback mindful takeaway if Gemma is unavailable
      const fallbackTakeaway = `Your group brought spontaneous energy into the open air during "${gameTitle}" — every moment spent with eyes up and phones away grounds us deeper in community.`;

      return res.json({
        success: true,
        takeaway: fallbackTakeaway,
        modelUsed: 'Curated Fallback',
        isSample: true,
        note: result.error || 'Gemma unavailable, used fallback reflection summary.'
      });
    } catch (err: any) {
      return res.json({
        success: true,
        takeaway: `Outdoor connection creates lasting memories. Thank you for stepping outside with your group!`,
        modelUsed: 'Curated Fallback',
        isSample: true
      });
    }
  });

  // Mount Vite or static dist
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GullyGames server active at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting GullyGames server:', err);
  process.exit(1);
});
