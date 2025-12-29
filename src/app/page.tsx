import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  FileText, 
  BarChart3, 
  Swords, 
  ArrowUpRight, 
  ShieldCheck 
} from "lucide-react";

const stats = [
  { name: "Total Audits", value: "12", icon: ShieldCheck, color: "text-blue-500" },
  { name: "Keywords Tracked", value: "48", icon: Search, color: "text-emerald-500" },
  { name: "Content Drafts", value: "7", icon: FileText, color: "text-amber-500" },
  { name: "Avg. Nexus Score", value: "82%", icon: BarChart3, color: "text-purple-500" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white">Command Center</h1>
        <p className="text-zinc-500">Welcome back. Here is what's happening with your SEO projects.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-zinc-400">{stat.name}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions / Activity Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-black/40 border border-zinc-800/50">
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-200">Audit completed for example.com</p>
                    <p className="text-xs text-zinc-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Competitor Watch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Competitor A</span>
                <span className="text-emerald-500 font-mono">+4.2%</span>
             </div>
             <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Competitor B</span>
                <span className="text-red-500 font-mono">-1.8%</span>
             </div>
             <div className="h-2 w-full bg-zinc-800 rounded-full mt-4">
                <div className="h-2 bg-blue-600 rounded-full w-[65%]"></div>
             </div>
             <p className="text-[10px] text-zinc-500 text-center uppercase tracking-widest mt-2">Market Share Analysis</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}