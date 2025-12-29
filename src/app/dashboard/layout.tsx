import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar" // We will create this next

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return redirect('/login')

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#050505]">
        <AppSidebar user={user} />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <SidebarTrigger className="text-zinc-400 hover:text-white" />
            <div className="text-xs font-mono text-zinc-500 bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-800">
              NEXUS_CORE_V1.0: <span className="text-emerald-500">ACTIVE</span>
            </div>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}