"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Gift, Calendar, DollarSign, ArrowLeft, Check, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { createGroupAction } from '@/actions/groups'

export default function CreateGroupPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const result = await createGroupAction(formData)

        if (result.error) {
            alert("Error creating group: " + result.error)
        } else {
            router.push(`/dashboard`)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Ambience similar to other auth pages for consistency */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black z-0 pointer-events-none" />

            <div className="relative z-10 container mx-auto px-6 pt-12 pb-24">
                <Link href="/dashboard" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Link>

                <div className="max-w-2xl mx-auto">
                    <div className="mb-10 text-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2">Create New Exchange</h1>
                        <p className="text-slate-400">Set the rules for your Secret Santa party.</p>
                    </div>

                    <div className="glass-card p-8 md:p-10 border border-white/5 shadow-2xl shadow-primary/5">
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Group Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Group Name</label>
                                <div className="relative group">
                                    <Gift className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        className="w-full bg-slate-950/50 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none transition-all"
                                        placeholder="e.g. Office Party 2025"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Budget */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Budget Limit (Optional)</label>
                                    <div className="relative group">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-green-500 transition-colors" />
                                        <input
                                            name="budget"
                                            type="text"
                                            className="w-full bg-slate-950/50 border border-slate-800 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none transition-all"
                                            placeholder="$50"
                                        />
                                    </div>
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Exchange Date (Optional)</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                        <input
                                            name="date"
                                            type="date"
                                            className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none transition-all [color-scheme:dark]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 hover:to-rose-600/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Check className="w-5 h-5" /> Create Group
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
