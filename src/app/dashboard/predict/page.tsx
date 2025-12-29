"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { BarChart3, Loader2, Target } from "lucide-react";

export default function PredictPage() {
  const [keyword, setKeyword] = useState('');
  const [content, setContent] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const getPrediction = async () => {
    setLoading(true);
    const res = await fetch('/api/predict', {
      method: 'POST',
      body: JSON.stringify({ keyword, content }),
    });
    const data = await res.json();
    setPrediction(data.prediction);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <BarChart3 className="text-emerald-500" /> Rank Predictor
      </h1>
      
      <div className="grid gap-4">
        <Input 
          placeholder="Target Keyword" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-zinc-900 border-zinc-800"
        />
        <Textarea 
          placeholder="Paste your draft content here..." 
          className="min-h-[300px] bg-zinc-900 border-zinc-800"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={getPrediction} disabled={loading} className="bg-emerald-600 hover:bg-emerald-500">
          {loading ? <Loader2 className="animate-spin" /> : "Forecast Ranking"}
        </Button>
      </div>

      {prediction && (
        <Card className="p-6 bg-zinc-900/50 border-emerald-500/30 border">
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <Target size={20} />
            <h3 className="font-bold uppercase tracking-widest">Nexus Forecast</h3>
          </div>
          <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed italic">
            {prediction}
          </div>
        </Card>
      )}
    </div>
  );
}