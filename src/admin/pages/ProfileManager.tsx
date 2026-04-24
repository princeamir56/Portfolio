import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { FormField } from '../components/FormField';
import { SaveButton } from '../components/SaveButton';
import { Plus, Trash2 } from 'lucide-react';

export function ProfileManager() {
  const [profile, setProfile] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/profile').then(setProfile).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await api.put('/profile', profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return <p className="text-slate-400">Loading...</p>;

  const updateHero = (key: string, value: any) => setProfile({ ...profile, hero: { ...profile.hero, [key]: value } });
  const updateAbout = (key: string, value: any) => setProfile({ ...profile, about: { ...profile.about, [key]: value } });
  const updateContact = (key: string, value: any) => setProfile({ ...profile, contact: { ...profile.contact, [key]: value } });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Profile & Hero</h2>
          <p className="text-sm text-slate-400">Manage your personal information and hero section</p>
        </div>
        <SaveButton saving={saving} saved={saved} onClick={save} />
      </div>

      <section className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h3 className="text-lg font-semibold text-white">Hero Section</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <FormField label="Name" value={profile.hero?.name || ''} onChange={(v) => updateHero('name', v)} />
          <FormField label="Title" value={profile.hero?.title || ''} onChange={(v) => updateHero('title', v)} />
          <FormField label="Location" value={profile.hero?.location || ''} onChange={(v) => updateHero('location', v)} />
          <FormField label="CV URL" value={profile.cvUrl || ''} onChange={(v) => setProfile({ ...profile, cvUrl: v })} type="url" />
        </div>
        <FormField label="Description" value={profile.hero?.description || ''} onChange={(v) => updateHero('description', v)} type="textarea" rows={4} />
      </section>

      <section className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h3 className="text-lg font-semibold text-white">Metrics</h3>
        {(profile.hero?.metrics || []).map((m: any, i: number) => (
          <div key={i} className="flex items-start gap-3">
            <div className="grid flex-1 gap-3 sm:grid-cols-[120px_1fr]">
              <input value={m.value} onChange={(e) => {
                const metrics = [...profile.hero.metrics];
                metrics[i] = { ...m, value: e.target.value };
                updateHero('metrics', metrics);
              }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Value" />
              <input value={m.label} onChange={(e) => {
                const metrics = [...profile.hero.metrics];
                metrics[i] = { ...m, label: e.target.value };
                updateHero('metrics', metrics);
              }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Label" />
            </div>
            <button onClick={() => updateHero('metrics', profile.hero.metrics.filter((_: any, j: number) => j !== i))} className="mt-3 text-red-400 hover:text-red-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button onClick={() => updateHero('metrics', [...(profile.hero?.metrics || []), { value: '', label: '' }])} className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
          <Plus className="h-4 w-4" /> Add Metric
        </button>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h3 className="text-lg font-semibold text-white">Focus Areas</h3>
        {(profile.hero?.focusAreas || []).map((f: any, i: number) => (
          <div key={i} className="flex items-start gap-3">
            <div className="grid flex-1 gap-3">
              <input value={f.title} onChange={(e) => {
                const areas = [...profile.hero.focusAreas];
                areas[i] = { ...f, title: e.target.value };
                updateHero('focusAreas', areas);
              }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Title" />
              <textarea value={f.description} onChange={(e) => {
                const areas = [...profile.hero.focusAreas];
                areas[i] = { ...f, description: e.target.value };
                updateHero('focusAreas', areas);
              }} rows={2} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Description" />
            </div>
            <button onClick={() => updateHero('focusAreas', profile.hero.focusAreas.filter((_: any, j: number) => j !== i))} className="mt-3 text-red-400 hover:text-red-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button onClick={() => updateHero('focusAreas', [...(profile.hero?.focusAreas || []), { title: '', description: '' }])} className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
          <Plus className="h-4 w-4" /> Add Focus Area
        </button>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h3 className="text-lg font-semibold text-white">About</h3>
        <FormField label="Summary" value={profile.about?.summary || ''} onChange={(v) => updateAbout('summary', v)} type="textarea" />
        <FormField label="Story" value={profile.about?.story || ''} onChange={(v) => updateAbout('story', v)} type="textarea" rows={5} />

        <h4 className="text-sm font-medium text-slate-300">Highlights</h4>
        {(profile.about?.highlights || []).map((h: any, i: number) => (
          <div key={i} className="flex items-start gap-3">
            <div className="grid flex-1 gap-3">
              <input value={h.title} onChange={(e) => {
                const hl = [...profile.about.highlights];
                hl[i] = { ...h, title: e.target.value };
                updateAbout('highlights', hl);
              }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Title" />
              <textarea value={h.description} onChange={(e) => {
                const hl = [...profile.about.highlights];
                hl[i] = { ...h, description: e.target.value };
                updateAbout('highlights', hl);
              }} rows={2} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Description" />
            </div>
            <button onClick={() => updateAbout('highlights', profile.about.highlights.filter((_: any, j: number) => j !== i))} className="mt-3 text-red-400 hover:text-red-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button onClick={() => updateAbout('highlights', [...(profile.about?.highlights || []), { title: '', description: '' }])} className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
          <Plus className="h-4 w-4" /> Add Highlight
        </button>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h3 className="text-lg font-semibold text-white">Socials</h3>
        {(profile.hero?.socials || []).map((s: any, i: number) => (
          <div key={i} className="flex items-start gap-3">
            <div className="grid flex-1 gap-3 sm:grid-cols-[150px_1fr]">
              <input value={s.label} onChange={(e) => {
                const socials = [...profile.hero.socials];
                socials[i] = { ...s, label: e.target.value };
                updateHero('socials', socials);
              }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Label" />
              <input value={s.href} onChange={(e) => {
                const socials = [...profile.hero.socials];
                socials[i] = { ...s, href: e.target.value };
                updateHero('socials', socials);
              }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="URL" />
            </div>
            <button onClick={() => updateHero('socials', profile.hero.socials.filter((_: any, j: number) => j !== i))} className="mt-3 text-red-400 hover:text-red-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button onClick={() => updateHero('socials', [...(profile.hero?.socials || []), { label: '', href: '', external: true }])} className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
          <Plus className="h-4 w-4" /> Add Social
        </button>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h3 className="text-lg font-semibold text-white">Contact</h3>
        <FormField label="Email" value={profile.contact?.email || ''} onChange={(v) => updateContact('email', v)} type="email" />
        <FormField label="Summary" value={profile.contact?.summary || ''} onChange={(v) => updateContact('summary', v)} type="textarea" />

        <h4 className="text-sm font-medium text-slate-300">Contact Methods</h4>
        {(profile.contact?.methods || []).map((m: any, i: number) => (
          <div key={i} className="flex items-start gap-3">
            <div className="grid flex-1 gap-3 sm:grid-cols-3">
              <input value={m.label} onChange={(e) => {
                const methods = [...profile.contact.methods];
                methods[i] = { ...m, label: e.target.value };
                updateContact('methods', methods);
              }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Label" />
              <input value={m.value} onChange={(e) => {
                const methods = [...profile.contact.methods];
                methods[i] = { ...m, value: e.target.value };
                updateContact('methods', methods);
              }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Display value" />
              <input value={m.href} onChange={(e) => {
                const methods = [...profile.contact.methods];
                methods[i] = { ...m, href: e.target.value };
                updateContact('methods', methods);
              }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="URL" />
            </div>
            <button onClick={() => updateContact('methods', profile.contact.methods.filter((_: any, j: number) => j !== i))} className="mt-3 text-red-400 hover:text-red-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button onClick={() => updateContact('methods', [...(profile.contact?.methods || []), { label: '', value: '', href: '', external: true }])} className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
          <Plus className="h-4 w-4" /> Add Method
        </button>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h3 className="text-lg font-semibold text-white">Languages</h3>
        {(profile.languages || []).map((l: any, i: number) => (
          <div key={i} className="flex items-start gap-3">
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              <input value={l.name} onChange={(e) => {
                const langs = [...profile.languages];
                langs[i] = { ...l, name: e.target.value };
                setProfile({ ...profile, languages: langs });
              }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Language" />
              <input value={l.level} onChange={(e) => {
                const langs = [...profile.languages];
                langs[i] = { ...l, level: e.target.value };
                setProfile({ ...profile, languages: langs });
              }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40" placeholder="Level" />
            </div>
            <button onClick={() => setProfile({ ...profile, languages: profile.languages.filter((_: any, j: number) => j !== i) })} className="mt-3 text-red-400 hover:text-red-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button onClick={() => setProfile({ ...profile, languages: [...(profile.languages || []), { name: '', level: '' }] })} className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
          <Plus className="h-4 w-4" /> Add Language
        </button>
      </section>

      <div className="flex justify-end">
        <SaveButton saving={saving} saved={saved} onClick={save} />
      </div>
    </div>
  );
}
