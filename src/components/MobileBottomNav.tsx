import React from 'react';
import { Calendar, Trophy, Newspaper, BrainCircuit, Flame, Crown } from 'lucide-react';
import { NavTab } from './SidebarNav';
import { t } from '../utils/i18n';

interface MobileBottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  liveMatchesCount: number;
  language?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  liveMatchesCount,
  language = 'en',
}) => {
  const tabs = [
    { id: 'scores' as NavTab, label: t('matchCentre', language).split(' ')[0], icon: Calendar, badge: liveMatchesCount > 0 ? liveMatchesCount : null },
    { id: 'standings' as NavTab, label: t('tablesStats', language).split(' ')[0], icon: Trophy },
    { id: 'news' as NavTab, label: t('news', language).split(' ')[0], icon: Newspaper },
    { id: 'auction' as NavTab, label: t('vipAuction', language).split(' ')[0], icon: Flame },
    { id: 'memberships' as NavTab, label: 'VIP', icon: Crown },
    { id: 'ai-analyst' as NavTab, label: 'AI', icon: BrainCircuit },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-2 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`mobile-tab-${tab.id}`}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition-all relative cursor-pointer ${
              isActive 
                ? 'text-emerald-600 dark:text-emerald-400 font-bold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Icon className="w-4 h-4" />
              {tab.badge && (
                <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-mono font-bold flex items-center justify-center animate-pulse">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
