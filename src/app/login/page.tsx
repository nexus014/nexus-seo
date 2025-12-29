'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { createBrowserClient } from '@supabase/ssr'

// The "export default" is the most important part!
export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Initialize Supabase Client for the browser
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      setLoading(false)
    } else {
      // Success! Move to the dashboard
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <Card className="w-full max-w-md p-8 bg-zinc-900 border-zinc-800">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Nexus SEO Login</h1>
            <p className="text-zinc-500 text-sm mt-2">Enter your credentials to access the war room.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black border-zinc-700 text-white"
              required
            />
            <Input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black border-zinc-700 text-white"
              required
            />
            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-500 text-white h-11"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}