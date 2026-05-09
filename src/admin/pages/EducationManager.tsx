import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { FormField } from '../components/FormField';
import { SaveButton } from '../components/SaveButton';
import { Plus, Trash2 } from 'lucide-react';

export function EducationManager() {
  const [education, setEducation] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get<any>('/profile').then((p) => setEducation(p.education || [])).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await api.put('/profile', { education });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { alert('Save failed'); } finally { setSaving(false); }
  };

  const update = (i: number, key: string, value: string) => {
    const e = [...education];
    e[i] = { ...e[i], [key]: value };
    setEducation(e);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Education</h2>
          <p className="text-sm text-slate-400">Manage your education history</p>
        </div>
        <SaveButton saving={saving} saved={saved} onClick={save} />
      </div>

      {education.map((edu, i) => (
        <div key={i} className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{edu.degree || 'New Entry'}</h3>
            <button onClick={() => setEducation(education.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <FormField label="Degree" value={edu.degree || ''} onChange={(v) => update(i, 'degree', v)} />
            <FormField label="School" value={edu.school || ''} onChange={(v) => update(i, 'school', v)} />
            <FormField label="Period" value={edu.period || ''} onChange={(v) => update(i, 'period', v)} />
          </div>
          <FormField label="Description" value={edu.description || ''} onChange={(v) => update(i, 'description', v)} type="textarea" />
        </div>
      ))}

      <button onClick={() => setEducation([...education, { degree: '', school: '', period: '', description: '' }])} className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
        <Plus className="h-4 w-4" /> Add Education
      </button>

      <div className="flex justify-end">
        <SaveButton saving={saving} saved={saved} onClick={save} />
      </div>
    </div>
  );
}
