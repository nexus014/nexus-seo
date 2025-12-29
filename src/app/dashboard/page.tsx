"use client"
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Wand2, Loader2 } from "lucide-react";

export default function AuditPage() {
  const [url, setUrl] = useState('');
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runAudit = async () => {
    setLoading(true);
    const res = await fetch('/api/audit', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setReport(data);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Site Auditor</h1>
        <p className="text-zinc-500">Analyze any URL for technical SEO gaps and AI-generated fixes.</p>
      </div>

      <div className="flex gap-4 p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
        <Input 
          placeholder="https://example.com" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-black border-zinc-800"
        />
        <Button onClick={runAudit} disabled={loading} className="bg-blue-600">
          {loading ? <Loader2 className="animate-spin mr-2" /> : "Run Nexus Audit"}
        </Button>
      </div>

      {report && report.success && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in zoom-in-95 duration-300">
          {/* Current Status */}
          <Card className="p-6 bg-zinc-900/50 border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-500 uppercase mb-4 tracking-widest">Current Metadata</h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-zinc-500">Title Tag</span>
                <p className="text-white font-medium">{report.current.title}</p>
              </div>
              <div>
                <span className="block text-zinc-500">Meta Description</span>
                <p className="text-white font-medium">{report.current.description}</p>
              </div>
            </div>
          </Card>

          {/* AI Optimizer */}
          <Card className="p-6 border-blue-500/30 bg-blue-500/5">
            <div className="flex items-center gap-2 text-blue-400 mb-4">
              <Wand2 size={18} />
              <h3 className="text-sm font-bold uppercase tracking-widest">AI Recommendations</h3>
            </div>
            <p className="text-zinc-300 text-sm whitespace-pre-wrap italic">
              {report.suggestion}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}