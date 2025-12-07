import Link from "next/link";
import { Gift, Shield, Users, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black z-0 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/10 blur-[120px] pointer-events-none" />

      <main className="relative z-10 container mx-auto px-6 py-20 lg:py-32 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300 mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>The easiest way to organize Secret Santa</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tight text-white max-w-4xl mb-6">
          Make Gift Giving <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-rose-500 to-accent">Magical & Stress-Free</span>
        </h1>

        <p className="text-lg text-slate-400 text-center max-w-2xl mb-10 leading-relaxed">
          Organize the perfect holiday exchange with advanced features like &quot;God Mode&quot; for admins, wishlists, and smart matching logic. No more duplicate gifts or awkward pairings.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/register"
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95 text-lg"
          >
            Start an Exchange
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold backdrop-blur-sm transition-all hover:scale-105 active:scale-95 text-lg"
          >
            Login
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-5xl">
          <div className="glass-card p-8 hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Admin God Mode</h3>
            <p className="text-slate-400">Total visibility for admins to ensure everyone participates and gifts are bought.</p>
          </div>
          <div className="glass-card p-8 hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Smart Matching</h3>
            <p className="text-slate-400">Advanced algorithms ensure circular gifting and prevent conflicts or spouse-matching.</p>
          </div>
          <div className="glass-card p-8 hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Wishlists & Reveals</h3>
            <p className="text-slate-400">Share what you want and enjoy the magical reveal moment when the countdown ends.</p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-8 border-t border-white/5 text-center text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Secret Santa Platform. Built for the holidays.</p>
      </footer>
    </div>
  );
}
