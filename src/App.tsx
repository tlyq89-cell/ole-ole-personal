import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Match,
  League,
  LeagueStandingItem,
  TopScorerItem,
  FootballNewsArticle,
  MatchAIAnalysis,
  UserSubscription,
  MembershipTierId,
  AuctionItem,
} from './types';
import { Header } from './components/Header';
import { SidebarNav, NavTab } from './components/SidebarNav';
import { LiveScoreCard } from './components/LiveScoreCard';
import { MatchDetailModal } from './components/MatchDetailModal';
import { StandingsTable } from './components/StandingsTable';
import { FootballNews } from './components/FootballNews';
import { AIAnalystChat } from './components/AIAnalystChat';
import { RightSidebarWidget } from './components/RightSidebarWidget';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MembershipModal } from './components/MembershipModal';
import { MembershipSection } from './components/MembershipSection';
import { AuctionPlace } from './components/AuctionPlace';
import { INITIAL_AUCTION_ITEMS } from './data/membershipData';
import {
  Activity,
  Filter,
} from 'lucide-react';
import { t } from './utils/i18n';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('scores');
  const [matches, setMatches] = useState<Match[]>([]);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [standings, setStandings] = useState<LeagueStandingItem[]>([]);
  const [topScorers, setTopScorers] = useState<TopScorerItem[]>([]);
  const [news, setNews] = useState<FootballNewsArticle[]>([]);

  // Theme state with localStorage & dark class management
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('oleole_theme') || localStorage.getItem('pitchiq_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('oleole_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Language state with localStorage
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('oleole_language');
      return saved || 'en';
    } catch {
      return 'en';
    }
  });

  const handleSelectLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    try {
      localStorage.setItem('oleole_language', lang);
    } catch {}
  };

  // Membership & VIP Subscription state
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription>(() => {
    try {
      const saved = localStorage.getItem('oleole_subscription') || localStorage.getItem('pitchiq_user_subscription');
      return saved ? JSON.parse(saved) : { tier: 'normal' };
    } catch {
      return { tier: 'normal' };
    }
  });

  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState<boolean>(false);
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>(INITIAL_AUCTION_ITEMS);

  const handleSelectPlan = (tierId: MembershipTierId, chosenLeague?: string) => {
    const updated: UserSubscription = {
      tier: tierId,
      selectedFreeLeague: chosenLeague || 'Premier League (England)',
      subscribedAt: new Date().toISOString(),
      expiresAt:
        tierId === 'silver_trial'
          ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
          : tierId !== 'normal'
          ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          : undefined,
      totalSavedUSD: tierId === 'platinum' ? 380 : tierId === 'gold' ? 240 : tierId === 'silver' ? 140 : 0,
    };
    setCurrentSubscription(updated);
    try {
      localStorage.setItem('oleole_subscription', JSON.stringify(updated));
    } catch {}
  };

  const handlePlaceBid = (itemId: string, bidAmount: number) => {
    setAuctionItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newCurrentBid = bidAmount;
          const minNext = newCurrentBid + item.bidStepUSD;
          return {
            ...item,
            currentBidUSD: newCurrentBid,
            minNextBidUSD: minNext,
            totalBids: item.totalBids + 1,
            topBidder: 'You (Verified VIP Member)',
          };
        }
        return item;
      })
    );
  };

  // Filters
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'FINISHED' | 'UPCOMING'>('ALL');
  const [dateFilter, setDateFilter] = useState<'yesterday' | 'today' | 'tomorrow'>('today');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  const [favoriteTeamIds, setFavoriteTeamIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('oleole_fav_teams') || localStorage.getItem('pitchiq_fav_teams');
      return saved ? JSON.parse(saved) : ['arsenal', 'realmadrid', 'bayern'];
    } catch {
      return ['arsenal', 'realmadrid', 'bayern'];
    }
  });

  // Modals & Selections
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isLoadingScores, setIsLoadingScores] = useState<boolean>(false);

  // Save favorites to local storage
  const handleToggleFavorite = (teamId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteTeamIds((prev) => {
      const next = prev.includes(teamId) ? prev.filter((id) => id !== teamId) : [...prev, teamId];
      try {
        localStorage.setItem('oleole_fav_teams', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Fetch initial leagues
  useEffect(() => {
    fetch('/api/leagues')
      .then((res) => res.json())
      .then((data) => setLeagues(data.leagues || []))
      .catch((err) => console.error('Failed to load leagues:', err));
  }, []);

  // Fetch Scores with polling for live match state
  const loadScores = useCallback(async (isBackground = false) => {
    if (!isBackground) setIsLoadingScores(true);
    try {
      const leagueParam = selectedLeagueId !== 'ALL' ? `&league=${selectedLeagueId}` : '';
      const statusParam = statusFilter !== 'ALL' ? `&status=${statusFilter}` : '';
      const res = await fetch(`/api/scores?ts=${Date.now()}${leagueParam}${statusParam}`);
      if (res.ok) {
        const data = await res.json();
        setMatches(data.matches || []);

        // Also update selected match in modal if currently open
        setSelectedMatch((prev) => {
          if (!prev) return null;
          const updated = data.matches?.find((m: Match) => m.id === prev.id);
          return updated || prev;
        });
      }
    } catch (err) {
      console.error('Error fetching scores:', err);
    } finally {
      if (!isBackground) setIsLoadingScores(false);
    }
  }, [selectedLeagueId, statusFilter]);

  useEffect(() => {
    loadScores(false);
    const interval = setInterval(() => {
      loadScores(true);
    }, 10000); // 10s live pulse
    return () => clearInterval(interval);
  }, [loadScores]);

  // Fetch Standings and Top Scorers when league changes
  useEffect(() => {
    const targetLeague = selectedLeagueId === 'ALL' ? 'PL' : selectedLeagueId;
    fetch(`/api/standings/${targetLeague}`)
      .then((res) => res.json())
      .then((data) => setStandings(data.standings || []))
      .catch((err) => console.error('Failed to load standings:', err));

    fetch(`/api/scorers/${targetLeague}`)
      .then((res) => res.json())
      .then((data) => setTopScorers(data.scorers || []))
      .catch((err) => console.error('Failed to load scorers:', err));
  }, [selectedLeagueId]);

  // Fetch News
  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => setNews(data.news || []))
      .catch((err) => console.error('Failed to load news:', err));
  }, []);

  // Filtered Matches
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          match.homeTeam.name.toLowerCase().includes(q) ||
          match.awayTeam.name.toLowerCase().includes(q) ||
          match.leagueName.toLowerCase().includes(q) ||
          match.events?.some((e) => e.playerName.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Favorites only
      if (favoritesOnly) {
        const isFav =
          favoriteTeamIds.includes(match.homeTeam.id) ||
          favoriteTeamIds.includes(match.awayTeam.id);
        if (!isFav) return false;
      }

      return true;
    });
  }, [matches, searchQuery, favoritesOnly, favoriteTeamIds]);

  const liveMatches = useMemo(() => {
    return matches.filter((m) => m.status === 'LIVE');
  }, [matches]);

  // Trigger server-side AI Analysis
  const handleGenerateAIAnalysis = async (matchId: string): Promise<MatchAIAnalysis> => {
    const res = await fetch('/api/ai/match-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchId }),
    });
    if (!res.ok) {
      throw new Error('Failed to trigger AI Analysis');
    }
    const data = await res.json();
    return data.analysis;
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 transition-colors">
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesOnly={favoritesOnly}
        onToggleFavorites={() => setFavoritesOnly(!favoritesOnly)}
        favoritesCount={favoriteTeamIds.length}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={handleSelectLanguage}
        liveMatchesCount={liveMatches.length}
        theme={theme}
        onToggleTheme={toggleTheme}
        currentSubscription={currentSubscription}
        onOpenMembership={() => setIsMembershipModalOpen(true)}
      />

      {/* Main App Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-20 lg:pb-6">
        {/* Left Desktop Sidebar Navigation */}
        <SidebarNav
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          leagues={leagues}
          selectedLeagueId={selectedLeagueId}
          onSelectLeague={setSelectedLeagueId}
          favoriteTeamIds={favoriteTeamIds}
          language={selectedLanguage}
        />

        {/* Center Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 min-w-0 max-w-4xl">
          {/* TAB 1: MATCH CENTRE */}
          {currentTab === 'scores' && (
            <div className="space-y-6">
              {/* Filter Controls & Matchday Selector */}
              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Status Pills */}
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-x-auto">
                    {[
                      { id: 'ALL', label: t('allMatches', selectedLanguage) },
                      { id: 'LIVE', label: `${t('live', selectedLanguage)} (${liveMatches.length})`, isLive: true },
                      { id: 'UPCOMING', label: t('upcoming', selectedLanguage) },
                      { id: 'FINISHED', label: t('finished', selectedLanguage) },
                    ].map((status) => (
                      <button
                        key={status.id}
                        id={`status-pill-${status.id}`}
                        onClick={() => setStatusFilter(status.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                          statusFilter === status.id
                            ? 'bg-emerald-500 text-slate-950 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200'
                        }`}
                      >
                        {status.isLive && liveMatches.length > 0 && (
                          <span className={`w-2 h-2 rounded-full ${statusFilter === 'LIVE' ? 'bg-slate-950' : 'bg-rose-500 animate-pulse'}`}></span>
                        )}
                        <span>{status.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Date Switcher */}
                  <div className="flex items-center gap-1 text-xs">
                    {(['yesterday', 'today', 'tomorrow'] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => setDateFilter(d)}
                        className={`px-3 py-1.5 rounded-xl capitalize font-bold transition-colors cursor-pointer ${
                          dateFilter === d
                            ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
                        }`}
                      >
                        {t(d, selectedLanguage)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search / Active Filter Indicator */}
                {(searchQuery || selectedLeagueId !== 'ALL' || favoritesOnly) && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800 font-medium">
                    <Filter className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{t('activeFilters', selectedLanguage)}:</span>
                    {selectedLeagueId !== 'ALL' && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold">
                        {leagues.find((l) => l.id === selectedLeagueId)?.name}
                      </span>
                    )}
                    {favoritesOnly && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-bold">
                        {t('favoritesOnly', selectedLanguage)}
                      </span>
                    )}
                    {searchQuery && (
                      <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold">
                        &quot;{searchQuery}&quot;
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setSelectedLeagueId('ALL');
                        setFavoritesOnly(false);
                        setSearchQuery('');
                      }}
                      className="ml-auto text-emerald-600 dark:text-emerald-400 hover:underline text-[11px] font-bold cursor-pointer"
                    >
                      {t('clearAll', selectedLanguage)}
                    </button>
                  </div>
                )}
              </div>

              {/* Match Cards List */}
              <div className="space-y-3.5">
                {filteredMatches.length > 0 ? (
                  filteredMatches.map((match) => (
                    <LiveScoreCard
                      key={match.id}
                      match={match}
                      onSelectMatch={setSelectedMatch}
                      isFavoriteHome={favoriteTeamIds.includes(match.homeTeam.id)}
                      isFavoriteAway={favoriteTeamIds.includes(match.awayTeam.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))
                ) : (
                  <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <Activity className="w-8 h-8 text-slate-400 dark:text-slate-600 mx-auto" />
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">{t('noMatches', selectedLanguage)}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      {t('noMatchesSub', selectedLanguage)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: STANDINGS & STATS */}
          {currentTab === 'standings' && (
            <StandingsTable
              standings={standings}
              topScorers={topScorers}
              leagues={leagues}
              selectedLeagueId={selectedLeagueId}
              onSelectLeague={setSelectedLeagueId}
              favoriteTeamIds={favoriteTeamIds}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {/* TAB 3: FOOTBALL NEWS */}
          {currentTab === 'news' && <FootballNews articles={news} />}

          {/* TAB 4: AI TACTICAL ANALYST */}
          {currentTab === 'ai-analyst' && <AIAnalystChat />}

          {/* TAB 5: VIP AUCTION PLACE */}
          {currentTab === 'auction' && (
            <AuctionPlace
              items={auctionItems}
              currentSubscription={currentSubscription}
              onPlaceBid={handlePlaceBid}
              onOpenMembership={() => setIsMembershipModalOpen(true)}
            />
          )}

          {/* TAB 6: FULL MEMBERSHIPS & VIP PORTAL */}
          {currentTab === 'memberships' && (
            <MembershipSection
              currentSubscription={currentSubscription}
              onSelectPlan={handleSelectPlan}
              onOpenAuction={() => setCurrentTab('auction')}
              language={selectedLanguage}
            />
          )}
        </main>

        {/* Right Desktop Sidebar Widget */}
        <RightSidebarWidget
          liveMatches={liveMatches}
          onSelectMatch={setSelectedMatch}
          miniStandings={standings}
          onOpenMembership={() => setIsMembershipModalOpen(true)}
          onOpenAuction={() => setCurrentTab('auction')}
          language={selectedLanguage}
        />
      </div>

      {/* Individual Match Intelligence Modal */}
      <MatchDetailModal
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
        onGenerateAIAnalysis={handleGenerateAIAnalysis}
      />

      {/* Ole Ole VIP Revenue & Memberships Modal */}
      <MembershipModal
        isOpen={isMembershipModalOpen}
        onClose={() => setIsMembershipModalOpen(false)}
        currentSubscription={currentSubscription}
        onSelectPlan={handleSelectPlan}
        onOpenAuction={() => {
          setIsMembershipModalOpen(false);
          setCurrentTab('auction');
        }}
        language={selectedLanguage}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        liveMatchesCount={liveMatches.length}
        language={selectedLanguage}
      />
    </div>
  );
}
