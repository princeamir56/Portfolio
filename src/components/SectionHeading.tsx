interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-4xl">
      <p className="text-sm font-semibold tracking-[0.24em] text-[var(--color-accent-text)] uppercase">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-[var(--color-text-strong)] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-text-soft)] sm:text-lg">
        {description}
      </p>
    </div>
  );
}
