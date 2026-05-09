import { useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { cn } from '../../lib/utils';

export function MovingBorder({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = 'div',
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: any;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn('relative overflow-hidden rounded-2xl bg-transparent p-[1px]', containerClassName)}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius: 'inherit' }}>
        <MovingGradient duration={duration} className={borderClassName} />
      </div>
      <div
        className={cn('relative z-10 rounded-[inherit] bg-[var(--color-surface)]', className)}
        style={{ borderRadius: 'calc(inherit - 1px)' }}
      >
        {children}
      </div>
    </Component>
  );
}

function MovingGradient({ duration = 2000, className }: { duration?: number; className?: string }) {
  const pathRef = useRef<any>({ angle: 0 });

  useAnimationFrame((t) => {
    pathRef.current.angle = (t / duration) * 360;
  });

  return (
    <motion.div
      className={cn('h-[200%] w-[200%] opacity-80', className)}
      style={{
        background: 'conic-gradient(from 0deg, transparent 0%, var(--color-accent) 10%, transparent 20%)',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        animation: `spin ${duration}ms linear infinite`,
      }}
    />
  );
}
