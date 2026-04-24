import type { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface SectionProps extends PropsWithChildren {
  id: string;
  className?: string;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className={cn('mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24', className)}
    >
      {children}
    </motion.section>
  );
}
