import React, { useState } from 'react';
import {
  X,
  Sparkles,
  TrendingUp,
  Shield,
  Activity,
  Users,
  Clock,
  MapPin,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';
import { Match, MatchAIAnalysis, PreMatchAIPreview } from '../types';

interface MatchDetailModalProps {
  match: Match | null;
  onClose: () => void;
  onGenerateAIAnalysis?: (matchId: string) => Promise<MatchAIAnalysis>;
}

type ModalTab = 'timeline' | 'lineups' | 'stats' | 'ai-review' | 'preview';

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  match,
  onClose,
  onGenerateAIAnalysis,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('ai-review');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<MatchAIAnalysis | undefined>(
    match?.aiAnalysis
  );

  if (!match) return null;

  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const isUpcoming = match.status === 'UPCOMING';

  const handleTriggerAI = async () => {
    if (!onGenerateAIAnalysis) return;
    setIsGeneratingAI(true);
    try {
      const result = await onGenerateAIAnalysis(match.id);
      setCurrentAnalysis(result);
    } catch (err) {
      console.error('Failed to run AI analysis:', err);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        id="match-detail-modal"
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
      >
        {/* Modal Header / Scoreboard Banner */}
        <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700/80 p-5 sm:p-6 text-slate-100 shrink-0">
          {/* Top Bar: League & Close */}
          <div className="flex items-center justify-between mb-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-emerald-400">{match.leagueName}</span>
              <span>•</span>
              <span>{match.leagueCountry}</span>
              {match.round && <span>• {match.round}</span>}
              {match.matchday && <span>• Matchday {match.matchday}</span>}
            </div>

            <button
              id="close-match-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Scoreboard */}
          <div className="grid grid-cols-12 items-center gap-4">
            {/* Home Team */}
            <div className="col-span-5 flex items-center justify-end gap-3 sm:gap-4 text-right">
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-100 truncate">
                  {match.homeTeam.name}
                </h2>
                <p className="text-xs text-slate-400 hidden sm:block">{match.homeTeam.manager || 'Manager'}</p>
              </div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-800 p-2 flex items-center justify-center shrink-0 border border-slate-700 shadow-md">
                <img
                  src={match.homeTeam.logo}
                  alt={match.homeTeam.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Score / Status */}
            <div className="col-span-2 flex flex-col items-center justify-center text-center">
              {isUpcoming ? (
                <div className="flex flex-col items-center">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold uppercase mb-1">
                    Upcoming
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 bg-slate-950 px-4 py-1.5 rounded-2xl border border-slate-800 shadow-inner">
                    <span className={`text-2xl sm:text-3xl font-black font-mono ${isLive ? 'text-emerald-400' : 'text-slate-100'}`}>
                      {match.score.home}
                    </span>
                    <span className="text-slate-500 font-mono text-lg">:</span>
                    <span className={`text-2xl sm:text-3xl font-black font-mono ${isLive ? 'text-emerald-400' : 'text-slate-100'}`}>
                      {match.score.away}
                    </span>
                  </div>

                  {isLive && (
                    <div className="mt-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold animate-pulse border border-emerald-500/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>{match.minute}&apos; Live</span>
                    </div>
                  )}

                  {isFinished && (
                    <span className="mt-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Full Time
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="col-span-5 flex items-center justify-start gap-3 sm:gap-4 text-left">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-800 p-2 flex items-center justify-center shrink-0 border border-slate-700 shadow-md">
                <img
                  src={match.awayTeam.logo}
                  alt={match.awayTeam.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-100 truncate">
                  {match.awayTeam.name}
                </h2>
                <p className="text-xs text-slate-400 hidden sm:block">{match.awayTeam.manager || 'Manager'}</p>
              </div>
            </div>
          </div>

          {/* Match Metadata Pill */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {match.venue}
            </span>
            {match.referee && (
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-slate-500" />
                Ref: {match.referee}
              </span>
            )}
            {match.stats?.xg && (
              <span className="font-mono text-emerald-400">
                xG: {match.stats.xg[0]} vs {match.stats.xg[1]}
              </span>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-around border-b border-slate-800 bg-slate-900/90 px-4 py-2 shrink-0 overflow-x-auto">
          {[
            { id: 'ai-review' as ModalTab, label: 'AI Tactical Review', icon: Sparkles, badge: 'Smart' },
            { id: 'timeline' as ModalTab, label: 'Match Timeline', icon: Clock },
            { id: 'lineups' as ModalTab, label: 'Lineups & Pitch', icon: Users },
            { id: 'stats' as ModalTab, label: 'Match Stats & xG', icon: Activity },
            { id: 'preview' as ModalTab, label: 'H2H & Context', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[10px]">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-slate-200 space-y-6">
          {/* TAB 1: AI TACTICAL REVIEW */}
          {activeTab === 'ai-review' && (
            <div className="space-y-6">
              {/* Header Action */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                      Gemini 3.7 Tactical Engine
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                        Pro License
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Objective statistical match breakdown & turning point synthesis
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleTriggerAI}
                  disabled={isGeneratingAI}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAI ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingAI ? 'Analyzing...' : 'Re-Analyze Match'}</span>
                </button>
              </div>

              {currentAnalysis ? (
                <div className="space-y-5">
                  {/* Headline & Tactical Summary */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                    <h4 className="text-base sm:text-lg font-bold text-slate-100 mb-2 leading-snug">
                      {currentAnalysis.headline}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentAnalysis.tacticalSummary}
                    </p>
                  </div>

                  {/* Why Team Won / Lost */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                    <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4" />
                      Tactical Deciding Factor (Why the Outcome Happened)
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {currentAnalysis.whyTeamWonLost}
                    </p>
                  </div>

                  {/* Turning Points Grid */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Match Turning Points
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {currentAnalysis.turningPoints?.map((tp, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="px-2 py-0.5 rounded bg-slate-700 text-emerald-400 font-mono text-xs font-bold">
                                {tp.minute}&apos;
                              </span>
                              <span
                                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                  tp.impact === 'Decisive'
                                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                }`}
                              >
                                {tp.impact}
                              </span>
                            </div>
                            <p className="text-xs text-slate-200">{tp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Player Performances */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Key Player Tactical Ratings
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentAnalysis.keyPlayerPerformances?.map((p, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-start justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-sm text-slate-100">{p.playerName}</span>
                              <span className="text-[11px] text-slate-400">({p.team})</span>
                            </div>
                            <p className="text-xs text-slate-300">{p.verdict}</p>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black font-mono flex items-center justify-center shrink-0 text-sm">
                            {p.rating}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Manager Duel & xG Fairness */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                      <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block mb-1">
                        Managerial Battle
                      </span>
                      <p className="text-xs text-slate-300">{currentAnalysis.managerTacticalBattle}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                      <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider block mb-1">
                        xG & Statistical Fairness
                      </span>
                      <p className="text-xs text-slate-300">{currentAnalysis.xgVerdict}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 space-y-3">
                  <p className="text-slate-400 text-sm">No analysis generated yet for this match.</p>
                  <button
                    onClick={handleTriggerAI}
                    disabled={isGeneratingAI}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    Generate Instant AI Match Analysis
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Chronological Match Timeline
              </h4>
              {match.events && match.events.length > 0 ? (
                <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
                  {match.events.map((event) => {
                    const isHome = event.teamId === match.homeTeam.id;
                    return (
                      <div key={event.id} className="relative group">
                        {/* Dot on line */}
                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center text-[10px]">
                          {event.type === 'goal' && '⚽'}
                          {event.type === 'yellow_card' && '🟨'}
                          {event.type === 'red_card' && '🟥'}
                          {event.type === 'substitution' && '🔄'}
                        </div>

                        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-emerald-400">
                                {event.minute}&apos;
                              </span>
                              <span className="font-bold text-sm text-slate-100">
                                {event.playerName}
                              </span>
                              <span className="text-xs text-slate-400">
                                ({isHome ? match.homeTeam.name : match.awayTeam.name})
                              </span>
                            </div>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                              {event.type.replace('_', ' ')}
                            </span>
                          </div>

                          {event.assistPlayerName && (
                            <p className="text-xs text-slate-400">
                              Assist: <span className="text-slate-200 font-medium">{event.assistPlayerName}</span>
                            </p>
                          )}
                          {event.subInPlayerName && (
                            <p className="text-xs text-slate-300">
                              In: <span className="text-emerald-400">{event.subInPlayerName}</span> • Out: <span className="text-rose-400">{event.subOutPlayerName}</span>
                            </p>
                          )}
                          {event.description && (
                            <p className="text-xs text-slate-400 mt-1">{event.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No major events recorded yet for this fixture.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LINEUPS & 2D PITCH */}
          {activeTab === 'lineups' && (
            <div className="space-y-6">
              {match.lineups ? (
                <div className="space-y-6">
                  {/* Pitch Diagram */}
                  <div className="relative w-full aspect-[16/10] max-h-[420px] bg-gradient-to-b from-emerald-900/60 to-emerald-950/90 border-2 border-emerald-600/40 rounded-3xl p-4 overflow-hidden flex flex-col justify-between shadow-inner">
                    {/* Pitch Markings */}
                    <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 border-t-2 border-emerald-500/30"></div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-emerald-500/30 pointer-events-none"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 border-b-2 border-x-2 border-emerald-500/30"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-20 border-t-2 border-x-2 border-emerald-500/30"></div>

                    {/* Home Team Formation (Top Half) */}
                    <div className="relative z-10">
                      <div className="text-center mb-2">
                        <span className="text-xs font-bold text-white bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
                          {match.homeTeam.name} ({match.lineups.home.formation})
                        </span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 justify-items-center">
                        {match.lineups.home.startingXI.slice(0, 6).map((p) => (
                          <div key={p.id} className="flex flex-col items-center text-center group cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform">
                              {p.number}
                            </div>
                            <span className="text-[10px] text-slate-100 font-semibold bg-slate-950/70 px-1.5 py-0.5 rounded mt-1 truncate max-w-[80px]">
                              {p.name.split(' ').pop()}
                            </span>
                            {p.rating && (
                              <span className="text-[9px] text-emerald-400 font-mono font-bold">
                                ★ {p.rating}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Away Team Formation (Bottom Half) */}
                    <div className="relative z-10">
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 justify-items-center mb-2">
                        {match.lineups.away.startingXI.slice(0, 6).map((p) => (
                          <div key={p.id} className="flex flex-col items-center text-center group cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform">
                              {p.number}
                            </div>
                            <span className="text-[10px] text-slate-100 font-semibold bg-slate-950/70 px-1.5 py-0.5 rounded mt-1 truncate max-w-[80px]">
                              {p.name.split(' ').pop()}
                            </span>
                            {p.rating && (
                              <span className="text-[9px] text-cyan-400 font-mono font-bold">
                                ★ {p.rating}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-bold text-white bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
                          {match.awayTeam.name} ({match.lineups.away.formation})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Starting XI Lists & Substitutes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Home Starting XI */}
                    <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                      <h5 className="font-bold text-xs text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>{match.homeTeam.name} Lineup</span>
                        <span className="text-emerald-400 font-mono">{match.lineups.home.formation}</span>
                      </h5>
                      <div className="space-y-1.5">
                        {match.lineups.home.startingXI.map((p) => (
                          <div key={p.id} className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-slate-700/40">
                            <div className="flex items-center gap-2">
                              <span className="w-5 text-slate-400 font-mono font-bold">{p.number}</span>
                              <span className="font-medium text-slate-200">{p.name}</span>
                              {p.isCaptain && <span className="text-[10px] font-bold text-amber-400">(C)</span>}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] px-1.5 rounded bg-slate-700 text-slate-300">{p.position}</span>
                              {p.rating && <span className="font-mono text-emerald-400 font-bold">{p.rating}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Away Starting XI */}
                    <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                      <h5 className="font-bold text-xs text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>{match.awayTeam.name} Lineup</span>
                        <span className="text-cyan-400 font-mono">{match.lineups.away.formation}</span>
                      </h5>
                      <div className="space-y-1.5">
                        {match.lineups.away.startingXI.map((p) => (
                          <div key={p.id} className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-slate-700/40">
                            <div className="flex items-center gap-2">
                              <span className="w-5 text-slate-400 font-mono font-bold">{p.number}</span>
                              <span className="font-medium text-slate-200">{p.name}</span>
                              {p.isCaptain && <span className="text-[10px] font-bold text-amber-400">(C)</span>}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] px-1.5 rounded bg-slate-700 text-slate-300">{p.position}</span>
                              {p.rating && <span className="font-mono text-cyan-400 font-bold">{p.rating}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Lineups will be confirmed approximately 60 minutes before kickoff.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MATCH STATS & MOMENTUM */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              {match.stats ? (
                <div className="space-y-4">
                  {/* Possession Bar */}
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-emerald-400">{match.stats.possession[0]}%</span>
                      <span className="text-slate-400 uppercase tracking-wider">Ball Possession</span>
                      <span className="text-cyan-400">{match.stats.possession[1]}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${match.stats.possession[0]}%` }}
                        className="bg-emerald-500 h-full transition-all"
                      ></div>
                      <div
                        style={{ width: `${match.stats.possession[1]}%` }}
                        className="bg-cyan-500 h-full transition-all"
                      ></div>
                    </div>
                  </div>

                  {/* Stat Comparative Rows */}
                  <div className="space-y-2">
                    {[
                      { label: 'Expected Goals (xG)', home: match.stats.xg[0], away: match.stats.xg[1] },
                      { label: 'Total Shots', home: match.stats.shots[0], away: match.stats.shots[1] },
                      { label: 'Shots on Target', home: match.stats.shotsOnTarget[0], away: match.stats.shotsOnTarget[1] },
                      { label: 'Total Passes', home: match.stats.passes[0], away: match.stats.passes[1] },
                      { label: 'Passing Accuracy %', home: `${match.stats.passAccuracy[0]}%`, away: `${match.stats.passAccuracy[1]}%` },
                      { label: 'Corner Kicks', home: match.stats.corners[0], away: match.stats.corners[1] },
                      { label: 'Fouls Committed', home: match.stats.fouls[0], away: match.stats.fouls[1] },
                      { label: 'Goalkeeper Saves', home: match.stats.saves[0], away: match.stats.saves[1] },
                      { label: 'Yellow Cards', home: match.stats.yellowCards[0], away: match.stats.yellowCards[1] },
                    ].map((st, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs"
                      >
                        <span className="font-mono font-bold text-slate-100 w-16 text-left">
                          {st.home}
                        </span>
                        <span className="text-slate-400 font-medium">{st.label}</span>
                        <span className="font-mono font-bold text-slate-100 w-16 text-right">
                          {st.away}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Momentum Graph */}
                  {match.momentum && match.momentum.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                          Attacking Pressure Momentum (Minute by Minute)
                        </span>
                        <span className="text-[11px] text-slate-400">Green = Home • Cyan = Away</span>
                      </div>
                      <div className="h-24 flex items-center justify-between gap-1 pt-4 border-t border-slate-700/60">
                        {match.momentum.map((m, idx) => {
                          const height = Math.abs(m.momentum);
                          const isHomeAdv = m.momentum >= 0;
                          return (
                            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-center group relative">
                              <div
                                style={{ height: `${height}%` }}
                                className={`w-full max-w-[12px] rounded-t-sm transition-all ${
                                  isHomeAdv ? 'bg-emerald-400' : 'bg-cyan-400'
                                }`}
                              ></div>
                              <span className="text-[9px] text-slate-500 font-mono mt-1">{m.minute}&apos;</span>
                              {m.eventLabel && (
                                <div className="absolute -top-6 bg-slate-950 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap hidden group-hover:block z-20 border border-slate-700">
                                  {m.eventLabel}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Detailed match statistics are populated when the fixture kicks off.
                </div>
              )}
            </div>
          )}

          {/* TAB 5: H2H & CONTEXT */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              {match.preMatchPreview ? (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                    <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                      Key Tactical Clash
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-200">
                      {match.preMatchPreview.keyTacticalClash}
                    </p>
                  </div>

                  {/* Win Probability */}
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      AI Win Probability Forecast
                    </h5>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                        <span className="text-xs text-slate-400 block mb-1">{match.homeTeam.name}</span>
                        <span className="text-lg font-black font-mono text-emerald-400">
                          {match.preMatchPreview.winProbability.home}%
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-700/40 border border-slate-600">
                        <span className="text-xs text-slate-400 block mb-1">Draw</span>
                        <span className="text-lg font-black font-mono text-slate-200">
                          {match.preMatchPreview.winProbability.draw}%
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                        <span className="text-xs text-slate-400 block mb-1">{match.awayTeam.name}</span>
                        <span className="text-lg font-black font-mono text-cyan-400">
                          {match.preMatchPreview.winProbability.away}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Players to Watch */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Players to Watch
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {match.preMatchPreview.playersToWatch.map((player, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>{player}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                    <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                      Tactical Advice
                    </h5>
                    <p className="text-xs text-slate-200">{match.preMatchPreview.tacticalAdvice}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Pre-match tactical forecast generated automatically prior to matchday kickoff.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
