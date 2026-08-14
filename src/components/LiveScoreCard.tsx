import React from 'react';
import { Star, ChevronRight, Sparkles, Activity, Clock } from 'lucide-react';
import { Match } from '../types';

interface LiveScoreCardProps {
  match: Match;
  onSelectMatch: (match: Match) => void;
  isFavoriteHome: boolean;
  isFavoriteAway: boolean;
  onToggleFavorite: (teamId: string, e: React.MouseEvent) => void;
}

export const LiveScoreCard: React.FC<LiveScoreCardProps> = ({
  match,
  onSelectMatch,
  isFavoriteHome,
  isFavoriteAway,
  onToggleFavorite,
}) => {
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const isUpcoming = match.status === 'UPCOMING';

  // Extract primary scorers from events
  const goalEvents = match.events?.filter((e) => e.type === 'goal' || e.type === 'penalty_goal') || [];
  const homeGoals = goalEvents.filter((e) => e.teamId === match.homeTeam.id);
  const awayGoals = goalEvents.filter((e) => e.teamId === match.awayTeam.id);

  return (
    <div
      id={`match-card-${match.id}`}
      onClick={() => onSelectMatch(match)}
      className="group relative bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl p-4 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md dark:shadow-none"
    >
      {/* Top Header: League & Status */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-800 dark:text-slate-300">{match.leagueName}</span>
          {match.matchday && <span className="text-slate-400 text-[11px]">• MD {match.matchday}</span>}
          {match.round && <span className="text-slate-400 text-[11px]">• {match.round}</span>}
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {isLive && (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>{match.minute}&apos;</span>
            </div>
          )}

          {isFinished && (
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider border border-slate-200 dark:border-slate-700">
              FT
            </span>
          )}

          {isUpcoming && (
            <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              <Clock className="w-3 h-3" />
              <span>
                {new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )}

          {match.aiAnalysis && (
            <span className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-500/15 px-1.5 py-0.5 rounded border border-indigo-500/20">
              <Sparkles className="w-3 h-3" />
              AI Review
            </span>
          )}
        </div>
      </div>

      {/* Main Scoreboard Layout */}
      <div className="grid grid-cols-12 items-center gap-2 py-1">
        {/* Home Team */}
        <div className="col-span-5 flex items-center justify-between pr-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={(e) => onToggleFavorite(match.homeTeam.id, e)}
              className="text-slate-400 hover:text-amber-400 p-0.5 transition-colors"
              title="Add to favorites"
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  isFavoriteHome ? 'fill-amber-400 text-amber-400' : 'hover:fill-slate-300'
                }`}
              />
            </button>
            {/* 32px Team Crest */}
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 p-1 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700/60 overflow-hidden">
              <img
                src={match.homeTeam.logo}
                alt={match.homeTeam.name}
                className="w-6 h-6 object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
              {match.homeTeam.shortName || match.homeTeam.name}
            </span>
          </div>
        </div>

        {/* Score / Center Time */}
        <div className="col-span-2 flex flex-col items-center justify-center">
          {isUpcoming ? (
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">VS</span>
          ) : (
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950/80 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className={`text-base sm:text-lg font-bold font-mono ${isLive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
                {match.score.home}
              </span>
              <span className="text-xs text-slate-400 font-mono">-</span>
              <span className={`text-base sm:text-lg font-bold font-mono ${isLive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
                {match.score.away}
              </span>
            </div>
          )}

          {match.stats?.xg && (
            <div className="text-[10px] text-slate-400 font-mono mt-1 hidden sm:block">
              xG: {match.stats.xg[0]} - {match.stats.xg[1]}
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="col-span-5 flex items-center justify-end pl-2">
          <div className="flex items-center justify-end gap-2.5 min-w-0">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate text-right">
              {match.awayTeam.shortName || match.awayTeam.name}
            </span>
            {/* 32px Team Crest */}
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 p-1 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700/60 overflow-hidden">
              <img
                src={match.awayTeam.logo}
                alt={match.awayTeam.name}
                className="w-6 h-6 object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <button
              onClick={(e) => onToggleFavorite(match.awayTeam.id, e)}
              className="text-slate-400 hover:text-amber-400 p-0.5 transition-colors"
              title="Add to favorites"
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  isFavoriteAway ? 'fill-amber-400 text-amber-400' : 'hover:fill-slate-300'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Scorers Sub-line (if goals exist) */}
      {(homeGoals.length > 0 || awayGoals.length > 0) && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60 grid grid-cols-2 gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="truncate">
            {homeGoals.map((g, idx) => (
              <span key={idx} className="mr-2">
                ⚽ {g.playerName} <span className="text-slate-400">{g.minute}&apos;</span>
              </span>
            ))}
          </div>
          <div className="truncate text-right">
            {awayGoals.map((g, idx) => (
              <span key={idx} className="ml-2">
                ⚽ {g.playerName} <span className="text-slate-400">{g.minute}&apos;</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Footer: Venue & Action */}
      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate max-w-[200px]">{match.venue}</span>
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium group-hover:translate-x-0.5 transition-transform">
          <span>Match Intel</span>
          <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
