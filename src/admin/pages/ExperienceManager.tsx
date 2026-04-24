import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { FormField } from '../components/FormField';
import { SaveButton } from '../components/SaveButton';
import { Plus, Trash2, X } from 'lucide-react';

export function ExperienceManager() {
  const [experience, setExperience] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [stackInputs, setStackInputs] = useState<Record<number, string>>({});
  const [highlightInputs, setHighlightInputs] = useState<Record<number, string>>({});

  useEffect(() => {
    api.get<any>('/profile').then((p) => setExperience(p.experience || [])).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await api.put('/profile', { experience });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { alert('Save failed'); } finally { setSaving(false); }
  };

  const update = (i: number, key: string, value: any) => {
    const e = [...experience];
    e[i] = { ...e[i], [key]: value };
    setExperience(e);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Experience</h2>
          <p className="text-sm text-slate-400">Manage your work experience</p>
        </div>
        <SaveButton saving={saving} saved={saved} onClick={save} />
      </div>

      {experience.map((exp, i) => (
        <div key={i} className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{exp.role || 'New Entry'}</h3>
            <button onClick={() => setExperience(experience.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <FormField label="Role" value={exp.role || ''} onChange={(v) => update(i, 'role', v)} />
            <FormField label="Company" value={exp.company || ''} onChange={(v) => update(i, 'company', v)} />
            <FormField label="Location" value={exp.location || ''} onChange={(v) => update(i, 'location', v)} />
            <FormField label="Period" value={exp.period || ''} onChange={(v) => update(i, 'period', v)} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Tech Stack</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(exp.stack || []).map((s: string, si: number) => (
                <span key={si} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  {s} <button onClick={() => update(i, 'stack', exp.stack.filter((_: string, j: number) => j !== si))} className="text-red-400"><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
            <input value={stackInputs[i] || ''} onChange={(e) => setStackInputs({ ...stackInputs, [i]: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (stackInputs[i] || '').trim()) {
                  update(i, 'stack', [...(exp.stack || []), stackInputs[i].trim()]);
                  setStackInputs({ ...stackInputs, [i]: '' }); e.preventDefault();
                }
              }} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Add tech (Enter)" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Highlights</label>
            {(exp.highlights || []).map((h: string, hi: number) => (
              <div key={hi} className="mb-2 flex items-center gap-2">
                <input value={h} onChange={(e) => {
                  const hl = [...exp.highlights]; hl[hi] = e.target.value; update(i, 'highlights', hl);
                }} className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/40" />
                <button onClick={() => update(i, 'highlights', exp.highlights.filter((_: string, j: number) => j !== hi))} className="text-red-400"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            <input value={highlightInputs[i] || ''} onChange={(e) => setHighlightInputs({ ...highlightInputs, [i]: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (highlightInputs[i] || '').trim()) {
                  update(i, 'highlights', [...(exp.highlights || []), highlightInputs[i].trim()]);
                  setHighlightInputs({ ...highlightInputs, [i]: '' }); e.preventDefault();
                }
              }} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Add highlight (Enter)" />
          </div>
        </div>
      ))}

      <button onClick={() => setExperience([...experience, { role: '', company: '', location: '', period: '', stack: [], highlights: [] }])} className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
        <Plus className="h-4 w-4" /> Add Experience
      </button>

      <div className="flex justify-end">
        <SaveButton saving={saving} saved={saved} onClick={save} />
      </div>
    </div>
  );
}
