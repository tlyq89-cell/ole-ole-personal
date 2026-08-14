export type MatchStatus = 'LIVE' | 'FINISHED' | 'UPCOMING' | 'HT' | 'ET' | 'PEN' | 'POSTPONED';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  code: string;
  logo: string;
  country: string;
  founded?: number;
  stadium?: string;
  capacity?: number;
  manager?: string;
  colors?: {
    primary: string;
    secondary: string;
  };
}

export interface MatchScore {
  home: number;
  away: number;
  halftime?: {
    home: number;
    away: number;
  };
  extraTime?: {
    home: number;
    away: number;
  };
  penalties?: {
    home: number;
    away: number;
  };
}

export interface MatchEvent {
  id: string;
  minute: number;
  extraMinute?: number;
  teamId: string;
  type: 'goal' | 'penalty_goal' | 'own_goal' | 'yellow_card' | 'red_card' | 'substitution' | 'var_decision';
  playerName: string;
  assistPlayerName?: string;
  subInPlayerName?: string;
  subOutPlayerName?: string;
  description?: string;
}

export interface MatchStats {
  possession: [number, number]; // [home, away] %
  shots: [number, number];
  shotsOnTarget: [number, number];
  xg: [number, number]; // Expected goals
  fouls: [number, number];
  corners: [number, number];
  offsides: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  passes: [number, number];
  passAccuracy: [number, number]; // %
  saves: [number, number];
}

export interface PlayerLineup {
  id: string;
  name: string;
  number: number;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  grid?: string; // e.g. "4:3" for coordinates
  rating?: number; // e.g. 7.8
  isCaptain?: boolean;
  events?: {
    goals?: number;
    yellowCards?: number;
    redCard?: boolean;
    subMinute?: number;
  };
}

export interface TeamLineup {
  formation: string; // e.g. "4-3-3"
  startingXI: PlayerLineup[];
  substitutes: PlayerLineup[];
  coach: string;
}

export interface MatchLineups {
  home: TeamLineup;
  away: TeamLineup;
}

export interface MomentumPoint {
  minute: number;
  momentum: number; // -100 (heavy away) to +100 (heavy home)
  eventLabel?: string;
}

export interface Match {
  id: string;
  leagueId: string;
  leagueName: string;
  leagueLogo: string;
  leagueCountry: string;
  season: string;
  matchday?: number;
  round?: string;
  utcDate: string;
  status: MatchStatus;
  minute?: number;
  homeTeam: Team;
  awayTeam: Team;
  score: MatchScore;
  venue: string;
  referee?: string;
  events: MatchEvent[];
  stats?: MatchStats;
  lineups?: MatchLineups;
  momentum?: MomentumPoint[];
  aiAnalysis?: MatchAIAnalysis;
  preMatchPreview?: PreMatchAIPreview;
}

export interface MatchAIAnalysis {
  matchId: string;
  timestamp: string;
  headline: string;
  tacticalSummary: string;
  whyTeamWonLost: string;
  turningPoints: {
    minute: number;
    description: string;
    impact: 'High' | 'Crucial' | 'Decisive';
  }[];
  keyPlayerPerformances: {
    playerName: string;
    team: string;
    rating: number;
    verdict: string;
  }[];
  managerTacticalBattle: string;
  xgVerdict: string;
}

export interface PreMatchAIPreview {
  matchId: string;
  keyTacticalClash: string;
  playersToWatch: string[];
  predictedOutcome: string;
  winProbability: {
    home: number;
    draw: number;
    away: number;
  };
  tacticalAdvice: string;
}

export interface LeagueStandingItem {
  position: number;
  team: Team;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form: ('W' | 'D' | 'L')[];
  qualification?: 'UCL' | 'UEL' | 'UECL' | 'RELEGATION' | 'NONE';
}

export interface TopScorerItem {
  rank: number;
  player: {
    id: string;
    name: string;
    teamName: string;
    teamLogo: string;
    nationality: string;
  };
  goals: number;
  assists: number;
  penalties: number;
  playedMatches: number;
}

export interface League {
  id: string;
  name: string;
  code: string;
  country: string;
  countryFlag: string;
  logo: string;
  season: string;
  currentMatchday: number;
}

export interface FootballNewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  sourceUrl?: string;
  publishedAt: string;
  imageUrl: string;
  category: 'Breaking' | 'Transfer' | 'Tactics' | 'Match Review' | 'Injury' | 'Champions League';
  relatedLeagueId?: string;
  relatedTeamNames?: string[];
  aiDigest?: string[];
}

export interface APIConfigStatus {
  footballDataOrg: {
    configured: boolean;
    rateLimit: string;
    status: 'ACTIVE' | 'MOCK_FALLBACK' | 'ERROR';
    requestsToday: number;
    dailyLimit: number;
  };
  rapidApiFootball: {
    configured: boolean;
    rateLimit: string;
    status: 'ACTIVE' | 'MOCK_FALLBACK' | 'ERROR';
    requestsToday: number;
    dailyLimit: number;
  };
  geminiAI: {
    configured: boolean;
    model: string;
    status: 'ACTIVE' | 'OFFLINE';
  };
  cacheStats: {
    hits: number;
    misses?: number;
    activeKeys: number;
  };
  liveSimulationActive: boolean;
}

export type MembershipTierId = 'normal' | 'silver_trial' | 'silver' | 'gold' | 'platinum';

export interface MembershipPlan {
  id: MembershipTierId;
  name: string;
  pricePerYear: number;
  period: string;
  badge?: string;
  badgeColor?: string;
  isPopular?: boolean;
  description: string;
  streamingPerk: string;
  ticketDiscountPercent: number;
  merchDiscountPercent: number;
  streamingDiscountPercent?: number;
  auctionAccess: boolean;
  auctionTierAllowed: 'none' | 'silver' | 'gold' | 'platinum';
  features: string[];
}

export interface UserSubscription {
  tier: MembershipTierId;
  status?: 'active' | 'trial' | 'expired';
  expiresAt?: string;
  subscribedAt?: string;
  trialDaysLeft?: number;
  selectedFreeLeague?: string; // for Gold/Platinum
  includesUCL?: boolean; // for Platinum
  totalSavedUSD?: number;
}

export interface AuctionItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Signed Jersey' | 'VIP Match Box' | 'Match Ball' | 'Signed Boots' | 'Historic Trophy Replica' | string;
  imageUrl: string;
  currentBidUSD: number;
  startingBidUSD: number;
  minNextBidUSD: number;
  bidStepUSD?: number;
  totalBids: number;
  endsAt: string; // ISO date string
  minTier: 'silver' | 'gold' | 'platinum';
  club: string;
  certificateOfAuthenticity: boolean;
  topBidder?: string;
  highestBidderName?: string;
  bidsHistory?: {
    bidder: string;
    amount: number;
    timestamp: string;
  }[];
}
