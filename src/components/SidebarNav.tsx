import React from 'react';
import {
  Calendar,
  Trophy,
  Newspaper,
  BrainCircuit,
  Flame,
  Star,
  ChevronRight,
  TrendingUp,
  Crown,
} from 'lucide-react';
import { League } from '../types';
import { t } from '../utils/i18n';

export type NavTab = 'scores' | 'standings' | 'news' | 'ai-analyst' | 'auction' | 'memberships';

interface SidebarNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  leagues: League[];
  selectedLeagueId: string;
  onSelectLeague: (leagueId: string) => void;
  favoriteTeamIds: string[];
  language?: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  currentTab,
  onSelectTab,
  leagues,
  selectedLeagueId,
  onSelectLeague,
  favoriteTeamIds,
  language = 'en',
}) => {
  const navItems = [
    {
      id: 'scores' as NavTab,
      label: t('matchCentre', language),
      icon: Calendar,
      badge: t('live', language),
      badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
    },
    {
      id: 'standings' as NavTab,
      label: t('tablesStats', language),
      icon: Trophy,
    },
    {
      id: 'news' as NavTab,
      label: t('news', language),
      icon: Newspaper,
    },
    {
      id: 'ai-analyst' as NavTab,
      label: t('aiAnalyst', language),
      icon: BrainCircuit,
      badge: 'Gemini 3.7',
      badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30',
    },
    {
      id: 'auction' as NavTab,
      label: t('vipAuction', language),
      icon: Flame,
      badge: 'VIP',
      badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    },
    {
      id: 'memberships' as NavTab,
      label: t('memberships', language),
      icon: Crown,
      badge: t('trial3Mo', language),
      badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col gap-6 p-4 bg-slate-50/90 dark:bg-slate-900/70 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 select-none min-h-[calc(100vh-61px)] transition-colors">
      {/* Primary Navigation */}
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">
          {t('menu', language)}
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'hover:bg-slate-200/80 dark:hover:bg-slate-800/90 hover:text-slate-950 dark:hover:text-white text-slate-700 dark:text-slate-300 font-semibold'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Competitions / Leagues Filter */}
      <div className="space-y-1">
        <div className="flex items-center justify-between px-3 mb-2">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
            {t('majorLeagues', language)}
          </p>
          <span className="text-[10px] font-bold text-slate-400">Top 5</span>
        </div>

        <button
          id="league-btn-all"
          onClick={() => onSelectLeague('ALL')}
          className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            selectedLeagueId === 'ALL'
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-white font-bold border border-slate-300 dark:border-slate-700'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-sm">🌍</span>
            <span>{t('allCompetitions', language)}</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {leagues.map((league) => {
          const isSelected = selectedLeagueId === league.id;
          return (
            <button
              key={league.id}
              id={`league-btn-${league.id}`}
              onClick={() => onSelectLeague(league.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-500/30'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="text-sm">{league.countryFlag}</span>
                <span className="truncate">{league.name}</span>
              </div>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                {league.code}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Tactical Insights Banner */}
      <div className="mt-auto p-4 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200/80 dark:from-slate-800/80 dark:to-slate-900/90 border border-slate-300 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1.5">
          <BrainCircuit className="w-4 h-4" />
          <span className="text-xs font-black uppercase tracking-wider">AI Match Engine</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3 font-medium">
          {t('aiEngineDesc', language)}
        </p>
        <button
          onClick={() => onSelectTab('ai-analyst')}
          className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
        >
          <span>{t('openTacticalRoom', language)}</span>
          <TrendingUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
