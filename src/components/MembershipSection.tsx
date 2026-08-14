import React, { useState } from 'react';
import { 
  Check, Zap, Sparkles, Shield, Trophy, 
  Tv, Ticket, ShoppingBag, Flame, Award, Crown, CheckCircle2 
} from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data/membershipData';
import { MembershipTierId, UserSubscription } from '../types';
import { t } from '../utils/i18n';

interface MembershipSectionProps {
  currentSubscription?: UserSubscription;
  onSelectPlan: (tierId: MembershipTierId, chosenLeague?: string) => void;
  onOpenAuction: () => void;
  language?: string;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({
  currentSubscription = { tier: 'normal' as MembershipTierId },
  onSelectPlan,
  onOpenAuction,
  language = 'en',
}) => {
  const safeSub: UserSubscription = currentSubscription || { tier: 'normal' as MembershipTierId };
  const [selectedLeague, setSelectedLeague] = useState<string>(safeSub.selectedFreeLeague || 'Premier League');
  const [showSuccessNotice, setShowSuccessNotice] = useState(false);
  const [calcTicketsPerYear, setCalcTicketsPerYear] = useState(4);
  const [calcShirtsPerYear, setCalcShirtsPerYear] = useState(2);
  const [calcStreamService, setCalcStreamService] = useState(true);

  const leaguesList = [
    'Premier League (England)',
    'La Liga EA Sports (Spain)',
    'Serie A Enilive (Italy)',
    'Bundesliga (Germany)',
    'Ligue 1 McDonald’s (France)',
    'Major League Soccer (USA)'
  ];

  const calculateEstimatedSavings = (tierId: MembershipTierId) => {
    const avgTicketPrice = 85;
    const avgShirtPrice = 95;
    const standardStreamAnnual = 120;

    let ticketDisc = 0;
    let merchDisc = 0;
    let streamSaving = 0;

    if (tierId === 'silver' || tierId === 'silver_trial') {
      ticketDisc = 0.10;
      merchDisc = 0.10;
      streamSaving = calcStreamService ? standardStreamAnnual * 0.10 : 0;
    } else if (tierId === 'gold') {
      ticketDisc = 0.15;
      merchDisc = 0.15;
      streamSaving = calcStreamService ? standardStreamAnnual : 0;
    } else if (tierId === 'platinum') {
      ticketDisc = 0.20;
      merchDisc = 0.20;
      streamSaving = calcStreamService ? (standardStreamAnnual + 80) : 0;
    }

    const ticketsSavings = calcTicketsPerYear * avgTicketPrice * ticketDisc;
    const merchSavings = calcShirtsPerYear * avgShirtPrice * merchDisc;
    const totalSavings = ticketsSavings + merchSavings + streamSaving;

    return Math.round(totalSavings);
  };

  const handleSubscribe = (tierId: MembershipTierId) => {
    onSelectPlan(tierId, selectedLeague);
    setShowSuccessNotice(true);
    setTimeout(() => {
      setShowSuccessNotice(false);
    }, 2500);
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      {showSuccessNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-slate-950 font-bold flex items-center gap-3 shadow-lg shadow-emerald-500/20 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-6 h-6 text-slate-950" />
          <span>Membership tier updated successfully! Your discounts and VIP privileges are now active.</span>
        </div>
      )}

      {/* Main Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-500/15 via-emerald-500/15 to-teal-500/10 dark:from-amber-950/30 dark:via-emerald-950/30 dark:to-slate-900 border border-amber-500/30 dark:border-slate-800 shadow-sm">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5" />
            <span>VIP Revenue & Membership Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Ole Ole VIP Memberships
          </h1>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            Support your passion with guaranteed discounts on live broadcast passes, official matchday tickets, and club merchandise, plus exclusive access to the VIP Memorabilia Auction Place.
          </p>
        </div>
      </div>

      {/* 3-Month Free Trial Callout */}
      {safeSub.tier === 'normal' && (
        <div className="p-6 rounded-3xl border-2 border-emerald-500/40 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 text-xs font-black uppercase tracking-wider rounded-full bg-emerald-500 text-slate-950">
                {t('specialOffer', language)}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t('silverTrialTitle', language)}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('silverTrialDesc', language)}
            </p>
          </div>

          <button
            id="btn-claim-free-trial-page"
            onClick={() => handleSubscribe('silver_trial')}
            className="px-6 py-3 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            {t('claimTrial', language)}
          </button>
        </div>
      )}

      {/* Active Membership Status Card */}
      {safeSub.tier !== 'normal' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t('activeStatus', language)}</div>
              <div className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                {safeSub.tier === 'silver_trial' ? 'Silver 3-Month Free Trial' : 
                 safeSub.tier === 'silver' ? 'Silver VIP Subscriber' : 
                 safeSub.tier === 'gold' ? `Gold VIP Subscriber (${safeSub.selectedFreeLeague || 'EPL'})` : 
                 'Platinum VIP VIP Subscriber (Domestic + UCL)'}
                <span className="px-2.5 py-0.5 text-[10px] uppercase font-black bg-emerald-500 text-slate-950 rounded-full">Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{t('estimatedSaved', language)}:</span>{' '}
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">${safeSub.totalSavedUSD || 140}</span>
            </div>
            <button
              onClick={onOpenAuction}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Flame className="w-4 h-4" />
              {t('vipAuction', language)}
            </button>
          </div>
        </div>
      )}

      {/* Tier Plans Grid */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">{t('choosePlan', language)}</h2>
          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            {t('choosePlanSub', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERSHIP_PLANS.filter(p => p.id !== 'silver_trial').map((plan) => {
            const isCurrent = safeSub.tier === plan.id || 
              (plan.id === 'silver' && safeSub.tier === 'silver_trial');

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl flex flex-col justify-between p-6 transition-all ${
                  plan.isPopular 
                    ? 'border-2 border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-xl shadow-amber-500/10' 
                    : plan.id === 'platinum'
                    ? 'border-2 border-purple-500/70 bg-purple-50/50 dark:bg-purple-950/20 shadow-xl shadow-purple-500/10'
                    : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`px-3 py-1 text-[11px] font-black uppercase tracking-wider rounded-full shadow-md ${plan.badgeColor || 'bg-slate-900 text-white'}`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Title & Price */}
                  <div className="mt-2 mb-4">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">{plan.name}</h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                        ${plan.pricePerYear}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/{plan.period}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Key discount pills */}
                  <div className="space-y-2.5 py-3.5 my-3 border-y border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
                    <div className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                        <Tv className="w-4 h-4 text-blue-500" /> {t('streaming', language)}:
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white text-right">
                        {plan.streamingPerk}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                        <Ticket className="w-4 h-4 text-emerald-500" /> {t('tickets', language)}:
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {plan.ticketDiscountPercent > 0 ? `${plan.ticketDiscountPercent}% OFF` : 'Standard'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                        <ShoppingBag className="w-4 h-4 text-amber-500" /> {t('merch', language)}:
                      </span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        {plan.merchDiscountPercent > 0 ? `${plan.merchDiscountPercent}% OFF` : 'Standard'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                        <Flame className="w-4 h-4 text-rose-500" /> {t('auctionAccess', language)}:
                      </span>
                      <span className="font-bold">
                        {plan.auctionAccess ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                            <Check className="w-3.5 h-3.5" /> {t('enabled', language)}
                          </span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 font-medium">{t('locked', language)}</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6 text-xs text-slate-700 dark:text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  {isCurrent ? (
                    <div className="w-full py-3 text-center text-xs font-extrabold rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                      {t('currentTier', language)}
                    </div>
                  ) : (
                    <button
                      id={`btn-page-plan-${plan.id}`}
                      onClick={() => handleSubscribe(plan.id)}
                      className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                        plan.id === 'gold'
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                          : plan.id === 'platinum'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/20'
                          : plan.id === 'silver'
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                          : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {plan.id === 'normal' ? t('selectFree', language) : `Join ${plan.name}`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Free League Streaming Selector */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Tv className="w-5 h-5 text-blue-500" />
              Select Free Streaming League (Gold & Platinum Perks)
            </h3>
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
              Choose which full domestic league season you receive complimentary HD/4K live streams for.
            </p>
          </div>

          <select
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {leaguesList.map((lg) => (
              <option key={lg} value={lg.split(' ')[0]}>
                {lg}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Savings Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="flex items-center gap-2.5 mb-5">
          <Zap className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {t('savingsCalc', language)}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              {t('ticketsPerYear', language)}: <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{calcTicketsPerYear}</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="12" 
              value={calcTicketsPerYear} 
              onChange={(e) => setCalcTicketsPerYear(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              {t('jerseysPerYear', language)}: <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">{calcShirtsPerYear}</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="6" 
              value={calcShirtsPerYear} 
              onChange={(e) => setCalcShirtsPerYear(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3">
            <input 
              id="check-calc-stream-page"
              type="checkbox"
              checked={calcStreamService}
              onChange={(e) => setCalcStreamService(e.target.checked)}
              className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
            />
            <label htmlFor="check-calc-stream-page" className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              {t('streamService', language)}
            </label>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
            <div className="text-xs text-emerald-800 dark:text-emerald-300 font-bold">{t('estAnnualSavings', language)}</div>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              ${calculateEstimatedSavings('gold')}/yr
            </div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
              {t('netReturn', language)}: +${calculateEstimatedSavings('gold') - 100}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {t('matrixTitle', language)}
        </h3>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm bg-white dark:bg-slate-900">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">{t('featureBenefit', language)}</th>
                <th className="p-4 text-center">Normal (Free)</th>
                <th className="p-4 text-center">Silver (Trial / $60)</th>
                <th className="p-4 text-center bg-amber-500/15 text-amber-900 dark:text-amber-300">Gold ($100)</th>
                <th className="p-4 text-center bg-purple-500/15 text-purple-900 dark:text-purple-300">Platinum ($200)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-white">Live Stream Access</td>
                <td className="p-4 text-center font-medium">Score Trackers Only</td>
                <td className="p-4 text-center font-medium">10% Pass Discount</td>
                <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400">FREE (1 Full League)</td>
                <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400">FREE (1 League + UCL)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-white">Match Ticket Discount</td>
                <td className="p-4 text-center font-medium">None (0%)</td>
                <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400">10% OFF</td>
                <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400">15% OFF</td>
                <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400">20% OFF</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-white">Official Merchandise Discount</td>
                <td className="p-4 text-center font-medium">None (0%)</td>
                <td className="p-4 text-center font-bold text-amber-600 dark:text-amber-400">10% OFF</td>
                <td className="p-4 text-center font-bold text-amber-600 dark:text-amber-400">15% OFF</td>
                <td className="p-4 text-center font-bold text-amber-600 dark:text-amber-400">20% OFF</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-white">Access to VIP Auction Place</td>
                <td className="p-4 text-center text-slate-400 font-medium">❌</td>
                <td className="p-4 text-center text-emerald-600 dark:text-emerald-400 font-bold">✔ (Silver Lots)</td>
                <td className="p-4 text-center text-emerald-600 dark:text-emerald-400 font-bold">✔ (Gold & Silver)</td>
                <td className="p-4 text-center text-purple-600 dark:text-purple-400 font-black">✔ Unrestricted VIP</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-white">AI Tactical Match Analyst</td>
                <td className="p-4 text-center font-medium">3 queries / day</td>
                <td className="p-4 text-center font-bold">Unlimited</td>
                <td className="p-4 text-center font-bold">Unlimited + Telemetry</td>
                <td className="p-4 text-center font-bold text-indigo-600 dark:text-indigo-400">VIP Priority AI Concierge</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
