import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import {
  fetchLiveScores,
  fetchMatchById,
  fetchStandings,
  fetchTopScorers,
  fetchNews,
  getSystemApiStatus,
} from './server/footballApi';
import {
  analyzeMatchWithAI,
  preMatchPreviewWithAI,
  askFootballAnalystAI,
} from './server/geminiService';
import { LEAGUES } from './server/mockData';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.get('/api/leagues', (req, res) => {
    res.json({ leagues: LEAGUES });
  });

  app.get('/api/scores', async (req, res) => {
    try {
      const { league, status } = req.query;
      const matches = await fetchLiveScores(league as string, status as string);
      res.json({ matches });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to fetch scores' });
    }
  });

  app.get('/api/matches/:id', async (req, res) => {
    try {
      const match = await fetchMatchById(req.params.id);
      if (!match) {
        return res.status(404).json({ error: 'Match not found' });
      }
      res.json({ match });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to fetch match' });
    }
  });

  app.get('/api/standings/:leagueId', async (req, res) => {
    try {
      const standings = await fetchStandings(req.params.leagueId);
      res.json({ standings });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to fetch standings' });
    }
  });

  app.get('/api/scorers/:leagueId', async (req, res) => {
    try {
      const scorers = await fetchTopScorers(req.params.leagueId);
      res.json({ scorers });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to fetch scorers' });
    }
  });

  app.get('/api/news', async (req, res) => {
    try {
      const { category, league } = req.query;
      const news = await fetchNews(category as string, league as string);
      res.json({ news });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to fetch news' });
    }
  });

  app.post('/api/ai/match-analysis', async (req, res) => {
    try {
      const { matchId } = req.body;
      let match = req.body.match;
      if (!match && matchId) {
        match = await fetchMatchById(matchId);
      }
      if (!match) {
        return res.status(400).json({ error: 'Valid match data or matchId required' });
      }

      const analysis = await analyzeMatchWithAI(match);
      res.json({ analysis });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to generate AI analysis' });
    }
  });

  app.post('/api/ai/pre-match', async (req, res) => {
    try {
      const { matchId } = req.body;
      let match = req.body.match;
      if (!match && matchId) {
        match = await fetchMatchById(matchId);
      }
      if (!match) {
        return res.status(400).json({ error: 'Valid match data or matchId required' });
      }

      const preview = await preMatchPreviewWithAI(match);
      res.json({ preview });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to generate pre-match AI preview' });
    }
  });

  app.post('/api/ai/ask-analyst', async (req, res) => {
    try {
      const { query, history } = req.body;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Query string is required' });
      }

      const response = await askFootballAnalystAI(query, history || []);
      res.json(response);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to query football analyst' });
    }
  });

  app.get('/api/system/status', (req, res) => {
    const status = getSystemApiStatus();
    res.json({ status });
  });

  // Vite middleware setup for dev vs production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Live Soccer Scores & Football Intelligence server running on http://localhost:${PORT}`);
  });
}

startServer();
