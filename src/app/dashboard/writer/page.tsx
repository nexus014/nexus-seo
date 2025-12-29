"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Wand2, Loader2, FileText, BarChart3 } from "lucide-react";
import ReactMarkdown from 'react-markdown';

export default function AIWriterPage() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateDraft = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ keyword, intent: 'Informational' }),
    });
    const data = await res.json();
    setResult(data.content);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="text-blue-500" /> AI Content Engine
        </h1>
        <p className="text-zinc-500">Generate SEO-optimized drafts and rank predictions.</p>
      </div>

      <div className="flex gap-4 p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
        <Input 
          placeholder="Enter target keyword (e.g. Best SaaS Marketing Strategies)" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-black border-zinc-800 h-12"
        />
        <Button onClick={generateDraft} disabled={loading || !keyword} className="bg-blue-600 h-12 px-6">
          {loading ? <Loader2 className="animate-spin" /> : <><Wand2 className="mr-2" size={18}/> Draft Article</>}
        </Button>
      </div>

      {result && (
        <Card className="p-8 bg-zinc-900/50 border-zinc-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        </Card>
      )}
    </div>
  );
}