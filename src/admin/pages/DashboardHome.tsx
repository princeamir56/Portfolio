import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { FolderKanban, Award, Briefcase, GraduationCap, Activity } from 'lucide-react';

export function DashboardHome() {
  const [stats, setStats] = useState({ projects: 0, certs: 0, experience: 0, education: 0 });

  useEffect(() => {
    Promise.all([
      api.get<any[]>('/projects'),
      api.get<any>('/profile'),
    ]).then(([projects, profile]) => {
      setStats({
        projects: projects.length,
        certs: profile.certifications?.length || 0,
        experience: profile.experience?.length || 0,
        education: profile.education?.length || 0,
      });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Projects', value: stats.projects, icon: FolderKanban, color: 'cyan' },
    { label: 'Certifications', value: stats.certs, icon: Award, color: 'amber' },
    { label: 'Experience', value: stats.experience, icon: Briefcase, color: 'emerald' },
    { label: 'Education', value: stats.education, icon: GraduationCap, color: 'violet' },
  ];

  const colorMap: Record<string, string> = {
    cyan: 'border-cyan-400/15 bg-cyan-400/10 text-cyan-300',
    amber: 'border-amber-400/15 bg-amber-400/10 text-amber-300',
    emerald: 'border-emerald-400/15 bg-emerald-400/10 text-emerald-300',
    violet: 'border-violet-400/15 bg-violet-400/10 text-violet-300',
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
        <p className="mt-1 text-sm text-slate-400">Here's an overview of your portfolio content.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${colorMap[card.color]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <Activity className="h-4 w-4 text-slate-600" />
              </div>
              <p className="mt-4 text-3xl font-semibold text-white">{card.value}</p>
              <p className="mt-1 text-sm text-slate-400">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
        <p className="mt-1 text-sm text-slate-400">Use the sidebar to manage each section of your portfolio.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {['Edit your hero section and bio', 'Add or update projects', 'Manage certifications and credentials'].map((tip) => (
            <div key={tip} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-300">
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
