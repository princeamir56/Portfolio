import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard, User, FolderKanban, Award, Briefcase,
  GraduationCap, Sparkles, LogOut, Menu, X, ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile & Hero', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'certifications', label: 'Certifications', icon: Award },
];

interface AdminLayoutProps {
  activePage: string;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
}

export function AdminLayout({ activePage, onNavigate, children }: AdminLayoutProps) {
  const { email, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#060e1a]">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/[0.06] bg-[#0a1628]/95 backdrop-blur-xl transition-transform lg:static lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      )}>
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-bold text-cyan-300">
              AK
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Admin Panel</p>
              <p className="text-xs text-slate-500">{email}</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-slate-400 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition',
                  active
                    ? 'border border-cyan-400/15 bg-cyan-400/10 font-medium text-cyan-300'
                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-white',
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
                {active && <ChevronRight className="ml-auto h-4 w-4" />}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.06] p-4 space-y-2">
          <a
            href="/"
            target="_blank"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            View Portfolio
          </a>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center gap-4 border-b border-white/[0.06] bg-[#0a1628]/80 px-6 py-4 backdrop-blur-xl lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-400 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-white capitalize">
            {navItems.find((n) => n.id === activePage)?.label || 'Dashboard'}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
