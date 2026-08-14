import React, { useState } from 'react';
import { BrainCircuit, Send, Sparkles, RefreshCw, User, Bot, Compass, ShieldCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: string[];
}

export const AIAnalystChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Welcome to the **PitchIQ Tactical Intelligence Room** powered by Gemini 3.7 Flash.\n\nI specialize in advanced football tactical analytics, pressing structures, Expected Goals (xG), set-piece analysis, and squad comparison.\n\nHow can I help analyze today's matchday?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['UEFA Tactical Engine', 'Opta Advanced Metrics Model'],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const samplePrompts = [
    'How did Arteta high-press disrupt Manchester City build-up phase?',
    'Compare Erling Haaland vs Kylian Mbappé xG per 90 and conversion rates.',
    'Explain the tactical strengths of Xabi Alonso 3-4-2-1 at Bayer Leverkusen.',
    'What are the main tactical flaws in a high defensive offside line?',
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/ask-analyst', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend }),
      });

      if (!res.ok) {
        throw new Error('Failed to query AI Analyst');
      }

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.answer || 'Tactical analysis completed.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || ['PitchIQ Football Intelligence Hub'],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Unable to complete AI query: ${err.message}. Please verify server status.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[500px] max-w-4xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Room Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 via-indigo-50/50 to-slate-50 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-md">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Tactical AI Intelligence Assistant
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-mono border border-emerald-500/30">
                Gemini 3.7 Flash
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instant match breakdown, tactical theory, and statistical modeling
            </p>
          </div>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 text-sm bg-slate-50/50 dark:bg-slate-900/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-600/20 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 rounded-tl-none space-y-3'
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                {msg.text}
              </div>

              {msg.sources && msg.sources.length > 0 && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Grounding: {msg.sources.join(', ')}</span>
                </div>
              )}

              <span className="text-[9px] text-slate-400 block text-right">
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-600/20 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin" />
            </div>
            <span>Analyzing tactical structures and metrics...</span>
          </div>
        )}
      </div>

      {/* Suggested Chips */}
      <div className="px-4 py-2 bg-slate-100 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto">
        <Compass className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] whitespace-nowrap border border-slate-200 dark:border-slate-700 transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <input
          id="analyst-chat-input"
          type="text"
          placeholder="Ask tactical question (e.g., 'Analyze Arsenal transition vs City', 'Why did Real Madrid win?')..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
        />
        <button
          id="send-analyst-query-btn"
          onClick={() => handleSend()}
          disabled={!inputQuery.trim() || isLoading}
          className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors disabled:opacity-40 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
