import { cn } from '../../lib/utils';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'url' | 'textarea';
  placeholder?: string;
  rows?: number;
  className?: string;
}

export function FormField({ label, value, onChange, type = 'text', placeholder, rows = 3, className }: FormFieldProps) {
  const inputClass = 'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40';

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-slate-300">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className={inputClass}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}
