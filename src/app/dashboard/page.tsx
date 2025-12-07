
import { getDashboardGroups } from '@/actions/groups'
import Link from 'next/link'
import { Plus, Gift, Calendar, DollarSign, LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'

// Server Component
export default async function DashboardPage() {
    const groups = await getDashboardGroups();

    return (
        <div className="min-h-screen bg-background relative">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-rose-600 rounded-lg flex items-center justify-center">
                            <Gift className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg text-white">Secret Santa</span>
                    </Link>
                    {/* 
                Since this is a Server Component, we can't easily add a client-side click handler for SignOut 
                without hydrating a client component. For now, we can link to a lightweight client component 
                or just redirect to api/auth/signout or manage it differently.
                Let's omit logic for now or make a small client component for the UserMenu.
            */}
                    <Link href="/api/auth/signout" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white">Your Events</h1>
                    <Link
                        href="/groups/create"
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Create Group
                    </Link>
                </div>

                {groups.length === 0 ? (
                    <div className="text-center py-20 px-6 glass-card border-dashed border-2 border-slate-800">
                        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Gift className="w-8 h-8 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No Secret Santas yet</h3>
                        <p className="text-slate-400 mb-6 max-w-sm mx-auto">
                            You haven't joined or created any gift exchanges yet. Start the holiday cheer now!
                        </p>
                        <Link
                            href="/groups/create"
                            className="inline-flex px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors"
                        >
                            Create Your First Group
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groups.map((group) => (
                            <Link href={`/groups/${group.id}`} key={group.id} className="group relative">
                                <div className="glass-card p-6 h-full hover:border-primary/50 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                                            <Gift className="w-6 h-6" />
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${group.status === 'planning' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                                            {group.status === 'planning' ? 'Planning' : 'Drawn'}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 truncate">{group.name}</h3>

                                    <div className="space-y-2 mt-4">
                                        {group.exchange_date && (
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <Calendar className="w-4 h-4 text-slate-500" />
                                                <span>{new Date(group.exchange_date).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                        {group.budget_limit && (
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <DollarSign className="w-4 h-4 text-slate-500" />
                                                <span>Budget: {group.budget_limit}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
