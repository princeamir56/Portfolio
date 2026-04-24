import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { FormField } from '../components/FormField';
import { ImageUpload } from '../components/ImageUpload';
import { SaveButton } from '../components/SaveButton';
import { Plus, Trash2 } from 'lucide-react';

export function CertificationsManager() {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get<any>('/profile').then((p) => setCertifications(p.certifications || [])).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await api.put('/profile', { certifications });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { alert('Save failed'); } finally { setSaving(false); }
  };

  const update = (i: number, key: string, value: string) => {
    const c = [...certifications];
    c[i] = { ...c[i], [key]: value };
    setCertifications(c);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Certifications</h2>
          <p className="text-sm text-slate-400">Manage your certifications and credentials</p>
        </div>
        <SaveButton saving={saving} saved={saved} onClick={save} />
      </div>

      {certifications.map((cert, i) => (
        <div key={i} className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{cert.name || 'New Certification'}</h3>
            <button onClick={() => setCertifications(certifications.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <FormField label="Name" value={cert.name || ''} onChange={(v) => update(i, 'name', v)} />
            <FormField label="Issuer" value={cert.issuer || ''} onChange={(v) => update(i, 'issuer', v)} />
            <FormField label="Year" value={cert.year || ''} onChange={(v) => update(i, 'year', v)} />
            <FormField label="Credential URL" value={cert.credentialUrl || ''} onChange={(v) => update(i, 'credentialUrl', v)} type="url" placeholder="https://credential-link.com" />
          </div>
          <ImageUpload value={cert.image || ''} onChange={(url) => update(i, 'image', url)} label="Certificate Image" />
        </div>
      ))}

      <button onClick={() => setCertifications([...certifications, { name: '', issuer: '', year: '', credentialUrl: '', image: '' }])} className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
        <Plus className="h-4 w-4" /> Add Certification
      </button>

      <div className="flex justify-end">
        <SaveButton saving={saving} saved={saved} onClick={save} />
      </div>
    </div>
  );
}
