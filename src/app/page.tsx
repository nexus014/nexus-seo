// 1. Change the import to the modern SSR package
import { createServerClient } from '@supabase/ssr' 
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function LandingPage() {
  const cookieStore = await cookies()
  
  // 2. Provide the 3 arguments it's asking for: URL, KEY, and OPTIONS
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component can't always set cookies, which is fine for a read-only check
          }
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      {/* ... keep your Landing Page JSX here ... */}
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent mb-6 uppercase tracking-tighter">
        Nexus SEO
      </h1>
      <Link href="/login" className="px-8 py-3 bg-white text-black font-bold rounded-full">
        Launch App
      </Link>
    </div>
  )
}