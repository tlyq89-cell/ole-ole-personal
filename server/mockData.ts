import { Match, League, LeagueStandingItem, TopScorerItem, FootballNewsArticle } from '../src/types';

export const LEAGUES: League[] = [
  {
    id: 'PL',
    name: 'Premier League',
    code: 'PL',
    country: 'England',
    countryFlag: '🇬🇧',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=60',
    season: '2025/2026',
    currentMatchday: 28,
  },
  {
    id: 'CL',
    name: 'UEFA Champions League',
    code: 'CL',
    country: 'Europe',
    countryFlag: '🇪🇺',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=128&auto=format&fit=crop&q=60',
    season: '2025/2026',
    currentMatchday: 7,
  },
  {
    id: 'PD',
    name: 'La Liga',
    code: 'PD',
    country: 'Spain',
    countryFlag: '🇪🇸',
    logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=128&auto=format&fit=crop&q=60',
    season: '2025/2026',
    currentMatchday: 27,
  },
  {
    id: 'SA',
    name: 'Serie A',
    code: 'SA',
    country: 'Italy',
    countryFlag: '🇮🇹',
    logo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=128&auto=format&fit=crop&q=60',
    season: '2025/2026',
    currentMatchday: 27,
  },
  {
    id: 'BL1',
    name: 'Bundesliga',
    code: 'BL1',
    country: 'Germany',
    countryFlag: '🇩🇪',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=60',
    season: '2025/2026',
    currentMatchday: 26,
  }
];

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'match-pl-1',
    leagueId: 'PL',
    leagueName: 'Premier League',
    leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=60',
    leagueCountry: 'England',
    season: '2025/2026',
    matchday: 28,
    utcDate: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
    status: 'LIVE',
    minute: 74,
    venue: 'Emirates Stadium, London',
    referee: 'Michael Oliver',
    homeTeam: {
      id: 'arsenal',
      name: 'Arsenal',
      shortName: 'Arsenal',
      code: 'ARS',
      logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
      country: 'England',
      stadium: 'Emirates Stadium',
      capacity: 60704,
      manager: 'Mikel Arteta',
      colors: { primary: '#EF0107', secondary: '#FFFFFF' }
    },
    awayTeam: {
      id: 'mancity',
      name: 'Manchester City',
      shortName: 'Man City',
      code: 'MCI',
      logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
      country: 'England',
      stadium: 'Etihad Stadium',
      capacity: 53400,
      manager: 'Pep Guardiola',
      colors: { primary: '#6CABDD', secondary: '#1C2C5B' }
    },
    score: {
      home: 2,
      away: 1,
      halftime: { home: 1, away: 1 }
    },
    events: [
      {
        id: 'ev-1',
        minute: 19,
        teamId: 'mancity',
        type: 'goal',
        playerName: 'Erling Haaland',
        assistPlayerName: 'Kevin De Bruyne',
        description: 'Haaland bullets a low header into the bottom right corner from De Bruyne pinpoint cross.'
      },
      {
        id: 'ev-2',
        minute: 34,
        teamId: 'arsenal',
        type: 'yellow_card',
        playerName: 'Declan Rice',
        description: 'Tactical foul breaking up a counter-attack in midfield.'
      },
      {
        id: 'ev-3',
        minute: 42,
        teamId: 'arsenal',
        type: 'goal',
        playerName: 'Bukayo Saka',
        assistPlayerName: 'Martin Ødegaard',
        description: 'Saka cuts inside from the right flank and curls a sublime left-footed shot into the top far corner.'
      },
      {
        id: 'ev-4',
        minute: 58,
        teamId: 'arsenal',
        type: 'goal',
        playerName: 'Kai Havertz',
        assistPlayerName: 'Gabriel Martinelli',
        description: 'Havertz taps in rebound after Martinelli ferocious drive is parried by Ederson.'
      },
      {
        id: 'ev-5',
        minute: 68,
        teamId: 'mancity',
        type: 'substitution',
        playerName: 'Phil Foden',
        subInPlayerName: 'Phil Foden',
        subOutPlayerName: 'Jack Grealish',
        description: 'Guardiola introduces Foden to inject vertical thrust into the final third.'
      }
    ],
    stats: {
      possession: [48, 52],
      shots: [14, 11],
      shotsOnTarget: [6, 4],
      xg: [1.84, 1.32],
      fouls: [10, 8],
      corners: [6, 5],
      offsides: [2, 1],
      yellowCards: [2, 1],
      redCards: [0, 0],
      passes: [412, 458],
      passAccuracy: [86, 89],
      saves: [3, 4]
    },
    momentum: [
      { minute: 10, momentum: -20 },
      { minute: 19, momentum: -65, eventLabel: 'Haaland 19\'' },
      { minute: 30, momentum: 15 },
      { minute: 42, momentum: 75, eventLabel: 'Saka 42\'' },
      { minute: 45, momentum: 40 },
      { minute: 58, momentum: 85, eventLabel: 'Havertz 58\'' },
      { minute: 70, momentum: 35 }
    ],
    lineups: {
      home: {
        formation: '4-3-3',
        coach: 'Mikel Arteta',
        startingXI: [
          { id: 'p-1', name: 'David Raya', number: 22, position: 'GK', rating: 7.2 },
          { id: 'p-2', name: 'Ben White', number: 4, position: 'DF', rating: 7.4 },
          { id: 'p-3', name: 'William Saliba', number: 2, position: 'DF', rating: 8.1 },
          { id: 'p-4', name: 'Gabriel Magalhães', number: 6, position: 'DF', rating: 7.9 },
          { id: 'p-5', name: 'Jurriën Timber', number: 12, position: 'DF', rating: 7.3 },
          { id: 'p-6', name: 'Martin Ødegaard', number: 8, position: 'MF', rating: 8.4, isCaptain: true },
          { id: 'p-7', name: 'Thomas Partey', number: 5, position: 'MF', rating: 7.5 },
          { id: 'p-8', name: 'Declan Rice', number: 41, position: 'MF', rating: 8.0 },
          { id: 'p-9', name: 'Bukayo Saka', number: 7, position: 'FW', rating: 8.7 },
          { id: 'p-10', name: 'Kai Havertz', number: 29, position: 'FW', rating: 8.2 },
          { id: 'p-11', name: 'Gabriel Martinelli', number: 11, position: 'FW', rating: 7.8 }
        ],
        substitutes: [
          { id: 's-1', name: 'Aaron Ramsdale', number: 1, position: 'GK' },
          { id: 's-2', name: 'Jakub Kiwior', number: 15, position: 'DF' },
          { id: 's-3', name: 'Jorginho', number: 20, position: 'MF' },
          { id: 's-4', name: 'Leandro Trossard', number: 19, position: 'FW' },
          { id: 's-5', name: 'Gabriel Jesus', number: 9, position: 'FW' }
        ]
      },
      away: {
        formation: '4-1-4-1',
        coach: 'Pep Guardiola',
        startingXI: [
          { id: 'p-21', name: 'Ederson', number: 31, position: 'GK', rating: 6.8 },
          { id: 'p-22', name: 'Kyle Walker', number: 2, position: 'DF', rating: 6.9, isCaptain: true },
          { id: 'p-23', name: 'Rúben Dias', number: 3, position: 'DF', rating: 7.1 },
          { id: 'p-24', name: 'Manuel Akanji', number: 25, position: 'DF', rating: 7.0 },
          { id: 'p-25', name: 'Joško Gvardiol', number: 24, position: 'DF', rating: 7.2 },
          { id: 'p-26', name: 'Rodri', number: 16, position: 'MF', rating: 7.6 },
          { id: 'p-27', name: 'Bernardo Silva', number: 20, position: 'MF', rating: 7.4 },
          { id: 'p-28', name: 'Kevin De Bruyne', number: 17, position: 'MF', rating: 8.1 },
          { id: 'p-29', name: 'Ilkay Gündogan', number: 19, position: 'MF', rating: 7.0 },
          { id: 'p-30', name: 'Jack Grealish', number: 10, position: 'FW', rating: 6.6 },
          { id: 'p-31', name: 'Erling Haaland', number: 9, position: 'FW', rating: 7.9 }
        ],
        substitutes: [
          { id: 's-21', name: 'Stefan Ortega', number: 18, position: 'GK' },
          { id: 's-22', name: 'John Stones', number: 5, position: 'DF' },
          { id: 's-23', name: 'Mateo Kovačić', number: 8, position: 'MF' },
          { id: 's-24', name: 'Phil Foden', number: 47, position: 'MF' },
          { id: 's-25', name: 'Jeremy Doku', number: 11, position: 'FW' }
        ]
      }
    },
    aiAnalysis: {
      matchId: 'match-pl-1',
      timestamp: new Date().toISOString(),
      headline: 'Arteta High Press Stifles City Transition as Saka Brilliance Flips Momentum',
      tacticalSummary: 'Arsenal responded aggressively after going behind to an early Haaland strike. By stepping up Rice and Ødegaard into City first phase build-up, the Gunners severed Rodri central passing lanes, generating superior turnover xG in the half-spaces.',
      whyTeamWonLost: 'Arsenal defensive compactness through Saliba and Gabriel isolated Haaland after minute 25, while Saka repeatedly won 1v1 duels against Gvardiol. City lacked width once Grealish was crowded out.',
      turningPoints: [
        { minute: 19, description: 'Haaland header exposes zonal gap between Arsenal center backs.', impact: 'Crucial' },
        { minute: 42, description: 'Saka solo wonder goal shifts psychological ascendancy before the break.', impact: 'Decisive' },
        { minute: 58, description: 'High turnover initiated by Rice leads directly to Havertz rebound goal.', impact: 'Decisive' }
      ],
      keyPlayerPerformances: [
        { playerName: 'Bukayo Saka', team: 'Arsenal', rating: 8.7, verdict: 'Relentless offensive catalyst with 4 successful dribbles and a match-equalizing golazo.' },
        { playerName: 'William Saliba', team: 'Arsenal', rating: 8.1, verdict: 'Won 5/6 aerial duels against Haaland, snuffing out direct long balls.' },
        { playerName: 'Kevin De Bruyne', team: 'Man City', rating: 8.1, verdict: 'Created 4 key chances including Haaland assist, but isolated in second half.' }
      ],
      managerTacticalBattle: 'Arteta hybrid 4-4-2 rest defense successfully countered Guardiola asymmetric 3-2-4-1 overload.',
      xgVerdict: 'Arsenal 1.84 xG accurately reflects higher frequency of high-quality chances inside the box compared to City 1.32 xG.'
    }
  },
  {
    id: 'match-pd-1',
    leagueId: 'PD',
    leagueName: 'La Liga',
    leagueLogo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=128&auto=format&fit=crop&q=60',
    leagueCountry: 'Spain',
    season: '2025/2026',
    matchday: 27,
    utcDate: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    status: 'LIVE',
    minute: 41,
    venue: 'Santiago Bernabéu, Madrid',
    referee: 'Jesús Gil Manzano',
    homeTeam: {
      id: 'realmadrid',
      name: 'Real Madrid',
      shortName: 'Real Madrid',
      code: 'RMA',
      logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
      country: 'Spain',
      stadium: 'Santiago Bernabéu',
      capacity: 81044,
      manager: 'Carlo Ancelotti',
      colors: { primary: '#FFFFFF', secondary: '#EEB111' }
    },
    awayTeam: {
      id: 'barcelona',
      name: 'FC Barcelona',
      shortName: 'Barcelona',
      code: 'BAR',
      logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
      country: 'Spain',
      stadium: 'Camp Nou',
      capacity: 99354,
      manager: 'Hansi Flick',
      colors: { primary: '#004D98', secondary: '#A50044' }
    },
    score: {
      home: 1,
      away: 0,
      halftime: { home: 1, away: 0 }
    },
    events: [
      {
        id: 'ev-11',
        minute: 27,
        teamId: 'realmadrid',
        type: 'goal',
        playerName: 'Kylian Mbappé',
        assistPlayerName: 'Vinícius Júnior',
        description: 'Mbappé beats the high offside trap and finishes cleanly past Peña.'
      },
      {
        id: 'ev-12',
        minute: 33,
        teamId: 'barcelona',
        type: 'yellow_card',
        playerName: 'Gavi',
        description: 'Heavy challenge on Bellingham in middle third.'
      }
    ],
    stats: {
      possession: [44, 56],
      shots: [8, 7],
      shotsOnTarget: [4, 2],
      xg: [1.15, 0.68],
      fouls: [6, 9],
      corners: [3, 4],
      offsides: [3, 2],
      yellowCards: [0, 2],
      redCards: [0, 0],
      passes: [210, 280],
      passAccuracy: [88, 91],
      saves: [2, 3]
    },
    momentum: [
      { minute: 15, momentum: -25 },
      { minute: 27, momentum: 70, eventLabel: 'Mbappé 27\'' },
      { minute: 35, momentum: 30 }
    ]
  },
  {
    id: 'match-cl-1',
    leagueId: 'CL',
    leagueName: 'UEFA Champions League',
    leagueLogo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=128&auto=format&fit=crop&q=60',
    leagueCountry: 'Europe',
    season: '2025/2026',
    round: 'Round of 16 - 2nd Leg',
    utcDate: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    status: 'FINISHED',
    venue: 'Allianz Arena, Munich',
    referee: 'Szymon Marciniak',
    homeTeam: {
      id: 'bayern',
      name: 'Bayern München',
      shortName: 'Bayern',
      code: 'BAY',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
      country: 'Germany',
      stadium: 'Allianz Arena',
      capacity: 75000,
      manager: 'Vincent Kompany',
      colors: { primary: '#DC052D', secondary: '#0066B2' }
    },
    awayTeam: {
      id: 'psg',
      name: 'Paris Saint-Germain',
      shortName: 'PSG',
      code: 'PSG',
      logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
      country: 'France',
      stadium: 'Parc des Princes',
      capacity: 48583,
      manager: 'Luis Enrique',
      colors: { primary: '#004170', secondary: '#DA291C' }
    },
    score: {
      home: 3,
      away: 1,
      halftime: { home: 1, away: 0 }
    },
    events: [
      {
        id: 'ev-21',
        minute: 22,
        teamId: 'bayern',
        type: 'goal',
        playerName: 'Harry Kane',
        assistPlayerName: 'Jamal Musiala',
        description: 'Kane converts clinical penalty won after Musiala dancing run.'
      },
      {
        id: 'ev-22',
        minute: 54,
        teamId: 'psg',
        type: 'goal',
        playerName: 'Bradley Barcola',
        assistPlayerName: 'Ousmane Dembélé',
        description: 'Barcola finishes swift counter attack at the back post.'
      },
      {
        id: 'ev-23',
        minute: 67,
        teamId: 'bayern',
        type: 'goal',
        playerName: 'Michael Olise',
        assistPlayerName: 'Harry Kane',
        description: 'Olise curler from the edge of the 18-yard box.'
      },
      {
        id: 'ev-24',
        minute: 88,
        teamId: 'bayern',
        type: 'goal',
        playerName: 'Harry Kane',
        assistPlayerName: 'Alphonso Davies',
        description: 'Kane seals aggregate victory with thunderous header.'
      }
    ],
    stats: {
      possession: [55, 45],
      shots: [18, 9],
      shotsOnTarget: [8, 3],
      xg: [2.74, 1.05],
      fouls: [12, 14],
      corners: [8, 4],
      offsides: [1, 3],
      yellowCards: [2, 3],
      redCards: [0, 0],
      passes: [540, 420],
      passAccuracy: [89, 84],
      saves: [2, 5]
    },
    aiAnalysis: {
      matchId: 'match-cl-1',
      timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
      headline: 'Kompany Bayern Dismantles PSG With Lethal Musiala-Kane Vertical Linkup',
      tacticalSummary: 'Bayern dominated the half-spaces through Jamal Musiala elusive positional play between PSG double pivot. Despite PSG equalizing on the break, Kompany inverted fullbacks created numerical superiority in central midfield.',
      whyTeamWonLost: 'Bayern sustained high pressing won 11 turnovers in PSG defensive third. Luis Enrique midfield struggled to retain possession under pressure, leaving their back four exposed.',
      turningPoints: [
        { minute: 22, description: 'Musiala wins early penalty to settle Bavarian nerves.', impact: 'Crucial' },
        { minute: 67, description: 'Olise sublime strike restored the lead within 13 minutes of PSG equalizer.', impact: 'Decisive' }
      ],
      keyPlayerPerformances: [
        { playerName: 'Harry Kane', team: 'Bayern München', rating: 9.2, verdict: 'Two goals, one assist, masterclass in complete center-forward play.' },
        { playerName: 'Jamal Musiala', team: 'Bayern München', rating: 8.8, verdict: 'Unstoppable ball carrier creating 5 shot-ending sequences.' }
      ],
      managerTacticalBattle: 'Kompany direct transition tempo exploited PSG high defensive line with ruthless precision.',
      xgVerdict: '2.74 xG to 1.05 xG demonstrates clear offensive superiority throughout the 90 minutes.'
    }
  },
  {
    id: 'match-pl-2',
    leagueId: 'PL',
    leagueName: 'Premier League',
    leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=128&auto=format&fit=crop&q=60',
    leagueCountry: 'England',
    season: '2025/2026',
    matchday: 28,
    utcDate: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
    status: 'UPCOMING',
    venue: 'Anfield, Liverpool',
    referee: 'Anthony Taylor',
    homeTeam: {
      id: 'liverpool',
      name: 'Liverpool FC',
      shortName: 'Liverpool',
      code: 'LIV',
      logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
      country: 'England',
      stadium: 'Anfield',
      capacity: 61276,
      manager: 'Arne Slot',
      colors: { primary: '#C8102E', secondary: '#00B2A9' }
    },
    awayTeam: {
      id: 'chelsea',
      name: 'Chelsea FC',
      shortName: 'Chelsea',
      code: 'CHE',
      logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
      country: 'England',
      stadium: 'Stamford Bridge',
      capacity: 40343,
      manager: 'Enzo Maresca',
      colors: { primary: '#034694', secondary: '#EE2737' }
    },
    score: { home: 0, away: 0 },
    events: [],
    preMatchPreview: {
      matchId: 'match-pl-2',
      keyTacticalClash: 'Arne Slot controlled vertical build-up meets Enzo Maresca inverted box midfield.',
      playersToWatch: ['Mohamed Salah (Liverpool)', 'Cole Palmer (Chelsea)', 'Ryan Gravenberch (Liverpool)'],
      predictedOutcome: 'Liverpool 2 - 1 Chelsea. Anfield intensity and Salah rest-defense advantage give the Reds the edge.',
      winProbability: { home: 54, draw: 26, away: 20 },
      tacticalAdvice: 'Chelsea must prevent Gravenberch and Mac Allister from turning centrally, while Liverpool need to track Cole Palmer drifting into right half-spaces.'
    }
  },
  {
    id: 'match-sa-1',
    leagueId: 'SA',
    leagueName: 'Serie A',
    leagueLogo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=128&auto=format&fit=crop&q=60',
    leagueCountry: 'Italy',
    season: '2025/2026',
    matchday: 27,
    utcDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    status: 'FINISHED',
    venue: 'San Siro, Milan',
    referee: 'Daniele Orsato',
    homeTeam: {
      id: 'inter',
      name: 'Inter Milan',
      shortName: 'Inter',
      code: 'INT',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
      country: 'Italy',
      stadium: 'San Siro',
      capacity: 75923,
      manager: 'Simone Inzaghi',
      colors: { primary: '#010E80', secondary: '#000000' }
    },
    awayTeam: {
      id: 'juventus',
      name: 'Juventus FC',
      shortName: 'Juventus',
      code: 'JUV',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg',
      country: 'Italy',
      stadium: 'Allianz Stadium',
      capacity: 41507,
      manager: 'Thiago Motta',
      colors: { primary: '#000000', secondary: '#FFFFFF' }
    },
    score: {
      home: 2,
      away: 0,
      halftime: { home: 1, away: 0 }
    },
    events: [
      {
        id: 'ev-31',
        minute: 37,
        teamId: 'inter',
        type: 'goal',
        playerName: 'Lautaro Martínez',
        assistPlayerName: 'Marcus Thuram',
        description: 'Lautaro slots home Thuram low cross on the break.'
      },
      {
        id: 'ev-32',
        minute: 76,
        teamId: 'inter',
        type: 'goal',
        playerName: 'Nicolò Barella',
        assistPlayerName: 'Federico Dimarco',
        description: 'Volley from outside the box following set-piece clearance.'
      }
    ],
    stats: {
      possession: [51, 49],
      shots: [13, 8],
      shotsOnTarget: [5, 2],
      xg: [1.92, 0.74],
      fouls: [14, 15],
      corners: [7, 3],
      offsides: [1, 2],
      yellowCards: [2, 3],
      redCards: [0, 0],
      passes: [460, 435],
      passAccuracy: [87, 85],
      saves: [2, 3]
    }
  },
  {
    id: 'match-bl-1',
    leagueId: 'BL1',
    leagueName: 'Bundesliga',
    leagueLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&auto=format&fit=crop&q=60',
    leagueCountry: 'Germany',
    season: '2025/2026',
    matchday: 26,
    utcDate: new Date(Date.now() + 5 * 3600 * 1000).toISOString(),
    status: 'UPCOMING',
    venue: 'BayArena, Leverkusen',
    referee: 'Felix Brych',
    homeTeam: {
      id: 'leverkusen',
      name: 'Bayer 04 Leverkusen',
      shortName: 'Leverkusen',
      code: 'B04',
      logo: 'https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg',
      country: 'Germany',
      stadium: 'BayArena',
      capacity: 30210,
      manager: 'Xabi Alonso',
      colors: { primary: '#E32221', secondary: '#000000' }
    },
    awayTeam: {
      id: 'dortmund',
      name: 'Borussia Dortmund',
      shortName: 'Dortmund',
      code: 'BVB',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
      country: 'Germany',
      stadium: 'Signal Iduna Park',
      capacity: 81365,
      manager: 'Niko Kovač',
      colors: { primary: '#FDE100', secondary: '#000000' }
    },
    score: { home: 0, away: 0 },
    events: [],
    preMatchPreview: {
      matchId: 'match-bl-1',
      keyTacticalClash: 'Xabi Alonso fluid 3-4-2-1 possession system vs Dortmund rapid wide wing counter-attacks.',
      playersToWatch: ['Florian Wirtz (Leverkusen)', 'Jeremie Frimpong (Leverkusen)', 'Serhou Guirassy (Dortmund)'],
      predictedOutcome: 'Leverkusen 3 - 2 Dortmund. High scoring duel with Wirtz orchestrating decisive breakthroughs.',
      winProbability: { home: 58, draw: 22, away: 20 },
      tacticalAdvice: 'Dortmund must neutralize Frimpong and Grimaldo wing-back overlaps to stay in the contest.'
    }
  }
];

export const STANDINGS_DATA: Record<string, LeagueStandingItem[]> = {
  PL: [
    {
      position: 1,
      team: { id: 'arsenal', name: 'Arsenal', shortName: 'Arsenal', code: 'ARS', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', country: 'England' },
      playedGames: 28, won: 20, draw: 5, lost: 3, points: 65, goalsFor: 62, goalsAgainst: 22, goalDifference: 40,
      form: ['W', 'W', 'W', 'D', 'W'], qualification: 'UCL'
    },
    {
      position: 2,
      team: { id: 'liverpool', name: 'Liverpool FC', shortName: 'Liverpool', code: 'LIV', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', country: 'England' },
      playedGames: 27, won: 19, draw: 6, lost: 2, points: 63, goalsFor: 64, goalsAgainst: 24, goalDifference: 40,
      form: ['W', 'W', 'D', 'W', 'W'], qualification: 'UCL'
    },
    {
      position: 3,
      team: { id: 'mancity', name: 'Manchester City', shortName: 'Man City', code: 'MCI', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg', country: 'England' },
      playedGames: 28, won: 18, draw: 6, lost: 4, points: 60, goalsFor: 61, goalsAgainst: 29, goalDifference: 32,
      form: ['W', 'L', 'W', 'W', 'L'], qualification: 'UCL'
    },
    {
      position: 4,
      team: { id: 'chelsea', name: 'Chelsea FC', shortName: 'Chelsea', code: 'CHE', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg', country: 'England' },
      playedGames: 27, won: 15, draw: 7, lost: 5, points: 52, goalsFor: 54, goalsAgainst: 34, goalDifference: 20,
      form: ['W', 'W', 'D', 'W', 'D'], qualification: 'UCL'
    },
    {
      position: 5,
      team: { id: 'astonvilla', name: 'Aston Villa', shortName: 'Aston Villa', code: 'AVL', logo: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Aston_Villa_logo.svg', country: 'England' },
      playedGames: 28, won: 14, draw: 6, lost: 8, points: 48, goalsFor: 46, goalsAgainst: 38, goalDifference: 8,
      form: ['L', 'W', 'W', 'L', 'W'], qualification: 'UEL'
    },
    {
      position: 6,
      team: { id: 'newcastle', name: 'Newcastle United', shortName: 'Newcastle', code: 'NEW', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg', country: 'England' },
      playedGames: 28, won: 13, draw: 7, lost: 8, points: 46, goalsFor: 48, goalsAgainst: 39, goalDifference: 9,
      form: ['W', 'D', 'L', 'W', 'W'], qualification: 'UECL'
    },
    {
      position: 7,
      team: { id: 'tottenham', name: 'Tottenham Hotspur', shortName: 'Tottenham', code: 'TOT', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg', country: 'England' },
      playedGames: 28, won: 13, draw: 4, lost: 11, points: 43, goalsFor: 52, goalsAgainst: 42, goalDifference: 10,
      form: ['W', 'L', 'L', 'W', 'L'], qualification: 'NONE'
    }
  ],
  PD: [
    {
      position: 1,
      team: { id: 'realmadrid', name: 'Real Madrid', shortName: 'Real Madrid', code: 'RMA', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg', country: 'Spain' },
      playedGames: 27, won: 20, draw: 5, lost: 2, points: 65, goalsFor: 60, goalsAgainst: 21, goalDifference: 39,
      form: ['W', 'W', 'W', 'W', 'D'], qualification: 'UCL'
    },
    {
      position: 2,
      team: { id: 'barcelona', name: 'FC Barcelona', shortName: 'Barcelona', code: 'BAR', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', country: 'Spain' },
      playedGames: 27, won: 19, draw: 4, lost: 4, points: 61, goalsFor: 68, goalsAgainst: 28, goalDifference: 40,
      form: ['W', 'W', 'L', 'W', 'W'], qualification: 'UCL'
    },
    {
      position: 3,
      team: { id: 'atletico', name: 'Atlético Madrid', shortName: 'Atlético', code: 'ATM', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg', country: 'Spain' },
      playedGames: 27, won: 16, draw: 7, lost: 4, points: 55, goalsFor: 45, goalsAgainst: 20, goalDifference: 25,
      form: ['D', 'W', 'W', 'D', 'W'], qualification: 'UCL'
    }
  ]
};

export const TOP_SCORERS: Record<string, TopScorerItem[]> = {
  PL: [
    {
      rank: 1,
      player: { id: 'pl-sc-1', name: 'Erling Haaland', teamName: 'Manchester City', teamLogo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg', nationality: 'Norway' },
      goals: 23, assists: 3, penalties: 4, playedMatches: 26
    },
    {
      rank: 2,
      player: { id: 'pl-sc-2', name: 'Mohamed Salah', teamName: 'Liverpool FC', teamLogo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', nationality: 'Egypt' },
      goals: 19, assists: 11, penalties: 3, playedMatches: 27
    },
    {
      rank: 3,
      player: { id: 'pl-sc-3', name: 'Cole Palmer', teamName: 'Chelsea FC', teamLogo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg', nationality: 'England' },
      goals: 16, assists: 9, penalties: 5, playedMatches: 26
    },
    {
      rank: 4,
      player: { id: 'pl-sc-4', name: 'Bukayo Saka', teamName: 'Arsenal', teamLogo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', nationality: 'England' },
      goals: 14, assists: 12, penalties: 2, playedMatches: 27
    }
  ]
};

export const FOOTBALL_NEWS: FootballNewsArticle[] = [
  {
    id: 'news-1',
    title: 'Arteta Hails Arsenal Tactical Discipline Following Thrilling Clash With Manchester City',
    summary: 'Mikel Arteta praised his team resilience and tactical flexibility after Arsenal turned the tide at Emirates Stadium.',
    content: 'Arsenal manager Mikel Arteta highlighted his players mental fortitude and structural compactness against defending champions Manchester City. Bukayo Saka and Kai Havertz goals capped off a dominant second half display that reshapes the title race.',
    source: 'The Athletic',
    publishedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=60',
    category: 'Match Review',
    relatedLeagueId: 'PL',
    relatedTeamNames: ['Arsenal', 'Manchester City'],
    aiDigest: [
      'Arsenal high turnover strategy generated 1.84 xG against City 1.32 xG.',
      'Saka equalizing strike marked his 14th Premier League goal of the campaign.',
      'Saliba and Gabriel won 85% of combined defensive duels against Erling Haaland.'
    ]
  },
  {
    id: 'news-2',
    title: 'Champions League Quarter-Finals Draw: European Heavyweights Set For Epic Showdowns',
    summary: 'UEFA has confirmed the quarter-final matchups, with Bayern Munich, Real Madrid, and Arsenal in prime contention.',
    content: 'The Champions League knockout phase reaches fever pitch as defending champions and perennial contenders prepare for two-legged tactical chess matches across the continent.',
    source: 'UEFA Official',
    publishedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&auto=format&fit=crop&q=60',
    category: 'Champions League',
    relatedLeagueId: 'CL',
    relatedTeamNames: ['Bayern München', 'Real Madrid', 'Arsenal', 'Paris Saint-Germain'],
    aiDigest: [
      'Harry Kane leads the UCL golden boot race with 9 goals in 8 appearances.',
      'Real Madrid pursuit of 16th European crown faces tactical hurdles against high-press sides.',
      'Advanced xG models give Bayern Munich and Arsenal the highest tournament win probabilities.'
    ]
  },
  {
    id: 'news-3',
    title: 'Tactical Breakdown: How Arne Slot Reinvigorated Liverpool High-Tempo Verticality',
    summary: 'An analytical deep dive into Arne Slot midfield rotations and defensive rest structures at Anfield.',
    content: 'Under Arne Slot, Liverpool have blended Jürgen Klopp heavy metal pressing with Dutch positional discipline. Ryan Gravenberch resurgence as a deep-lying ball progressor has given Salah and Díaz optimal passing angles.',
    source: 'Tifo Football',
    publishedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=60',
    category: 'Tactics',
    relatedLeagueId: 'PL',
    relatedTeamNames: ['Liverpool FC'],
    aiDigest: [
      'Liverpool have conceded just 24 goals in 27 league matches, lowest in the division.',
      'Gravenberch averages 6.4 progressive passes per 90, ranking top 3 in Europe.',
      'Mohamed Salah combined 30 goal contributions (19G + 11A) leads all European leagues.'
    ]
  },
  {
    id: 'news-4',
    title: 'Transfer Watch: Summer Window Rumors Heat Up for Florian Wirtz and Alexander Isak',
    summary: 'Europe top clubs are preparing mammoth bids for Bundesliga and Premier League marquee stars.',
    content: 'With the summer transfer window approaching, several mega-deals are taking shape behind the scenes. Leverkusen playmaker Florian Wirtz remains the most coveted attacking midfielder in world football.',
    source: 'Sky Sports',
    publishedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&auto=format&fit=crop&q=60',
    category: 'Transfer',
    relatedLeagueId: 'BL1',
    relatedTeamNames: ['Bayer 04 Leverkusen', 'Newcastle United', 'Real Madrid', 'Manchester City'],
    aiDigest: [
      'Bayer Leverkusen value Wirtz in excess of €130M.',
      'Premier League heavyweights are monitoring Alexander Isak contract situation at Newcastle.',
      'Financial Fair Play and PSR rules will heavily dictate multi-installment transfer structures.'
    ]
  }
];
