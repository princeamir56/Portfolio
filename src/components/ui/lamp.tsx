import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function LampEffect({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative flex min-h-[200px] flex-col items-center justify-center overflow-hidden rounded-md', className)}>
      <div className="relative flex w-full flex-1 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: '8rem' }}
          whileInView={{ opacity: 1, width: '20rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          style={{
            backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
          }}
          className="bg-gradient-conic absolute inset-auto right-1/2 h-36 overflow-visible from-[var(--color-accent)] via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-[var(--color-bg)] [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-10 bg-[var(--color-bg)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: '8rem' }}
          whileInView={{ opacity: 1, width: '20rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          style={{
            backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
          }}
          className="bg-gradient-conic absolute inset-auto left-1/2 h-36 from-transparent via-transparent to-[var(--color-accent)] [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-10 bg-[var(--color-bg)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-[var(--color-bg)] [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-32 w-full translate-y-12 scale-x-150 bg-[var(--color-bg)] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-32 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <motion.div
          initial={{ width: '4rem' }}
          whileInView={{ width: '12rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-auto z-30 h-24 w-48 -translate-y-[5rem] rounded-full bg-[var(--color-accent)] opacity-50 blur-3xl"
        />
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '20rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-auto z-50 h-0.5 w-[20rem] -translate-y-[5.5rem] bg-[var(--color-accent)]"
        />
        <div className="absolute inset-auto z-40 h-36 w-full -translate-y-[10rem] bg-[var(--color-bg)]" />
      </div>
      <div className="relative z-50 -mt-32 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}
