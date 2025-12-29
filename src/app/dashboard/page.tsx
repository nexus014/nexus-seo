import { createServerClient } from '@supabase/auth-helpers-nextjs'; // Changed name here
import { cookies } from 'next/headers';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, FileText, BarChart3, ShieldCheck } from "lucide-react";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  
  // Using the new name 'createServerClient' as the error suggested
  const supabase = createServerClient({ 
    cookies: () => cookieStore 
  });

  // Fetch real counts
  const [audits, keywords, predictions] = await Promise.all([
    supabase.from('audits').select('*', { count: 'exact', head: true }),
    supabase.from('keywords').select('*', { count: 'exact', head: true }),
    supabase.from('predictions').select('*', { count: 'exact', head: true }),
  ]);

  const stats = [
    { name: "Total Audits", value: audits.count || 0, icon: ShieldCheck, color: "text-blue-500" },
    { name: "Keywords Saved", value: keywords.count || 0, icon: Search, color: "text-emerald-500" },
    { name: "Rank Predictions", value: predictions.count || 0, icon: BarChart3, color: "text-purple-500" },
    { name: "AI Drafts", value: "Active", icon: FileText, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Command Center</h1>
        <p className="text-zinc-500 text-sm mt-1">Real-time status of your SEO engine.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">{stat.name}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}