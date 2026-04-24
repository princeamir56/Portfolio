import { ArrowUpRight } from 'lucide-react';

interface SocialLinkProps {
  label: string;
  href: string;
  external: boolean;
}

export function SocialLink({ label, href, external }: SocialLinkProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-text-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-strong)]/30 hover:text-[var(--color-text-strong)]"
    >
      {label}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}
