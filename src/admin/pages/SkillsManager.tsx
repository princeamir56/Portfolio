import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { SaveButton } from '../components/SaveButton';
import { Plus, Trash2, X } from 'lucide-react';

const iconOptions = ['BrainCircuit', 'Database', 'Code2', 'Blocks', 'BarChart3', 'Globe', 'Cpu', 'Layers'];

export function SkillsManager() {
  const [skills, setSkills] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [itemInputs, setItemInputs] = useState<Record<number, string>>({});

  useEffect(() => {
    api.get<any>('/profile').then((p) => setSkills(p.skills || [])).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await api.put('/profile', { skills });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { alert('Save failed'); } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Skills</h2>
          <p className="text-sm text-slate-400">Manage your skill categories and items</p>
        </div>
        <SaveButton saving={saving} saved={saved} onClick={save} />
      </div>

      {skills.map((group, gi) => (
        <div key={gi} className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="flex items-center justify-between">
            <div className="grid flex-1 gap-3 sm:grid-cols-[1fr_180px]">
              <input value={group.title} onChange={(e) => {
                const s = [...skills]; s[gi] = { ...group, title: e.target.value }; setSkills(s);
              }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Category title" />
              <select value={group.icon} onChange={(e) => {
                const s = [...skills]; s[gi] = { ...group, icon: e.target.value }; setSkills(s);
              }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40">
                {iconOptions.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </div>
            <button onClick={() => setSkills(skills.filter((_, i) => i !== gi))} className="ml-3 text-red-400 hover:text-red-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {group.items.map((item: string, ii: number) => (
              <span key={ii} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                {item}
                <button onClick={() => {
                  const s = [...skills]; s[gi] = { ...group, items: group.items.filter((_: string, j: number) => j !== ii) }; setSkills(s);
                }} className="text-red-400"><X className="h-3 w-3" /></button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input value={itemInputs[gi] || ''} onChange={(e) => setItemInputs({ ...itemInputs, [gi]: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (itemInputs[gi] || '').trim()) {
                  const s = [...skills]; s[gi] = { ...group, items: [...group.items, itemInputs[gi].trim()] }; setSkills(s);
                  setItemInputs({ ...itemInputs, [gi]: '' }); e.preventDefault();
                }
              }}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Add skill (Enter)" />
          </div>
        </div>
      ))}

      <button onClick={() => setSkills([...skills, { title: '', icon: 'Code2', items: [] }])} className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
        <Plus className="h-4 w-4" /> Add Skill Category
      </button>

      <div className="flex justify-end">
        <SaveButton saving={saving} saved={saved} onClick={save} />
      </div>
    </div>
  );
}
