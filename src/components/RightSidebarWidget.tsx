import React from 'react';
import { Activity, Flame, Sparkles, TrendingUp, ChevronRight, Crown, Trophy } from 'lucide-react';
import { Match, LeagueStandingItem } from '../types';
import { t } from '../utils/i18n';

interface RightSidebarWidgetProps {
  liveMatches: Match[];
  onSelectMatch: (match: Match) => void;
  miniStandings: LeagueStandingItem[];
  onOpenMembership?: () => void;
  onOpenAuction?: () => void;
  language?: string;
}

export const RightSidebarWidget: React.FC<RightSidebarWidgetProps> = ({
  liveMatches,
  onSelectMatch,
  miniStandings,
  onOpenMembership,
  onOpenAuction,
  language = 'en',
}) => {
  return (
    <aside className="w-80 shrink-0 hidden xl:flex flex-col gap-5 p-4 border-l border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 min-h-[calc(100vh-61px)] transition-colors">
      {/* Live Match Ticker */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <h3 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              {t('livePulse', language)}
            </h3>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-bold">
            {liveMatches.length} {t('live', language)}
          </span>
        </div>

        {liveMatches.length > 0 ? (
          <div className="space-y-2">
            {liveMatches.map((m) => (
              <div
                key={m.id}
                onClick={() => onSelectMatch(m)}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/70 cursor-pointer transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">{m.leagueName}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono font-black animate-pulse">
                    {m.minute}&apos;
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
                  <span className="truncate max-w-[95px]">{m.homeTeam.shortName}</span>
                  <span className="font-mono font-black text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-750">
                    {m.score.home} - {m.score.away}
                  </span>
                  <span className="truncate max-w-[95px] text-right">{m.awayTeam.shortName}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4 font-medium">
            {t('noLiveFixtures', language)}
          </p>
        )}
      </div>

      {/* Mini Top 4 Standings */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
            <span>🏆 {t('top4', language)}</span>
          </h3>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{t('uclZone', language)}</span>
        </div>

        <div className="space-y-1.5">
          {miniStandings.slice(0, 4).map((team) => (
            <div
              key={team.team.id}
              className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-400 w-4 text-center">
                  {team.position}
                </span>
                <img
                  src={team.team.logo}
                  alt={team.team.name}
                  className="w-4 h-4 object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[110px]">
                  {team.team.shortName}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 w-6 text-right">
                  {team.points}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIP Revenue & Membership Mini Promo */}
      {onOpenMembership && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-emerald-500/15 to-teal-500/10 dark:from-amber-950/40 dark:via-emerald-950/40 dark:to-slate-900 border border-amber-500/40 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
              <Crown className="w-4 h-4 text-amber-500" />
              <span>{t('vipPass', language)}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-black uppercase">
              {t('trial3Mo', language)}
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {t('vipPromoDesc', language)}
          </p>
          <button
            onClick={onOpenMembership}
            className="w-full py-2.5 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm"
          >
            <span>{t('explorePlans', language)}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* VIP Memorabilia Auction House Card */}
      {onOpenAuction && (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>{t('vipAuction', language)}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold">
              Live Lots
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Bid on authentic signed jerseys, match-worn boots, and VIP box matchday experiences.
          </p>

          <button
            onClick={onOpenAuction}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Enter Auction Room</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      )}
    </aside>
  );
};
