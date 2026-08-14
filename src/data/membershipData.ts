import { MembershipPlan, AuctionItem } from '../types';

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'normal',
    name: 'Normal Member',
    pricePerYear: 0,
    period: 'forever',
    description: 'Basic access to football scores, standings, and curated match notifications.',
    streamingPerk: 'Standard match trackers & highlights',
    ticketDiscountPercent: 0,
    merchDiscountPercent: 0,
    auctionAccess: false,
    auctionTierAllowed: 'none',
    features: [
      'Free access to live score center & web app',
      'Match notifications & real-time goal alerts',
      'League standings & top scorers',
      'Daily football news & team digests',
      'Community match discussion preview'
    ]
  },
  {
    id: 'silver_trial',
    name: 'Silver 3-Month Trial',
    pricePerYear: 0,
    period: '90 days free',
    badge: '3-Month Free Trial',
    badgeColor: 'bg-emerald-500 text-white',
    description: 'Enjoy all Silver Subscription benefits completely free for 3 full months.',
    streamingPerk: '10% discount on live stream PPV passes',
    streamingDiscountPercent: 10,
    ticketDiscountPercent: 10,
    merchDiscountPercent: 10,
    auctionAccess: true,
    auctionTierAllowed: 'silver',
    features: [
      '3 Months completely free Silver access',
      '10% discount on live stream match passes',
      '10% discount on official football match tickets',
      '10% discount on official club merchandise',
      'Access to Silver tier VIP auction place',
      'Priority push notifications & AI tactical analysis',
      'No card charge during 90-day trial period'
    ]
  },
  {
    id: 'silver',
    name: 'Silver Subscription',
    pricePerYear: 60,
    period: 'year',
    badge: '$5.00 / mo billed annually',
    badgeColor: 'bg-slate-400 text-slate-900 dark:bg-slate-300',
    description: 'Perfect for passionate fans seeking discounts on matchdays, streaming, and gear.',
    streamingPerk: '10% discount on live stream service',
    streamingDiscountPercent: 10,
    ticketDiscountPercent: 10,
    merchDiscountPercent: 10,
    auctionAccess: true,
    auctionTierAllowed: 'silver',
    features: [
      '10% discount on live stream service & passes',
      '10% discount on football match tickets worldwide',
      '10% discount on verified club merchandise & kits',
      'Access to exclusive VIP Memorabilia Auction Place',
      'Unlimited AI Tactical Match Analyst queries',
      'Fast-track ticket drop notifications'
    ]
  },
  {
    id: 'gold',
    name: 'Gold Subscription',
    pricePerYear: 100,
    period: 'year',
    badge: 'Most Popular',
    badgeColor: 'bg-amber-500 text-slate-950 font-bold',
    isPopular: true,
    description: 'Includes a FREE full-season live stream pass for your favorite chosen league.',
    streamingPerk: 'Free live stream service for 1 entire league',
    streamingDiscountPercent: 100,
    ticketDiscountPercent: 15,
    merchDiscountPercent: 15,
    auctionAccess: true,
    auctionTierAllowed: 'gold',
    features: [
      'FREE live stream service for 1 chosen league (EPL, La Liga, Serie A, etc.)',
      '15% discount on football match tickets',
      '15% discount on official club merchandise',
      'Full access to Gold & Silver VIP Auction Place',
      'Early pre-sale access to major derby and cup finals',
      'HD & 4K multi-camera stream feeds',
      'Advanced xG & player tracking telemetry'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum Subscription',
    pricePerYear: 200,
    period: 'year',
    badge: 'Ultimate Fan VIP',
    badgeColor: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold',
    description: 'The premier package: Free live streaming for your league PLUS the UEFA Champions League.',
    streamingPerk: 'Free live stream for 1 league + Champions League',
    streamingDiscountPercent: 100,
    ticketDiscountPercent: 20,
    merchDiscountPercent: 20,
    auctionAccess: true,
    auctionTierAllowed: 'platinum',
    features: [
      'FREE live stream service for 1 domestic league + ALL Champions League matches',
      '20% discount on football match tickets (including VIP hospitality boxes)',
      '20% discount on official club merchandise & historic retro drops',
      'Unrestricted VIP access to ALL rare auctions (match-worn kits, balls)',
      'Direct priority AI Analyst concierge with live betting odds insight',
      'Complimentary physical pitch-side welcome gift box annually',
      'Access to closed player meet-and-greet ballot draws'
    ]
  }
];

export const INITIAL_AUCTION_ITEMS: AuctionItem[] = [
  {
    id: 'auc-1',
    title: 'Erling Haaland Signed Match-Worn 2024/25 Manchester City Jersey',
    subtitle: 'Worn vs Real Madrid in UEFA Champions League QF with official club holographic seal',
    category: 'Signed Jersey',
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
    currentBidUSD: 1450,
    startingBidUSD: 500,
    minNextBidUSD: 1500,
    totalBids: 18,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 28).toISOString(), // 28 hours
    minTier: 'silver',
    club: 'Manchester City',
    certificateOfAuthenticity: true,
    highestBidderName: 'David K. (Platinum Member)',
    bidsHistory: [
      { bidder: 'David K. (Platinum)', amount: 1450, timestamp: '10 mins ago' },
      { bidder: 'Marcus S. (Gold)', amount: 1350, timestamp: '45 mins ago' },
      { bidder: 'Elena R. (Silver)', amount: 1200, timestamp: '2 hours ago' }
    ]
  },
  {
    id: 'auc-2',
    title: 'El Clásico Santiago Bernabéu VIP President Box Package (2 Tickets)',
    subtitle: 'Real Madrid vs FC Barcelona with full gourmet catering, paddock lounge & pitch-side walk',
    category: 'VIP Match Box',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    currentBidUSD: 3200,
    startingBidUSD: 1200,
    minNextBidUSD: 3300,
    totalBids: 29,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 14).toISOString(), // 14 hours
    minTier: 'gold',
    club: 'Real Madrid / Barcelona',
    certificateOfAuthenticity: true,
    highestBidderName: 'Carlos M. (Platinum Member)',
    bidsHistory: [
      { bidder: 'Carlos M. (Platinum)', amount: 3200, timestamp: '5 mins ago' },
      { bidder: 'Liam B. (Gold)', amount: 3000, timestamp: '30 mins ago' },
      { bidder: 'Sophie T. (Platinum)', amount: 2800, timestamp: '1 hour ago' }
    ]
  },
  {
    id: 'auc-3',
    title: 'Kylian Mbappé Official Match-Ball from First UCL Hat-Trick',
    subtitle: 'Signed by Mbappé with personalized inscription and UEFA verification chip',
    category: 'Match Ball',
    imageUrl: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=800&q=80',
    currentBidUSD: 2100,
    startingBidUSD: 800,
    minNextBidUSD: 2200,
    totalBids: 22,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 52).toISOString(), // 52 hours
    minTier: 'silver',
    club: 'Real Madrid',
    certificateOfAuthenticity: true,
    highestBidderName: 'Tariq A. (Silver Trial)',
    bidsHistory: [
      { bidder: 'Tariq A. (Silver Trial)', amount: 2100, timestamp: '18 mins ago' },
      { bidder: 'Antoine G. (Gold)', amount: 1950, timestamp: '1 hour ago' },
      { bidder: 'Oliver H. (Platinum)', amount: 1800, timestamp: '3 hours ago' }
    ]
  },
  {
    id: 'auc-4',
    title: 'Lamine Yamal Custom Match Boots (Euro & Barça Final Edition)',
    subtitle: 'Custom embroidered Nike Mercurial boots worn during historic Clasico victory',
    category: 'Signed Boots',
    imageUrl: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=800&q=80',
    currentBidUSD: 1850,
    startingBidUSD: 750,
    minNextBidUSD: 1950,
    totalBids: 15,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 76).toISOString(),
    minTier: 'silver',
    club: 'FC Barcelona',
    certificateOfAuthenticity: true,
    highestBidderName: 'Mateo R. (Gold Member)',
    bidsHistory: [
      { bidder: 'Mateo R. (Gold)', amount: 1850, timestamp: '22 mins ago' },
      { bidder: 'Jonas V. (Silver)', amount: 1700, timestamp: '4 hours ago' }
    ]
  },
  {
    id: 'auc-5',
    title: 'Ultra Rare 1999 Treble Historic Replica Trophy with Sir Alex Ferguson Signature',
    subtitle: 'Directly from United museum archive, 1 of 5 made worldwide with certificate plaque',
    category: 'Historic Trophy Replica',
    imageUrl: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=800&q=80',
    currentBidUSD: 5400,
    startingBidUSD: 2500,
    minNextBidUSD: 5600,
    totalBids: 34,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(), // 6 hours
    minTier: 'platinum',
    club: 'Manchester United',
    certificateOfAuthenticity: true,
    highestBidderName: 'Edward W. (Platinum Member)',
    bidsHistory: [
      { bidder: 'Edward W. (Platinum)', amount: 5400, timestamp: '12 mins ago' },
      { bidder: 'Sir Richard L. (Platinum)', amount: 5100, timestamp: '2 hours ago' }
    ]
  }
];
