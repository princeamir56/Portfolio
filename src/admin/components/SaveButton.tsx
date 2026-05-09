import { Check, Loader2 } from 'lucide-react';

interface SaveButtonProps {
  saving: boolean;
  saved: boolean;
  onClick: () => void;
  label?: string;
}

export function SaveButton({ saving, saved, onClick, label = 'Save Changes' }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
    >
      {saving ? (
        <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
      ) : saved ? (
        <><Check className="h-4 w-4" /> Saved!</>
      ) : (
        label
      )}
    </button>
  );
}
