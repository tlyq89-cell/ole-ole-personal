import React, { useState } from 'react';
import { Search, Star, Globe, Sun, Moon, Crown, Trophy, ChevronDown } from 'lucide-react';
import { UserSubscription } from '../types';
import { LANGUAGES, t, SupportedLanguage } from '../utils/i18n';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  favoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  liveMatchesCount: number;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  currentSubscription?: UserSubscription;
  onOpenMembership?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  favoritesOnly,
  onToggleFavorites,
  favoritesCount,
  selectedLanguage,
  onSelectLanguage,
  liveMatchesCount,
  theme = 'dark',
  onToggleTheme,
  currentSubscription = { tier: 'normal' as const },
  onOpenMembership,
}) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const safeSub: UserSubscription = currentSubscription || { tier: 'normal' as const };
  const isTrial = safeSub.tier === 'silver_trial';
  const isPaid = safeSub.tier !== 'normal';

  const currentLangObj = LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Branding & Live Pulse */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-black tracking-tighter text-xl shrink-0">
              ⚽
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl text-slate-900 dark:text-slate-100 tracking-tight leading-none bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
                  Ole Ole
                </span>
                <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  LIVE SCORE & AI
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 hidden sm:flex items-center gap-1 mt-0.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Onside</span> — {t('tagline', selectedLanguage)}
              </p>
            </div>
          </div>

          {liveMatchesCount > 0 && (
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>{liveMatchesCount} {t('live', selectedLanguage)}</span>
            </div>
          )}
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="main-search-input"
              type="text"
              placeholder={t('searchPlaceholder', selectedLanguage)}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* Memberships Button */}
          <button
            id="btn-header-membership"
            onClick={onOpenMembership}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isPaid
                ? 'bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border-amber-500/50 text-amber-700 dark:text-amber-300 shadow-sm'
                : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 shadow-sm'
            }`}
            title="VIP Memberships & Perks"
          >
            <Crown className="w-4 h-4 text-amber-500" />
            <span className="hidden md:inline">
              {isTrial ? 'Silver Trial (Active)' : isPaid ? `${safeSub.tier.toUpperCase()} VIP` : t('memberships', selectedLanguage)}
            </span>
            <span className="md:hidden">VIP</span>
            {!isPaid && (
              <span className="px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-emerald-500 text-slate-950">
                {t('trial3Mo', selectedLanguage)}
              </span>
            )}
          </button>

          {/* Theme Toggle Button (Light / Dark) */}
          <button
            id="btn-toggle-theme"
            onClick={onToggleTheme}
            aria-label="Toggle dark and light theme"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          {/* Favorites Filter */}
          <button
            id="toggle-favorites-btn"
            onClick={onToggleFavorites}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              favoritesOnly
                ? 'bg-amber-500/15 border-amber-500/50 text-amber-700 dark:text-amber-300 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Filter by favorite teams"
          >
            <Star className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span className="hidden md:inline">{t('favorites', selectedLanguage)}</span>
            {favoritesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] flex items-center justify-center font-black">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="language-select-btn"
              onClick={() => setIsLangDropdownOpen((prev) => !prev)}
              className="px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Change Language"
            >
              <span className="text-sm">{currentLangObj.flag}</span>
              <span className="uppercase text-[11px] font-black">{currentLangObj.code}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isLangDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsLangDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelectLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        selectedLanguage === lang.code 
                          ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {selectedLanguage === lang.code && <span className="text-emerald-500 text-xs font-black">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
