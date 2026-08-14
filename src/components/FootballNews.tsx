import React, { useState } from 'react';
import { Newspaper, Sparkles, ExternalLink, Clock, Tag } from 'lucide-react';
import { FootballNewsArticle } from '../types';

interface FootballNewsProps {
  articles: FootballNewsArticle[];
  onSelectArticle?: (article: FootballNewsArticle) => void;
}

export const FootballNews: React.FC<FootballNewsProps> = ({ articles }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Tactics', 'Match Review', 'Transfer', 'Champions League', 'Breaking'];

  const filteredArticles =
    selectedCategory === 'ALL'
      ? articles
      : articles.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header & Categories */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Football News & AI Briefings</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Curated tactical stories, verified reports, and Gemini executive digests
              </p>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700/80'
              }`}
            >
              {cat === 'ALL' ? 'All Stories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="group flex flex-col justify-between bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Article Image & Badge */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  {article.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold">{article.source}</span>
                <span className="flex items-center gap-1 text-slate-300 text-[11px]">
                  <Clock className="w-3 h-3" />
                  {new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Content & AI Digest */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug mb-2">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              {/* AI Key Insights Box */}
              {article.aiDigest && article.aiDigest.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/20 space-y-2">
                  <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI 30-Second Key Takeaways</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {article.aiDigest.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer Meta & Related Clubs */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {article.relatedTeamNames?.map((team, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium border border-slate-200 dark:border-transparent"
                    >
                      {team}
                    </span>
                  ))}
                </div>

                <span className="text-emerald-600 dark:text-emerald-400 font-medium text-xs flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Full Article <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
