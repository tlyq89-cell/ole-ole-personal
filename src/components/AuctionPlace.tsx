import React, { useState } from 'react';
import { 
  Flame, ShieldCheck, Clock, Award, ArrowUpRight, 
  Lock, Sparkles, Filter, CheckCircle2, AlertCircle, 
  TrendingUp, Tag, Trophy
} from 'lucide-react';
import { AuctionItem, UserSubscription } from '../types';

interface AuctionPlaceProps {
  items: AuctionItem[];
  currentSubscription?: UserSubscription;
  onPlaceBid: (itemId: string, bidAmount: number) => void;
  onOpenMembership: () => void;
}

export const AuctionPlace: React.FC<AuctionPlaceProps> = ({
  items,
  currentSubscription = { tier: 'normal' as const },
  onPlaceBid,
  onOpenMembership
}) => {
  const safeSub: UserSubscription = currentSubscription || { tier: 'normal' as const };
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeItemForBid, setActiveItemForBid] = useState<AuctionItem | null>(null);
  const [customBidAmount, setCustomBidAmount] = useState<number>(0);
  const [bidSuccessMessage, setBidSuccessMessage] = useState<string | null>(null);

  const categories = ['ALL', 'Signed Jersey', 'VIP Match Box', 'Match Ball', 'Signed Boots', 'Historic Trophy Replica'];

  const filteredItems = selectedCategory === 'ALL'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const canAccessAuction = safeSub.tier !== 'normal';

  const isEligibleForTier = (itemTier: 'silver' | 'gold' | 'platinum') => {
    if (!canAccessAuction) return false;
    if (safeSub.tier === 'platinum') return true;
    if (safeSub.tier === 'gold') return itemTier === 'silver' || itemTier === 'gold';
    if (safeSub.tier === 'silver' || safeSub.tier === 'silver_trial') {
      return itemTier === 'silver';
    }
    return false;
  };

  const handleOpenBidModal = (item: AuctionItem) => {
    setActiveItemForBid(item);
    setCustomBidAmount(item.minNextBidUSD);
    setBidSuccessMessage(null);
  };

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItemForBid) return;

    if (customBidAmount < activeItemForBid.minNextBidUSD) {
      alert(`Minimum bid is $${activeItemForBid.minNextBidUSD}`);
      return;
    }

    onPlaceBid(activeItemForBid.id, customBidAmount);
    setBidSuccessMessage(`Success! Your bid of $${customBidAmount.toLocaleString()} has been placed as the current highest.`);
    setTimeout(() => {
      setActiveItemForBid(null);
      setBidSuccessMessage(null);
    }, 1600);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            PitchIQ VIP Football Auction House
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Match-Worn Memorabilia & VIP Matchday Packages
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Exclusive live bidding for Silver, Gold, and Platinum members. All items are 100% verified with blockchain & holographic authenticity certificates.
          </p>

          {!canAccessAuction && (
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="btn-unlock-auction-trial"
                onClick={onOpenMembership}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Activate Free Trial to Unlock Bidding
              </button>
              <span className="text-xs text-slate-400">
                (Silver 3-month free trial includes full auction access)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Filter and stats row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`btn-auction-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
              }`}
            >
              {cat === 'ALL' ? 'All Live Lots' : cat}
            </button>
          ))}
        </div>

        {/* Member Status Badge */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400">Your Eligibility:</span>
          {canAccessAuction ? (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {currentSubscription.tier.toUpperCase()} Member Access
            </span>
          ) : (
            <button
              onClick={onOpenMembership}
              className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              Requires Silver+ Membership (Start Free)
            </button>
          )}
        </div>
      </div>

      {/* Auction Lots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const eligible = isEligibleForTier(item.minTier);

          return (
            <div
              key={item.id}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              {/* Image & Badges Container */}
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </span>

                  <span className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-lg shadow-sm ${
                    item.minTier === 'platinum'
                      ? 'bg-purple-600 text-white'
                      : item.minTier === 'gold'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-700 text-white'
                  }`}>
                    {item.minTier.toUpperCase()} TIER
                  </span>
                </div>

                {/* Authenticity verification pill */}
                {item.certificateOfAuthenticity && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 backdrop-blur-sm text-emerald-300 text-[10px] font-medium border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" />
                    Official Certificate of Authenticity
                  </div>
                )}
              </div>

              {/* Body Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                    {item.club}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                {/* Live Bid Information Box */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Current Highest Bid:</span>
                    <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                      ${item.currentBidUSD.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                      {item.totalBids} bids placed
                    </span>
                    <span className="flex items-center gap-1 text-rose-500 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      Closes in 24h
                    </span>
                  </div>

                  {item.highestBidderName && (
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate pt-1 border-t border-slate-200/60 dark:border-slate-800">
                      Leader: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.highestBidderName}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div>
                  {eligible ? (
                    <button
                      id={`btn-bid-lot-${item.id}`}
                      onClick={() => handleOpenBidModal(item)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Flame className="w-4 h-4" />
                      Place Live Bid (Min ${item.minNextBidUSD})
                    </button>
                  ) : (
                    <button
                      id={`btn-unlock-lot-${item.id}`}
                      onClick={onOpenMembership}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      Upgrade to {item.minTier.toUpperCase()} to Bid
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Place Bid Modal */}
      {activeItemForBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Place Live VIP Bid</h3>
              </div>
              <button
                onClick={() => setActiveItemForBid(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            {bidSuccessMessage ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{bidSuccessMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitBid} className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{activeItemForBid.title}</div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Current High:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">${activeItemForBid.currentBidUSD}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Min Increment:</span>
                    <span>${activeItemForBid.minNextBidUSD}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                    Your Bid Amount (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input
                      id="input-custom-bid"
                      type="number"
                      min={activeItemForBid.minNextBidUSD}
                      step="50"
                      value={customBidAmount}
                      onChange={(e) => setCustomBidAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Quick Increment Buttons */}
                <div className="flex gap-2">
                  {[50, 100, 250, 500].map((inc) => (
                    <button
                      key={inc}
                      type="button"
                      onClick={() => setCustomBidAmount(activeItemForBid.minNextBidUSD + inc)}
                      className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                    >
                      +${inc}
                    </button>
                  ))}
                </div>

                <button
                  id="btn-submit-live-bid"
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Flame className="w-4 h-4" />
                  Confirm Bid (${customBidAmount.toLocaleString()})
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
