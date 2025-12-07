
import { getGroupDetails, joinGroupAction } from '@/actions/groups'
import Link from 'next/link'
import { ArrowLeft, Users, Loader2, Sparkles, UserPlus, Gift, Eye, Mail } from 'lucide-react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { use } from 'react'

// Server Component
export default async function GroupDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) redirect('/login');

    const userId = (session.user as any).id;
    const group = await getGroupDetails(id);

    if (!group) return <div>Group not found</div>

    const isAdmin = group.admin_user_id === userId;
    const isMember = group.members.some((m: any) => m.user_id === userId);

    return (
        <div className="min-h-screen bg-background relative pb-20">
            {/* Simple Header */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                <Link href="/dashboard" className="p-2 bg-slate-900/50 rounded-full text-slate-300 hover:text-white backdrop-blur-md transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
            </div>

            {/* Hero Section */}
            <div className="relative pt-32 pb-16 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none" />

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10">
                    {group.name}
                </h1>
                <div className="flex items-center justify-center gap-4 text-slate-400 text-sm relative z-10">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <Users className="w-4 h-4" /> {group.members.length} Members
                    </span>
                    {group.status === 'drawn' && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                            <Gift className="w-4 h-4" /> Names Drawn
                        </span>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl">
                {/* Action Bar */}
                <div className="mb-10 flex justify-center">
                    {!isMember ? (
                        <form action={joinGroupAction.bind(null, id)}>
                            <button className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/25 transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
                                <UserPlus className="w-5 h-5" /> Join This Group
                            </button>
                        </form>
                    ) : (
                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-colors flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Invite Friends
                            </button>
                            {isAdmin && (
                                <Link href={`/groups/${group.id}/admin`} className="px-6 py-3 bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 text-secondary-foreground font-medium rounded-xl transition-colors flex items-center gap-2">
                                    <Eye className="w-4 h-4" /> Admin Console
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {/* Member List */}
                <div className="glass-card p-6 md:p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Participants</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {group.members.map((member: any) => (
                            <div key={member.id} className="flex items-center p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center font-bold text-white mr-3 shadow-inner">
                                    {member.user?.full_name?.[0] || "?"}
                                </div>
                                <div>
                                    <p className="font-medium text-slate-200">{member.user?.full_name || "Anonymous Elf"}</p>
                                    <p className="text-xs text-slate-500">Joined {new Date(member.joined_at).toLocaleDateString()}</p>
                                </div>
                                {member.user_id === group.admin_user_id && (
                                    <span className="ml-auto text-xs bg-accent/20 text-accent px-2 py-0.5 rounded border border-accent/20">Admin</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
