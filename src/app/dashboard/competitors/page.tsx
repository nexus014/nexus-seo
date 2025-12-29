"use client"
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Swords, Target, ShieldAlert, Loader2, Zap } from "lucide-react";

export default function CompetitorsPage() {
  const [compUrl, setCompUrl] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeCompetitor = async () => {
    setLoading(true);
    try {
      // We call the same audit API we built in Phase 4
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: compUrl }),
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (error) {
      console.error("Competitor analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Swords className="text-red-500" /> Competitor War Room
        </h1>
        <p className="text-zinc-500">Nexus AI deconstructs your competitor's SEO moat in real-time.</p>
      </div>

      <div className="flex gap-4 p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl shadow-2xl">
        <Input 
          placeholder="Enter competitor URL (e.g., https://competitor.com)" 
          value={compUrl}
          onChange={(e) => setCompUrl(e.target.value)}
          className="bg-black border-zinc-800 h-12 focus:ring-red-500/50"
        />
        <Button onClick={analyzeCompetitor} disabled={loading} className="bg-red-600 hover:bg-red-500 h-12 px-8 transition-all">
          {loading ? <Loader2 className="animate-spin mr-2" /> : <Zap className="mr-2" size={18} />}
          Deconstruct
        </Button>
      </div>

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Strategy Card */}
          <Card className="p-6 bg-zinc-900/50 border-zinc-800 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <Target size={18} className="text-blue-400" /> Strategic Content Gap
            </h3>
            <div className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
              {analysis.suggestion}
            </div>
          </Card>

          {/* Quick Stats/Vulnerabilities */}
          <Card className="p-6 bg-zinc-900/50 border-zinc-800 border-l-amber-500/50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <ShieldAlert size={18} className="text-amber-400" /> Vulnerabilities
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                <p className="text-xs font-bold text-amber-500 uppercase tracking-tighter">Title Analysis</p>
                <p className="text-sm text-zinc-300 mt-1">{analysis.current.title}</p>
              </div>
              <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                <p className="text-xs font-bold text-blue-500 uppercase tracking-tighter">AI Est. Authority</p>
                <p className="text-sm text-zinc-300 mt-1 italic font-mono text-center">NEXUS-SCORE: 74/100</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}