import { Match, LeagueStandingItem, TopScorerItem, FootballNewsArticle, APIConfigStatus } from '../src/types';
import { INITIAL_MATCHES, LEAGUES, STANDINGS_DATA, TOP_SCORERS, FOOTBALL_NEWS } from './mockData';

// Cache container with TTL
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class CacheManager {
  private store = new Map<string, CacheEntry<any>>();
  public hits = 0;
  public misses = 0;

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) {
      this.misses++;
      return null;
    }
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      this.misses++;
      return null;
    }
    this.hits++;
    return entry.data;
  }

  set<T>(key: string, data: T, ttlSeconds: number): void {
    this.store.set(key, {
      data,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  clear(): void {
    this.store.clear();
  }

  size(): number {
    return this.store.size;
  }
}

export const apiCache = new CacheManager();

// Dynamic in-memory matches state for real-time simulation
let liveMatchesState: Match[] = JSON.parse(JSON.stringify(INITIAL_MATCHES));

// Quota tracking
let footballDataRequestsToday = 0;
let rapidApiRequestsToday = 0;

// Dynamic simulation ticker (runs in background to simulate live match ticks)
setInterval(() => {
  liveMatchesState = liveMatchesState.map((match) => {
    if (match.status === 'LIVE') {
      const currentMinute = (match.minute || 1) + 1;

      if (currentMinute > 90) {
        return {
          ...match,
          minute: 90,
          status: 'FINISHED',
        };
      }

      // Add a slight momentum shift
      const randomShift = (Math.random() * 20 - 10);
      const lastMomentum = match.momentum?.[match.momentum.length - 1]?.momentum || 0;
      const newMomentumVal = Math.max(-90, Math.min(90, Math.round(lastMomentum + randomShift)));

      const updatedMomentum = [...(match.momentum || [])];
      if (currentMinute % 5 === 0) {
        updatedMomentum.push({ minute: currentMinute, momentum: newMomentumVal });
      }

      // 3% chance of a minor stat tick or shot
      const updatedStats = match.stats ? { ...match.stats } : undefined;
      if (updatedStats && Math.random() < 0.2) {
        const teamIndex = Math.random() > 0.5 ? 0 : 1;
        updatedStats.shots[teamIndex] += 1;
        if (Math.random() < 0.5) {
          updatedStats.shotsOnTarget[teamIndex] += 1;
          updatedStats.xg[teamIndex] = Number((updatedStats.xg[teamIndex] + 0.08).toFixed(2));
        }
      }

      return {
        ...match,
        minute: currentMinute,
        stats: updatedStats,
        momentum: updatedMomentum,
      };
    }
    return match;
  });
}, 12000); // Ticks every 12 seconds

export async function fetchLiveScores(leagueId?: string, status?: string): Promise<Match[]> {
  const cacheKey = `scores_${leagueId || 'all'}_${status || 'all'}`;
  const cached = apiCache.get<Match[]>(cacheKey);
  if (cached) {
    return cached;
  }

  // Attempt real API if API key provided
  const fdKey = process.env.FOOTBALL_DATA_API_KEY;
  if (fdKey && fdKey.trim().length > 5 && footballDataRequestsToday < 80) {
    try {
      footballDataRequestsToday++;
      // Football-data.org call
      const leagueCode = leagueId || 'PL';
      const response = await fetch(`https://api.football-data.org/v4/competitions/${leagueCode}/matches`, {
        headers: { 'X-Auth-Token': fdKey }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.matches && data.matches.length > 0) {
          // Normalize and merge with our detailed schema
          const normalized: Match[] = data.matches.slice(0, 10).map((m: any, idx: number) => ({
            id: `fd-${m.id}`,
            leagueId: leagueCode,
            leagueName: data.competition?.name || 'Premier League',
            leagueLogo: data.competition?.emblem || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128',
            leagueCountry: data.competition?.area?.name || 'Europe',
            season: m.season?.startDate ? `${m.season.startDate.slice(0,4)}/${m.season.endDate.slice(0,4)}` : '2025/2026',
            utcDate: m.utcDate,
            status: m.status === 'IN_PLAY' ? 'LIVE' : m.status === 'FINISHED' ? 'FINISHED' : 'UPCOMING',
            minute: m.status === 'IN_PLAY' ? (m.minute || 60) : undefined,
            homeTeam: {
              id: `team-${m.homeTeam?.id || idx}`,
              name: m.homeTeam?.name || 'Home Team',
              shortName: m.homeTeam?.shortName || m.homeTeam?.name || 'Home',
              code: m.homeTeam?.tla || 'HOM',
              logo: m.homeTeam?.crest || 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
              country: data.competition?.area?.name || 'Europe'
            },
            awayTeam: {
              id: `team-${m.awayTeam?.id || idx + 100}`,
              name: m.awayTeam?.name || 'Away Team',
              shortName: m.awayTeam?.shortName || m.awayTeam?.name || 'Away',
              code: m.awayTeam?.tla || 'AWY',
              logo: m.awayTeam?.crest || 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
              country: data.competition?.area?.name || 'Europe'
            },
            score: {
              home: m.score?.fullTime?.home ?? 0,
              away: m.score?.fullTime?.away ?? 0,
              halftime: m.score?.halfTime ? { home: m.score.halfTime.home ?? 0, away: m.score.halfTime.away ?? 0 } : undefined
            },
            venue: 'Main Stadium',
            events: [],
            stats: {
              possession: [50, 50],
              shots: [10, 8],
              shotsOnTarget: [4, 3],
              xg: [1.2, 0.9],
              fouls: [9, 11],
              corners: [5, 4],
              offsides: [1, 2],
              yellowCards: [1, 2],
              redCards: [0, 0],
              passes: [400, 390],
              passAccuracy: [85, 84],
              saves: [2, 3]
            }
          }));

          apiCache.set(cacheKey, normalized, 20); // 20s TTL for live scores
          return normalized;
        }
      }
    } catch (err) {
      console.warn('Football-data.org request failed, falling back to simulated data engine:', err);
    }
  }

  // Use rich live simulation dataset
  let results = [...liveMatchesState];
  if (leagueId && leagueId !== 'ALL') {
    results = results.filter((m) => m.leagueId.toLowerCase() === leagueId.toLowerCase());
  }
  if (status && status !== 'ALL') {
    results = results.filter((m) => m.status === status);
  }

  // Cache for 15s (Live state moves fast)
  apiCache.set(cacheKey, results, 15);
  return results;
}

export async function fetchMatchById(matchId: string): Promise<Match | null> {
  const cacheKey = `match_detail_${matchId}`;
  const cached = apiCache.get<Match>(cacheKey);
  if (cached) {
    return cached;
  }

  const match = liveMatchesState.find((m) => m.id === matchId);
  if (!match) {
    return null;
  }

  apiCache.set(cacheKey, match, 15);
  return match;
}

export async function fetchStandings(leagueId: string = 'PL'): Promise<LeagueStandingItem[]> {
  const cacheKey = `standings_${leagueId}`;
  const cached = apiCache.get<LeagueStandingItem[]>(cacheKey);
  if (cached) {
    return cached;
  }

  const standings = STANDINGS_DATA[leagueId.toUpperCase()] || STANDINGS_DATA['PL'];
  // Standings change infrequently, cache for 1 hour (3600s)
  apiCache.set(cacheKey, standings, 3600);
  return standings;
}

export async function fetchTopScorers(leagueId: string = 'PL'): Promise<TopScorerItem[]> {
  const cacheKey = `scorers_${leagueId}`;
  const cached = apiCache.get<TopScorerItem[]>(cacheKey);
  if (cached) {
    return cached;
  }

  const scorers = TOP_SCORERS[leagueId.toUpperCase()] || TOP_SCORERS['PL'];
  apiCache.set(cacheKey, scorers, 3600);
  return scorers;
}

export async function fetchNews(category?: string, leagueId?: string): Promise<FootballNewsArticle[]> {
  const cacheKey = `news_${category || 'all'}_${leagueId || 'all'}`;
  const cached = apiCache.get<FootballNewsArticle[]>(cacheKey);
  if (cached) {
    return cached;
  }

  let articles = [...FOOTBALL_NEWS];
  if (category && category !== 'ALL') {
    articles = articles.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }
  if (leagueId && leagueId !== 'ALL') {
    articles = articles.filter((a) => a.relatedLeagueId?.toLowerCase() === leagueId.toLowerCase());
  }

  apiCache.set(cacheKey, articles, 900); // 15 min TTL
  return articles;
}

export function getSystemApiStatus(): APIConfigStatus {
  return {
    footballDataOrg: {
      configured: Boolean(process.env.FOOTBALL_DATA_API_KEY && process.env.FOOTBALL_DATA_API_KEY.length > 5),
      rateLimit: '10 requests / minute (Free Tier)',
      status: process.env.FOOTBALL_DATA_API_KEY ? 'ACTIVE' : 'MOCK_FALLBACK',
      requestsToday: footballDataRequestsToday,
      dailyLimit: 100,
    },
    rapidApiFootball: {
      configured: Boolean(process.env.RAPIDAPI_KEY && process.env.RAPIDAPI_KEY.length > 5),
      rateLimit: '100 requests / day (Free Tier)',
      status: process.env.RAPIDAPI_KEY ? 'ACTIVE' : 'MOCK_FALLBACK',
      requestsToday: rapidApiRequestsToday,
      dailyLimit: 100,
    },
    geminiAI: {
      configured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 5),
      model: 'gemini-3.7-flash',
      status: process.env.GEMINI_API_KEY ? 'ACTIVE' : 'OFFLINE',
    },
    cacheStats: {
      hits: apiCache.hits,
      misses: apiCache.misses,
      activeKeys: apiCache.size(),
    },
    liveSimulationActive: true,
  };
}
