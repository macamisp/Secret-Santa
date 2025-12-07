"use client"

import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react' // client side manual sign in
import { useRouter } from 'next/navigation'
import { Gift, Mail, ArrowRight, Sparkles } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        // NextAuth Client SignIn
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password
        })

        if (res?.error) {
            setMessage("Invalid email or password.")
        } else {
            setMessage("Success! Logging you in...")
            setTimeout(() => router.push('/dashboard'), 500)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side */}
            <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black relative overflow-hidden p-12 text-center text-white">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543258103-a62bdc069624?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="relative z-10 max-w-lg">
                    <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/10">
                        <Gift className="w-10 h-10 text-primary animate-pulse" />
                    </div>
                    <h1 className="text-4xl font-bold mb-6 leading-tight">Welcome Back to the Holidays</h1>
                    <p className="text-lg text-slate-300">Your gift exchange awaits. Log in to see who you're surprising this year!</p>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center justify-center p-8 bg-slate-950 text-white relative">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Welcome Back</h2>
                        <p className="text-slate-400 mt-2">Please enter your details</p>
                    </div>

                    <div className="glass-card p-8 border border-white/5 shadow-2xl shadow-primary/5">
                        {message && (
                            <div className={`p-3 rounded-lg text-sm mb-4 ${message.includes("Success") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                {message}
                            </div>
                        )}
                        <form onSubmit={handleLogin} className="space-y-5">

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full bg-slate-900/50 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                    </div>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        className="w-full bg-slate-900/50 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 hover:to-rose-600/90 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign In <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-white/5 text-center">
                            <p className="text-slate-400 text-sm">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-slate-600 text-xs flex items-center justify-center gap-2">
                            <Sparkles className="w-3 h-3 text-accent" /> Powered by North Pole Magic
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
