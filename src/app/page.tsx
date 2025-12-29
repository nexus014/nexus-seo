"use client"
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Sparkles, Loader2 } from "lucide-react";

export default function KeywordPage() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetch('/api/keywords', {
      method: 'POST',
      body: JSON.stringify({ keyword }),
    });
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Keyword Intelligence</h1>
        <p className="text-zinc-500">Nexus-1 AI analyzes SERP intensity and predicts your path to #1.</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <Input 
            placeholder="Enter target keyword (e.g., 'best ai tools')" 
            className="pl-10 h-12 bg-zinc-900/50 border-zinc-800"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <Button onClick={handleSearch} disabled={loading} className="h-12 px-8 bg-blue-600 hover:bg-blue-500">
          {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" size={18} />}
          Analyze
        </Button>
      </div>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
          <Card className="p-6 bg-zinc-900/50 border-zinc-800">
            <h3 className="font-semibold mb-4 text-blue-400">AI Strategy Insight</h3>
            <div className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
              {results.ai_insight}
            </div>
          </Card>

          <Card className="p-6 bg-zinc-900/50 border-zinc-800">
            <h3 className="font-semibold mb-4 text-emerald-400">Top Competitors</h3>
            <div className="space-y-4">
              {results.serp.map((item: any, i: number) => (
                <div key={i} className="flex flex-col gap-1 border-b border-zinc-800 pb-2 last:border-0">
                  <span className="text-xs text-blue-500 font-mono">#{i + 1}</span>
                  <a href={item.link} target="_blank" className="text-sm font-medium hover:underline truncate">
                    {item.title}
                  </a>
                  <span className="text-xs text-zinc-500 truncate">{item.displayed_link}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}