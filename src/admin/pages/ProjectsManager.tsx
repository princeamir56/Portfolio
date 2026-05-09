import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { FormField } from '../components/FormField';
import { ImageUpload } from '../components/ImageUpload';
import { SaveButton } from '../components/SaveButton';
import { Plus, Trash2, Pencil, X, Star, StarOff } from 'lucide-react';

const emptyProject = {
  slug: '', title: '', summary: '', description: '', technologies: [] as string[],
  github: '', demo: '', images: [] as { src: string; alt: string }[], video: '',
  featured: false, date: '', categories: [] as string[], achievements: [] as string[],
};

export function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [achieveInput, setAchieveInput] = useState('');

  const load = () => api.get<any[]>('/projects').then(setProjects).catch(() => {});
  useEffect(() => { load(); }, []);

  const save = async () => {
    setSaving(true);
    try {
      if (editing._id) {
        await api.put(`/projects/${editing._id}`, editing);
      } else {
        await api.post('/projects', editing);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      setEditing(null);
      load();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{editing._id ? 'Edit Project' : 'New Project'}</h2>
          <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <FormField label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
            <FormField label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} placeholder="url-friendly-name" />
            <FormField label="Date (YYYY-MM)" value={editing.date} onChange={(v) => setEditing({ ...editing, date: v })} placeholder="2026-03" />
            <FormField label="GitHub URL" value={editing.github} onChange={(v) => setEditing({ ...editing, github: v })} type="url" />
            <FormField label="Demo URL" value={editing.demo || ''} onChange={(v) => setEditing({ ...editing, demo: v })} type="url" />
            <FormField label="Video URL" value={editing.video || ''} onChange={(v) => setEditing({ ...editing, video: v })} type="url" />
          </div>
          <FormField label="Summary" value={editing.summary} onChange={(v) => setEditing({ ...editing, summary: v })} type="textarea" rows={2} />
          <FormField label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} type="textarea" rows={4} />

          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-300">Featured</label>
            <button onClick={() => setEditing({ ...editing, featured: !editing.featured })}
              className={`rounded-lg px-3 py-1.5 text-sm ${editing.featured ? 'bg-amber-400/20 text-amber-300' : 'bg-white/5 text-slate-400'}`}>
              {editing.featured ? <Star className="inline h-4 w-4" /> : <StarOff className="inline h-4 w-4" />}
              {editing.featured ? ' Featured' : ' Not featured'}
            </button>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="text-sm font-medium text-slate-300">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {editing.technologies.map((t: string, i: number) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                {t}
                <button onClick={() => setEditing({ ...editing, technologies: editing.technologies.filter((_: string, j: number) => j !== i) })} className="text-red-400"><X className="h-3 w-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => {
              if (e.key === 'Enter' && techInput.trim()) { setEditing({ ...editing, technologies: [...editing.technologies, techInput.trim()] }); setTechInput(''); e.preventDefault(); }
            }} className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Add tech (Enter)" />
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="text-sm font-medium text-slate-300">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {['AI', 'ML', 'Data', 'Web'].map((cat) => (
              <button key={cat} onClick={() => {
                const cats = editing.categories.includes(cat)
                  ? editing.categories.filter((c: string) => c !== cat)
                  : [...editing.categories, cat];
                setEditing({ ...editing, categories: cats });
              }} className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${editing.categories.includes(cat) ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30' : 'bg-white/5 text-slate-400 border border-white/10'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="text-sm font-medium text-slate-300">Images</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {editing.images.map((img: any, i: number) => (
              <div key={i} className="space-y-2">
                <ImageUpload value={img.src} onChange={(url) => {
                  const imgs = [...editing.images];
                  imgs[i] = { ...img, src: url };
                  setEditing({ ...editing, images: imgs });
                }} label={`Image ${i + 1}`} />
                <input value={img.alt} onChange={(e) => {
                  const imgs = [...editing.images];
                  imgs[i] = { ...img, alt: e.target.value };
                  setEditing({ ...editing, images: imgs });
                }} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Alt text" />
                <button onClick={() => setEditing({ ...editing, images: editing.images.filter((_: any, j: number) => j !== i) })} className="text-xs text-red-400">Remove</button>
              </div>
            ))}
          </div>
          <button onClick={() => setEditing({ ...editing, images: [...editing.images, { src: '', alt: '' }] })} className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
            <Plus className="h-4 w-4" /> Add Image
          </button>
        </div>

        <div className="space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="text-sm font-medium text-slate-300">Achievements</h3>
          {editing.achievements.map((a: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <input value={a} onChange={(e) => {
                const achs = [...editing.achievements];
                achs[i] = e.target.value;
                setEditing({ ...editing, achievements: achs });
              }} className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/40" />
              <button onClick={() => setEditing({ ...editing, achievements: editing.achievements.filter((_: string, j: number) => j !== i) })} className="text-red-400"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <div className="flex gap-2">
            <input value={achieveInput} onChange={(e) => setAchieveInput(e.target.value)} onKeyDown={(e) => {
              if (e.key === 'Enter' && achieveInput.trim()) { setEditing({ ...editing, achievements: [...editing.achievements, achieveInput.trim()] }); setAchieveInput(''); e.preventDefault(); }
            }} className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Add achievement (Enter)" />
          </div>
        </div>

        <div className="flex justify-end">
          <SaveButton saving={saving} saved={saved} onClick={save} label={editing._id ? 'Update Project' : 'Create Project'} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Projects</h2>
          <p className="text-sm text-slate-400">{projects.length} projects</p>
        </div>
        <button onClick={() => setEditing({ ...emptyProject })} className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((p: any) => (
          <div key={p._id} className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center gap-4">
              {p.images?.[0]?.src && <img src={p.images[0].src} alt="" className="h-14 w-20 rounded-lg border border-white/10 object-cover" />}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">{p.title}</h3>
                  {p.featured && <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-medium text-amber-300">Featured</span>}
                </div>
                <p className="mt-1 text-sm text-slate-400">{p.categories?.join(' • ')} — {p.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { setEditing({ ...p }); setTechInput(''); setAchieveInput(''); }} className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => remove(p._id)} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
