"use client"

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Play, RefreshCw, Loader2, ShieldAlert } from 'lucide-react'
import { getAdminGroupData, drawNamesAction } from '@/actions/admin'

type GroupWithMembers = {
    id: string
    name: string
    status: 'planning' | 'drawn' | 'completed'
    admin_user_id: string
    group_members: {
        id: string
        user_id: string
        profiles: { full_name: string, avatar_url: string }
    }[]
}

type MatchDetail = {
    id: string
    santa: { full_name: string }
    recipient: { full_name: string }
    is_revealed: boolean
}

export default function AdminPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [group, setGroup] = useState<GroupWithMembers | null>(null)
    const [matches, setMatches] = useState<MatchDetail[]>([])
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        const fetchAdminData = async () => {
            const result = await getAdminGroupData(id);
            if (result.error) {
                alert(result.error);
                // Redirect if access denied or not found
                if (result.error.includes("Access denied")) {
                    router.push(`/groups/${id}`);
                } else if (result.error.includes("Not authenticated")) {
                    router.push('/login');
                } else {
                    router.push('/dashboard');
                }
                return;
            }

            if (result.success && result.group) {
                setGroup(result.group as any); // Cast to match local type if needed
                if (result.matches) {
                    setMatches(result.matches);
                }
            }
            setLoading(false);
        }

        fetchAdminData()
    }, [id, router])

    const handleDrawNames = async () => {
        if (!group || group.group_members.length < 2) {
            alert("Need at least 2 members to draw!")
            return
        }

        if (!confirm("Are you sure? This will generate new pairs and email everyone.")) return

        setProcessing(true)

        try {
            const result = await drawNamesAction(group.id);
            if (result.error) {
                throw new Error(result.error);
            }

            alert("Names drawn successfully! (Emails logic would trigger here)");
            window.location.reload();

        } catch (e: any) {
            alert("Error during draw: " + e.message)
        } finally {
            setProcessing(false)
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
    )

    if (!group) return null

    return (
        <div className="min-h-screen bg-background text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href={`/groups/${id}`} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Admin Console</h1>
                            <p className="text-slate-400">Manage "{group.name}"</p>
                        </div>
                    </div>
                </div>

                {/* Status Card */}
                <div className="glass-card p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            Status: <span className={group.status === 'drawn' ? "text-green-400" : "text-blue-400"}>
                                {group.status === 'drawn' ? "Names Drawn" : "In Planning"}
                            </span>
                        </h3>
                        <p className="text-slate-400 text-sm">
                            {group.status === 'drawn'
                                ? "Participants can now see their matches."
                                : "Waiting for you to start the exchange."}
                        </p>
                    </div>

                    <button
                        onClick={handleDrawNames}
                        disabled={processing}
                        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95 ${group.status === 'drawn'
                            ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
                            : "bg-primary hover:bg-primary/90 text-white shadow-primary/25"
                            }`}
                    >
                        {processing ? <Loader2 className="animate-spin w-5 h-5" /> : (group.status === 'drawn' ? <RefreshCw className="w-5 h-5" /> : <Play className="w-5 h-5" />)}
                        {group.status === 'drawn' ? "Re-Draw Names" : "Start Exchange"}
                    </button>
                </div>

                {/* God Mode Table */}
                {group.status === 'drawn' && matches.length > 0 && (
                    <div className="glass-card overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-accent" />
                            <h3 className="text-lg font-bold">God Mode Overview</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-slate-400 text-sm uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Santa</th>
                                        <th className="px-6 py-4 font-medium">Direction</th>
                                        <th className="px-6 py-4 font-medium">Recipient</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {matches.map((match) => (
                                        <tr key={match.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-medium">{match.santa?.full_name || "Unknown"}</td>
                                            <td className="px-6 py-4 text-slate-500">→</td>
                                            <td className="px-6 py-4 font-medium text-accent">{match.recipient?.full_name || "Unknown"}</td>
                                            <td className="px-6 py-4">
                                                {match.is_revealed ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                                                        Seen
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500">
                                                        Unseen
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-xs hover:underline text-slate-400 hover:text-white">
                                                    Remind
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
