import React, { useState } from 'react';
import { Trophy, Award, TrendingUp, Flame, Star } from 'lucide-react';
import { LeagueStandingItem, TopScorerItem, League } from '../types';

interface StandingsTableProps {
  standings: LeagueStandingItem[];
  topScorers: TopScorerItem[];
  leagues: League[];
  selectedLeagueId: string;
  onSelectLeague: (leagueId: string) => void;
  favoriteTeamIds: string[];
  onToggleFavorite: (teamId: string, e: React.MouseEvent) => void;
}

export const StandingsTable: React.FC<StandingsTableProps> = ({
  standings,
  topScorers,
  leagues,
  selectedLeagueId,
  onSelectLeague,
  favoriteTeamIds,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'standings' | 'scorers'>('standings');

  const currentLeague = leagues.find((l) => l.id === selectedLeagueId) || leagues[0];

  return (
    <div className="space-y-6">
      {/* Header & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentLeague?.countryFlag || '🏆'}</span>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{currentLeague?.name} Table & Stats</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Season 2025/26 • Official League Standings</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* League Selector */}
          <select
            id="standings-league-select"
            value={selectedLeagueId === 'ALL' ? 'PL' : selectedLeagueId}
            onChange={(e) => onSelectLeague(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {leagues.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} ({l.code})
              </option>
            ))}
          </select>

          {/* Sub Tab Switcher */}
          <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('standings')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'standings'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Standings
            </button>
            <button
              onClick={() => setActiveTab('scorers')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'scorers'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Top Scorers
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'standings' ? (
        <div className="overflow-x-auto rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold text-[11px] bg-slate-50 dark:bg-slate-950/40">
                <th className="py-3.5 pl-4 pr-2 w-12 text-center">Pos</th>
                <th className="py-3.5 px-3">Club</th>
                <th className="py-3.5 px-2 text-center">P</th>
                <th className="py-3.5 px-2 text-center">W</th>
                <th className="py-3.5 px-2 text-center">D</th>
                <th className="py-3.5 px-2 text-center">L</th>
                <th className="py-3.5 px-2 text-center hidden md:table-cell">GF</th>
                <th className="py-3.5 px-2 text-center hidden md:table-cell">GA</th>
                <th className="py-3.5 px-2 text-center font-mono">GD</th>
                <th className="py-3.5 px-3 text-center font-bold text-slate-800 dark:text-slate-200">Pts</th>
                <th className="py-3.5 pr-4 pl-2 text-center hidden sm:table-cell">Recent Form</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-200">
              {standings.map((row) => {
                const isFavorite = favoriteTeamIds.includes(row.team.id);
                return (
                  <tr
                    key={row.team.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    {/* Position & Qualification indicator */}
                    <td className="py-3 pl-4 pr-2 text-center font-mono font-bold">
                      <div className="flex items-center justify-center gap-1.5">
                        <span
                          className={`w-1.5 h-4 rounded-full ${
                            row.position <= 4
                              ? 'bg-blue-500'
                              : row.position === 5
                              ? 'bg-amber-500'
                              : row.position === 6
                              ? 'bg-emerald-500'
                              : row.position >= 18
                              ? 'bg-rose-500'
                              : 'bg-transparent'
                          }`}
                        ></span>
                        <span className="w-5">{row.position}</span>
                      </div>
                    </td>

                    {/* Team & Crest */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => onToggleFavorite(row.team.id, e)}
                          className="text-slate-400 hover:text-amber-400 transition-colors p-0.5"
                        >
                          <Star
                            className={`w-3.5 h-3.5 ${
                              isFavorite ? 'fill-amber-400 text-amber-400' : ''
                            }`}
                          />
                        </button>
                        <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 p-1 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                          <img
                            src={row.team.logo}
                            alt={row.team.name}
                            className="w-5 h-5 object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {row.team.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-2 text-center font-mono">{row.playedGames}</td>
                    <td className="py-3 px-2 text-center font-mono text-slate-700 dark:text-slate-300">{row.won}</td>
                    <td className="py-3 px-2 text-center font-mono text-slate-500 dark:text-slate-400">{row.draw}</td>
                    <td className="py-3 px-2 text-center font-mono text-slate-500 dark:text-slate-400">{row.lost}</td>
                    <td className="py-3 px-2 text-center font-mono text-slate-500 dark:text-slate-400 hidden md:table-cell">{row.goalsFor}</td>
                    <td className="py-3 px-2 text-center font-mono text-slate-500 dark:text-slate-400 hidden md:table-cell">{row.goalsAgainst}</td>
                    <td className="py-3 px-2 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                      {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-black text-sm text-emerald-600 dark:text-emerald-400">
                      {row.points}
                    </td>

                    {/* Form badges */}
                    <td className="py-3 pr-4 pl-2 text-center hidden sm:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        {row.form.map((res, i) => (
                          <span
                            key={i}
                            className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                              res === 'W'
                                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                                : res === 'D'
                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40'
                            }`}
                          >
                            {res}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Table Legend */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/30">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Champions League (Top 4)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Europa League
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Relegation Zone
            </span>
          </div>
        </div>
      ) : (
        /* Top Scorers Leaderboard */
        <div className="overflow-x-auto rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold text-[11px] bg-slate-50 dark:bg-slate-950/40">
                <th className="py-3.5 pl-4 pr-2 w-12 text-center">Rank</th>
                <th className="py-3.5 px-3">Player & Club</th>
                <th className="py-3.5 px-2 text-center">Nation</th>
                <th className="py-3.5 px-2 text-center">Matches</th>
                <th className="py-3.5 px-2 text-center">Assists</th>
                <th className="py-3.5 px-2 text-center">Penalties</th>
                <th className="py-3.5 pr-4 pl-2 text-center font-bold text-emerald-600 dark:text-emerald-400">Goals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-200">
              {topScorers.map((sc) => (
                <tr key={sc.player.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 pl-4 pr-2 text-center font-mono font-bold">
                    {sc.rank === 1 ? '🥇' : sc.rank === 2 ? '🥈' : sc.rank === 3 ? '🥉' : sc.rank}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 p-1 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                        <img
                          src={sc.player.teamLogo}
                          alt={sc.player.teamName}
                          className="w-5 h-5 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 block">{sc.player.name}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{sc.player.teamName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-2 text-center text-slate-500 dark:text-slate-400">{sc.player.nationality}</td>
                  <td className="py-3.5 px-2 text-center font-mono text-slate-500 dark:text-slate-400">{sc.playedMatches}</td>
                  <td className="py-3.5 px-2 text-center font-mono text-slate-700 dark:text-slate-300">{sc.assists}</td>
                  <td className="py-3.5 px-2 text-center font-mono text-slate-500 dark:text-slate-400">{sc.penalties}</td>
                  <td className="py-3.5 pr-4 pl-2 text-center font-mono font-black text-base text-emerald-600 dark:text-emerald-400">
                    {sc.goals}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
